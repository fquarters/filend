import React, { MutableRefObject } from "react"

export type DirectoryContextType = {
    containerRef: MutableRefObject<HTMLElement | null>,
    rowInFocus: number,
    selectedRows: number[]
}

const DirectoryContext = React.createContext<DirectoryContextType | null>(null)

export default DirectoryContext