import React, { useContext, useCallback } from "react"
import SideContext from "../context/side-context"
import { useDispatch, useSelector } from "react-redux"
import { patchTab } from "../../store/action/action-creators"
import Selectors from "../../store/data/selectors"

const useChangeDirToParent = () => {

    const {
        side,
        activeTab: index
    } = useContext(SideContext)!

    const {
        path,
        name
    } = useSelector(Selectors.activeTab(side))

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
        name,
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