import React, { useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import switchActiveTab from "../../../store/thunks/switch-active-tab"
import SideContext from "../../context/side-context"
import "./tab.css"

type TabProps = {
    name: string,
    index: number
}

const Tab = ({
    name,
    index
}: TabProps) => {

    const {
        activeTab,
        side
    } = useContext(SideContext)!

    const isActive = index === activeTab

    const dispatch = useDispatch()

    const setActive = useCallback(() => {

        dispatch(switchActiveTab({
            side,
            tab: index
        }))

    }, [dispatch, side, index])

    return <div className={`tab ${isActive ? 'tab--active' : ''}`}
        onClick={setActive}>
        {name}
    </div>
}

export default Tab