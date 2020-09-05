import React, { useContext, useCallback } from "react"
import ActiveTabContext from "../context/active-tab-context"
import { useDispatch } from "react-redux"
import { patchTab } from "../../store/action/action-creators"

const useChangeDirToParent = () => {

    const {
        index,
        path,
        side
    } = useContext(ActiveTabContext)!

    const dispatch = useDispatch()

    return useCallback(() => { 

        dispatch(patchTab({
            index,
            patch: {
                path: `../${path}`
            },
            side
        }))

    }, [
        index,
        path,
        side,
        dispatch
    ])
}

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