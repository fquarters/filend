import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import useActiveTabUpdate from "../../hook/use-active-tab-name-update"
import useDirInfo from "../../hook/use-dir-info"
import Selectors from "../../store/data/selectors"
import { Side, TabState } from "../../store/data/state"
import SideContext, { SideContextType } from "../context/side-context"
import DirectoryView from "./directory-view"
import TabView from "./tab-view"
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

    return <div className={`side-view ${active? 'side-view--active' : ''}`}>
        <div>
            {
                tabs.map(({ name }: TabState, index: number) => <TabView
                    name={name}
                    key={index}
                    active={activeTab === index} />)
            }
        </div>
        <SideContext.Provider value={sideContext}>
            {dirInfo && <DirectoryView side={side} />}
        </SideContext.Provider>
    </div>
}

export default SideView