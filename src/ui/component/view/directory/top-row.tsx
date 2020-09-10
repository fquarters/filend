import React, { useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import useRowInFocus from "../../../hook/use-row-in-focus"
import openFileInFocus from "../../../store/thunks/open-file-in-focus"
import { RowProps } from "./types"

const TopRow = ({
    inFocus,
    setFocus
}: RowProps) => {

    const rowRef = useRef<HTMLTableRowElement | null>(null)

    const classInFocus = useRowInFocus({
        row: rowRef.current,
        inFocus
    })

    const dispatch = useDispatch()

    const changeDirToParent = useCallback(() => dispatch(openFileInFocus()), [
        dispatch
    ])

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