import React, { useCallback, useRef } from "react"
import { useDispatch } from "react-redux"
import useRowInFocus from "../../../hook/use-row-in-focus"
import openFileInFocus from "../../../store/thunks/open-file-in-focus"
import { RowProps } from "./types"
import useRowClickHandler from "../../../hook/use-row-click-handler"
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

    const handleClick = useRowClickHandler(index)

    return <tr ref={rowRef}
        onPointerDown={handleClick}
        onDoubleClick={changeDirToParent}
        className={`${classInFocus}`}>
        <td colSpan={4}>
            ...
        </td>
    </tr>
}

export default TopRow