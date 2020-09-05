import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import useActiveTabNameUpdate from "../../hook/use-active-tab-name-update"
import useDirInfo from "../../hook/use-dir-info"
import Selectors from "../../store/data/selectors"
import { Side, TabState } from "../../store/data/state"
import SideContext, { SideContextType } from "../context/side-context"
import DirectoryView from "./directory-view"
import TabView from "./tab-view"

type SideViewProps = {
    side: Side
}

const SideView = ({ side }: SideViewProps) => {

    const {
        tabs,
        activeTab
    } = useSelector(Selectors.side(side))

    const {
        path
    } = useSelector(Selectors.tab({ index: activeTab, side }))

    const sideContext = useMemo<SideContextType>(() => ({
        activeTab,
        side,
    }), [activeTab, side])

    const dirInfo = useDirInfo(path)
    const activeTabState = tabs[activeTab]

    useActiveTabNameUpdate({
        index: activeTab,
        newName: dirInfo?.name,
        name: activeTabState.name,
        named: activeTabState.named,
        side
    })

    return <React.Fragment>
        <div>
            {
                tabs.map(({ name }: TabState, index: number) => <TabView
                    name={name}
                    key={index}
                    active={activeTab === index} />)
            }
        </div>
        <SideContext.Provider value={sideContext}>
            {dirInfo && <DirectoryView dirInfo={dirInfo} />}
        </SideContext.Provider>
    </React.Fragment>
}

export default SideView