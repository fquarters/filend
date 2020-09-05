import React from "react"
import useChangeDirToParent from "../../../hook/use-change-dir-to-parent"

const TopRow = () => {

    const changeDirToParent = useChangeDirToParent()

    return <tr>
        <td colSpan={4}
            onDoubleClick={changeDirToParent}>
            ...
        </td>
    </tr>
}

export default TopRow