import React, { useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import useRowInFocus from "../../../hook/use-row-in-focus"
import openFileInFocus from "../../../store/thunks/open-file-in-focus"
import { RowProps } from "./types"
import useRowFocusSet from "../../../hook/use-row-focus-set"
import useRowFileOpen from "../../../hook/use-row-file-open"

const TopRow = ({
    index
}: RowProps) => {

    const rowRef = useRef<HTMLTableRowElement | null>(null)

    const classInFocus = useRowInFocus({
        row: rowRef.current,
        index
    })

    const changeDirToParent = useRowFileOpen()

    const setFocus = useRowFocusSet(index)

    return <tr ref={rowRef}
        onClick={setFocus}
        onDoubleClick={changeDirToParent}
        className={`${classInFocus}`}>
        <td colSpan={4}>
            ...
        </td>
    </tr>
}

export default TopRow