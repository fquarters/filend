import { ipcRenderer } from "electron"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { repeating } from "../../../common/collections"
import { VIEWER_CHUNK_SIZE } from "../../../common/constants"
import { viewFileCancelEmitEvent, viewFileChunkEmitEvent } from "../../../common/ipc/dynamic-event"
import Message from "../../../common/ipc/message-creators"
import { ViewFileChunkMessage } from "../../../common/ipc/messages"
import { ViewFileChunkResponse } from "../../../common/ipc/protocol"
import { ipcInvokeDynamic } from "../../common/ipc"
import "../../main.scss"
import FileFragment from "./file-fragment"
import "./viewer.scss"

type ViewerAppProps = {
    id: string,
    path: string
}

const maxChunksInMemory = Math.floor(1024 * 1024 * 4 / VIEWER_CHUNK_SIZE)

const ViewerApp = ({
    id,
    path
}: ViewerAppProps) => {

    const [chunksContent, setChunksContent] = useState<string[]>([])
    const [chunksInMemory, setChunksInMemory] = useState(0)
    const [chunkHeight, setChunkHeight] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)

    const pendingChunks = useRef(new Map<number, Promise<ViewFileChunkResponse>>())
    const containers = useRef<(HTMLPreElement | null)[]>([])
    const viewerRef = useRef<HTMLDivElement | null>(null)

    const getChunkContent = useCallback(async (chunkIndex: number): Promise<ViewFileChunkResponse> => {

        if (pendingChunks.current.has(chunkIndex)) {

            return await pendingChunks.current.get(chunkIndex)!
        }

        const chunkPromise = ipcInvokeDynamic<ViewFileChunkResponse, ViewFileChunkMessage>({
            address: viewFileChunkEmitEvent(id),
            ...Message.viewFileChunk({
                id,
                path,
                start: chunkIndex * VIEWER_CHUNK_SIZE,
                encoding: 'utf-8'
            })
        })

        pendingChunks.current.set(chunkIndex, chunkPromise)

        const chunk = await chunkPromise

        return chunk

    }, [id, path])

    useEffect(() => {

        const doInit = async () => {

            const chunk = await getChunkContent(0)

            const chunksCount = Math.ceil(chunk.totalSize / VIEWER_CHUNK_SIZE)
            const initialChunks: string[] = repeating('', chunksCount)

            initialChunks[0] = chunk.content

            setChunksContent(initialChunks)
            setChunksInMemory(current => current + 1)
            containers.current = repeating(null, chunksCount)
        }

        doInit()

        const cancel = () => {

            ipcRenderer.send(viewFileCancelEmitEvent(id))
        }

        window.onbeforeunload = cancel

        return cancel

    }, [id, path, getChunkContent])

    const setRefByIndex = useCallback((index: number) =>
        (ref: HTMLPreElement | null) => {

            containers.current[index] = ref

            if (!index && ref) {

                setChunkHeight(ref.offsetHeight)
            }
        }, [])

    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {

        if (viewerRef.current) {

            setScrollTop(viewerRef.current.scrollTop)
        }

    }, [])

    const requestContent = useCallback(async (index) => {

        const chunk = await getChunkContent(index)

        setChunksContent((current) => {

            const next = current.slice()
            next[index] = chunk.content

            return next
        })
        setChunksInMemory(current => current + 1)

    }, [getChunkContent])

    const clearContent = useCallback((index) => {

        if (chunksInMemory <= maxChunksInMemory) {

            return
        }

        console.log('clearing chunk', index)

        setChunksContent((current) => {

            const next = current.slice()
            next[index] = ''

            return next
        })
        setChunksInMemory(current => current - 1)
        pendingChunks.current.delete(index)

    }, [chunksInMemory])

    return <div className="viewer"
        ref={viewerRef}
        onScroll={onScroll}>
        {
            chunksContent.map((chunk, index) => <FileFragment content={chunk}
                index={index}
                setRef={setRefByIndex(index)}
                height={chunkHeight}
                key={index}
                viewerScrollTop={scrollTop}
                viewerRef={viewerRef}
                requestContent={requestContent}
                clearContent={clearContent} />)
        }
    </div>
}

export default ViewerApp