import { ipcRenderer } from "electron"
import { Dispatch, useCallback, useEffect, useRef } from "react"
import { repeat } from "../../../common/collections"
import { VIEWER_CHUNK_SIZE } from "../../../common/constants"
import { viewFileCancelEmitEvent } from "../../../common/ipc/dynamic-event"
import { ViewFileChunkResponse } from "../../../common/ipc/protocol"
import { MapFunction } from "../../../common/types"
import { SomeViewerAction, ViewerActionType } from "./use-viewer-reducer"

type ViewerInitArgs = {
    dispatch: Dispatch<SomeViewerAction<ViewerActionType>>,
    id: string,
    path: string,
    loadChunk: MapFunction<number, Promise<ViewFileChunkResponse>>
}

const useViewerInit = ({
    dispatch,
    id,
    path,
    loadChunk
}: ViewerInitArgs) => {

    const containers = useRef<(HTMLPreElement | null)[]>([])

    useEffect(() => {

        const doInit = async () => {

            const chunk = await loadChunk(0)
            const chunksCount = Math.ceil(chunk.totalSize / VIEWER_CHUNK_SIZE)

            dispatch({
                type: 'SET_INITIAL_CHUNK',
                data: {
                    content: chunk.content,
                    count: chunksCount
                }
            })

            containers.current = repeat(null, chunksCount)
        }

        doInit()

        const cancel = () => {

            ipcRenderer.send(viewFileCancelEmitEvent(id))
        }

        window.onbeforeunload = cancel

        return cancel

    }, [id, path, loadChunk, dispatch])

    const setFragmentRefByIndex = useCallback((index: number, ref: HTMLPreElement | null) => {

        containers.current[index] = ref

        if (!index && ref) {

            dispatch({
                type: 'SET_CHUNK_HEIGHT',
                data: ref.offsetHeight
            })
        }
    }, [dispatch])

    return setFragmentRefByIndex
}

export default useViewerInit