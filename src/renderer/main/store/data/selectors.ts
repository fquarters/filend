import caching from "../../../../common/caching"
import { FileInfo } from "../../../../common/ipc/protocol"
import { MapFunction } from "../../../../common/types"
import { Side, SideState, State, TabState } from "./state"

type TabSelectorArg = {
    side: Side,
    index: number
}

type SideComponentState = Pick<SideState, 'active' | 'activeTab'>

const cachingSideStateSelector = caching<Side, MapFunction<State, SideState>>()
const cachingTabStateSelector = caching<TabSelectorArg, MapFunction<State, TabState>>()
const cachingActiveTabIndexSelector = caching<Side, MapFunction<State, number>>()
const cachingSideComponentStateSelector = caching<Side, MapFunction<State, SideComponentState>>()
const cachingSideTabsSelector = caching<Side, MapFunction<State, TabState[]>>()
const cachingActiveTabStateSelector = caching<Side, MapFunction<State, TabState>>()

const activeSideName = (state: State): Side => state.left.active ? 'left' : 'right'
const activeTabOfSide = cachingActiveTabStateSelector((side: Side) =>
    (state: State) => state[side].tabs[state[side].activeTab])
const activeTabIndexOfSide = cachingActiveTabIndexSelector((side: Side) =>
    (state: State) => state[side].activeTab)
const sideByName = cachingSideStateSelector((side: Side) => (state: State) => state[side])
const sideComponentState = cachingSideComponentStateSelector((side: Side) => (state: State) => ({
    active: state[side].active,
    activeTab: state[side].activeTab
}))
const sideTabsSelector = cachingSideTabsSelector((side: Side) => (state: State) => state[side].tabs)
const currentActiveTabState = (state: State) => activeTabOfSide(activeSideName(state))(state)
const currentActiveSideState = (state: State) => sideByName(activeSideName(state))(state)

const filterSelectedFiles = ({
    dirInfo,
    selectedRows
}: TabState) => {

    if (!dirInfo) {
        return []
    }

    return dirInfo.files.filter((_, index) => selectedRows.indexOf(index + 1) > -1)

}

type CurrentActiveState = {
    side: Side,
    tab: number,
    row: number
}

const currentActiveState = (state: State): CurrentActiveState => {

    const sideName = activeSideName(state)
    const sideState = sideByName(sideName)(state)
    const tabState = activeTabOfSide(sideName)(state)

    return {
        row: tabState.rowInFocus,
        side: sideName,
        tab: sideState.activeTab
    }
}
const Selectors = {
    sideByName,
    sideComponentState,
    sideTabsSelector,
    tabByIndex: cachingTabStateSelector(({ side, index }: TabSelectorArg) =>
        (state: State) => state[side].tabs[index]),
    activeTabOfSide,
    activeTabIndexOfSide,
    activeSideName,
    currentActiveTabState,
    currentActiveSideState,
    currentActiveState,
    hotkeysDisabled: (state: State) => state.hotkeysDisabled,
    sidePanelWidths: (state: State) => ({
        left: state.left.width,
        right: state.right.width
    }),
    tasks: (state: State) => state.tasks,
    selectedFilesOnActiveTab: (state: State): FileInfo[] => {

        const {
            side,
            tab
        } = currentActiveState(state)

        return filterSelectedFiles(state[side].tabs[tab])
    },
    executePanelState: (state: State) => currentActiveTabState(state).path,
    moveRequest: (state: State) => state.moveRequest
}

export default Selectors

export {
    filterSelectedFiles
}