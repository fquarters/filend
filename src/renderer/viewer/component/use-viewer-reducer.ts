import { Reducer, useReducer } from "react"
import { repeat, replaceElementByIndex } from "../../../common/collections"

type ViewerState = {
    chunksContent: string[],
    chunksInMemory: number,
    chunkHeight: number,
    scrollTop: number,
    selection: [number, number]
}

export type ViewerActionType = 'SET_INITIAL_CHUNK'
    | 'SET_CHUNK_HEIGHT'
    | 'SET_CHUNK'
    | 'CLEAR_CHUNK'
    | 'SET_SCROLL_TOP'
    | 'SET_SELECTION'

type ViewerAction<A extends ViewerActionType> = {
    type: A
}

type SetInitialChunk = ViewerAction<'SET_INITIAL_CHUNK'> & {
    data: {
        content: string,
        count: number
    }
}

type SetChunk = ViewerAction<'SET_CHUNK'> & {
    data: {
        content: string,
        index: number
    }
}

type SetChunkHeight = ViewerAction<'SET_CHUNK_HEIGHT'> & {
    data: number
}

type ClearChunk = ViewerAction<'CLEAR_CHUNK'> & {
    data: number
}

type SetScrollTop = ViewerAction<'SET_SCROLL_TOP'> & {
    data: number
}

type SetSelecting = ViewerAction<'SET_SELECTION'> & {
    data: [number, number]
}

export type SomeViewerAction<A extends ViewerActionType> = ViewerAction<A> & (
    SetInitialChunk
    | SetChunk
    | SetChunkHeight
    | ClearChunk
    | SetScrollTop
    | SetSelecting
)

const reducer: Reducer<ViewerState, SomeViewerAction<ViewerActionType>> = (state, action) => {

    switch (action.type) {
        case 'SET_INITIAL_CHUNK': return {
            ...state,
            chunksInMemory: state.chunksInMemory + 1,
            chunksContent: replaceElementByIndex(repeat('', action.data.count),
                action.data.content,
                0)
        }
        case 'SET_CHUNK': return {
            ...state,
            chunksContent: replaceElementByIndex(state.chunksContent,
                action.data.content,
                action.data.index),
            chunksInMemory: state.chunksInMemory + 1
        }
        case 'CLEAR_CHUNK': return {
            ...state,
            chunksContent: replaceElementByIndex(state.chunksContent,
                '',
                action.data),
            chunksInMemory: state.chunksInMemory - 1
        }
        case 'SET_CHUNK_HEIGHT': return {
            ...state,
            chunkHeight: action.data
        }
        case 'SET_SCROLL_TOP': return {
            ...state,
            scrollTop: action.data
        }
        case 'SET_SELECTION': return {
            ...state,
            selection: action.data
        }
    }
}

const defaultState: ViewerState = {
    chunkHeight: 0,
    chunksContent: [],
    chunksInMemory: 0,
    scrollTop: 0,
    selection: [0, 0]
}

const useViewerReducer = () => useReducer(reducer, defaultState)

export default useViewerReducer