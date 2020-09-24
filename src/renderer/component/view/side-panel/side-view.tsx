import React, { useMemo } from "react"
import { shallowEqual, useSelector } from "react-redux"
import Selectors from "../../../store/data/selectors"
import { Side } from "../../../store/data/state"
import SideContext, { SideContextType } from "../../context/side-context"
import DirectoryView from "../directory/directory-view"
import "./side-view.scss"
import TabsPanel from "./tabs-panel"

type SideViewProps = {
    side: Side
}

const SideView = ({ side }: SideViewProps) => {

    const {
        activeTab,
        active
    } = useSelector(Selectors.sideComponentState(side), shallowEqual)

    const sideContext = useMemo<SideContextType>(() => ({
        activeTab,
        active,
        side
    }), [activeTab, side, active])

    return <div className={`side-view ${active ? 'side-view--active' : ''}`}>
        <SideContext.Provider value={sideContext}>
            <TabsPanel />
            <div className={"side-view__tab-content"}>
                <DirectoryView side={side} />
            </div>
        </SideContext.Provider>
    </div>
}

export default SideView