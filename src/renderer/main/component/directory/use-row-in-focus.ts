import { useContext, useEffect, useLayoutEffect } from "react"
import { elementVisibleInScrollableContainer } from "../../../common/dom-utils"
import DirectoryContext from "../context/directory-context"

const activeRowClass = 'directory-view__file--in-focus'

type RowInFocusHookArgs = {
    row: HTMLTableRowElement | null,
    index: number
}

const useRowInFocus = ({
    row,
    index
}: RowInFocusHookArgs) => {

    const {
        containerRef,
        rowInFocus
    } = useContext(DirectoryContext)!

    const inFocus = rowInFocus === index

    useLayoutEffect(() => {

        if (inFocus && row && containerRef.current) {

            if (!elementVisibleInScrollableContainer(row, containerRef.current)) {
                row.scrollIntoView()
            }

        }

    }, [inFocus, row, containerRef.current])

    return inFocus ? activeRowClass : ''
}

export default useRowInFocus