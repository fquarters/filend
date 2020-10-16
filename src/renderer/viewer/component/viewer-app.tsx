import React, { useCallback, useRef } from "react"
import { VIEWER_CHUNK_SIZE } from "../../../common/constants"
import "../../main.scss"
import FileFragment from "./file-fragment"
import useChunkContentLoader from "./use-chunk-content-loader"
import useViewerInit from "./use-viewer-init"
import useViewerReducer from "./use-viewer-reducer"
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

    const [state, dispatch] = useViewerReducer()

    const viewerRef = useRef<HTMLDivElement | null>(null)

    const {
        loadChunk,
        pendingChunks
    } = useChunkContentLoader({
        id,
        path
    })

    const setFragmentRefByIndex = useViewerInit({
        dispatch,
        loadChunk,
        id,
        path
    })

    const onScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {

        if (viewerRef.current) {

            dispatch({
                type: 'SET_SCROLL_TOP',
                data: viewerRef.current.scrollTop
            })
        }

    }, [dispatch])

    const requestContent = useCallback(async (index) => {

        const chunk = await loadChunk(index)

        dispatch({
            type: 'SET_CHUNK',
            data: {
                content: chunk.content,
                index
            }
        })

    }, [loadChunk, dispatch])

    const clearContent = useCallback((index) => {

        if (state.chunksInMemory <= maxChunksInMemory) {

            return
        }

        dispatch({
            type: 'CLEAR_CHUNK',
            data: index
        })

        pendingChunks.current.delete(index)

    }, [state.chunksInMemory, pendingChunks])

    return <div className="viewer"
        ref={viewerRef}
        onScroll={onScroll}>
        {
            state.chunksContent.map((chunk, index) => <FileFragment content={chunk}
                index={index}
                setRef={setFragmentRefByIndex}
                height={state.chunkHeight}
                key={index}
                viewerScrollTop={state.scrollTop}
                viewerRef={viewerRef}
                requestContent={requestContent}
                clearContent={clearContent} />)
        }
    </div>
}

export default ViewerApp