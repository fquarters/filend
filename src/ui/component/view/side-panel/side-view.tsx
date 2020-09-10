import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import TabView from "./tab-view"
import "./side-view.css"
import { Side, TabState } from "../../../store/data/state"
import Selectors from "../../../store/data/selectors"
import SideContext, { SideContextType } from "../../context/side-context"
import useDirInfo from "../../../hook/use-dir-info"
import useActiveTabUpdate from "../../../hook/use-active-tab-name-update"
import DirectoryView from "../directory/directory-view"
import "./side-view.css"

type SideViewProps = {
    side: Side
}

const SideView = ({ side }: SideViewProps) => {

    const {
        tabs,
        activeTab,
        active
    } = useSelector(Selectors.sideByName(side))

    const {
        path
    } = useSelector(Selectors.tabByIndex({ index: activeTab, side }))

    const sideContext = useMemo<SideContextType>(() => ({
        activeTab,
        active,
        side
    }), [activeTab, side, active])

    const dirInfo = useDirInfo(path)

    useActiveTabUpdate({
        index: activeTab,
        dirInfo,
        side
    })

    return <div className={`side-view ${active ? 'side-view--active' : ''}`}>
        <div className={"side-view__tabs"}>
            {
                tabs.map(({ name }: TabState, index: number) => <TabView
                    name={name}
                    key={index}
                    active={activeTab === index} />)
            }
        </div>
        <SideContext.Provider value={sideContext}>
            <div className={"side-view__tab-content"}>
                <DirectoryView side={side} />
            </div>
        </SideContext.Provider>
    </div>
}

export default SideView