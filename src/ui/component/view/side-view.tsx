import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"
import TabView from "./tab-view"
import DirectoryView from "./directory-view"
import ActiveTabContext from "../context/active-tab-context"

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

    const activeTabContext = useMemo(() => ({
        index: activeTab,
        side,
        path
    }), [activeTab, side, path])

    return <React.Fragment>
        <div>
            {
                tabs.map((_, index: number) => <TabView
                    index={index}
                    side={side}
                    key={index}
                    active={activeTab === index} />)
            }
        </div>
        <ActiveTabContext.Provider value={activeTabContext}>
            <DirectoryView path={path} />
        </ActiveTabContext.Provider>
    </React.Fragment>
}

export default SideView