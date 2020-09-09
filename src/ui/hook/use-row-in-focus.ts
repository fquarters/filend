import { useContext, useEffect } from "react"
import { elementVisibleInScrollableContainer } from "../common/dom-utils"
import DirectoryContext from "../component/context/directory-context"

const activeRowClass = 'directory-view__file--in-focus'

type RowInFocusHookArgs = {
    row: HTMLTableRowElement | null,
    inFocus: boolean
}

const useRowInFocus = ({
    row,
    inFocus
}: RowInFocusHookArgs) => {

    const rowContainer = useContext(DirectoryContext)?.containerRef.current

    useEffect(() => {

        if (inFocus && row && rowContainer) {

            if (!elementVisibleInScrollableContainer(row, rowContainer)) {
                row.scrollIntoView()
            }

        }

    }, [inFocus, row, rowContainer])

    return inFocus ? activeRowClass : ''
}

export default useRowInFocus