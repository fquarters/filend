import React, { useRef } from "react"
import useChangeDirToParent from "../../../hook/use-change-dir-to-parent"
import { RowProps } from "./types"
import useRowInFocus from "../../../hook/use-row-in-focus"

const TopRow = ({
    inFocus
}: RowProps) => {

    const rowRef = useRef<HTMLTableRowElement | null>(null)

    const classInFocus = useRowInFocus(rowRef.current, inFocus)

    const changeDirToParent = useChangeDirToParent()

    return <tr ref={rowRef}
    className={`${classInFocus}`}>
        <td colSpan={4}
            onDoubleClick={changeDirToParent}>
            ...
        </td>
    </tr>
}

export default TopRow