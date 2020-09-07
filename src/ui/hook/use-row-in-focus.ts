import { useEffect } from "react"

const activeRowClass = 'directory-view__file--in-focus'

const useRowInFocus = (
    row: HTMLTableRowElement | null,
    inFocus: boolean
) => {

    useEffect(() => {

        if (inFocus && row) {

            row.scrollIntoView()
        }

    }, [inFocus, row])

    return inFocus? activeRowClass : ''
}

export default useRowInFocus