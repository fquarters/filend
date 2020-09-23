import React, { useRef } from "react"
import useRowClickHandler from "../../../hook/use-row-click-handler"
import useRowFileOpen from "../../../hook/use-row-file-open"
import useRowInFocus from "../../../hook/use-row-in-focus"
import { RowProps } from "./types"

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
        className={`directory-view__file ${classInFocus}`}>
        <td>
            ...
        </td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
}

export default TopRow