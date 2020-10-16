import { useCallback, useRef } from "react"
import { VIEWER_CHUNK_SIZE } from "../../../common/constants"
import { viewFileChunkEmitEvent } from "../../../common/ipc/dynamic-event"
import Message from "../../../common/ipc/message-creators"
import { ViewFileChunkMessage } from "../../../common/ipc/messages"
import { ViewFileChunkResponse } from "../../../common/ipc/protocol"
import { ipcInvokeDynamic } from "../../common/ipc"

type ChunkContentLoaderArgs = {
    id: string,
    path: string
}

const useChunkContentLoader = ({
    id,
    path
}: ChunkContentLoaderArgs) => {

    const pendingChunks = useRef(new Map<number, Promise<ViewFileChunkResponse>>())

    const loadChunk = useCallback(async (chunkIndex: number): Promise<ViewFileChunkResponse> => {

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

    return {
        loadChunk,
        pendingChunks
    }
}

export default useChunkContentLoader