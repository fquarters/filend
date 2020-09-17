import memoized from "../../../common/memoized"
import { MapFunction } from "../../../common/types"
import { Side, SideState, State, TabState } from "./state"

type TabSelectorArg = {
    side: Side,
    index: number
}

const memoizedSideStateSelector = memoized<Side, MapFunction<State, SideState>>()
const memoizedTabStateSelector = memoized<TabSelectorArg, MapFunction<State, TabState>>()
const memoizedActiveTabStateSelector = memoized<Side, MapFunction<State, TabState>>()

const activeSideName = (state: State): Side => state.left.active ? 'left' : 'right'
const activeTabOfSide = memoizedActiveTabStateSelector((side: Side) =>
    (state: State) => state[side].tabs[state[side].activeTab])
const sideByName = memoizedSideStateSelector((side: Side) => (state: State) => state[side])
const currentActiveTabState = (state: State) => activeTabOfSide(activeSideName(state))(state)
const currentActiveSideState = (state: State) => sideByName(activeSideName(state))(state)

type CurrentActiveState = {
    side: Side,
    tab: number,
    row: number
}

const Selectors = {
    sideByName,
    tabByIndex: memoizedTabStateSelector(({ side, index }: TabSelectorArg) =>
        (state: State) => state[side].tabs[index]),
    activeTabOfSide,
    activeSideName,
    currentActiveTabState,
    currentActiveSideState,
    currentActiveState: (state: State): CurrentActiveState => {

        const sideName = activeSideName(state)
        const sideState = sideByName(sideName)(state)
        const tabState = activeTabOfSide(sideName)(state)

        return {
            row: tabState.rowInFocus,
            side: sideName,
            tab: sideState.activeTab
        }
    },
    hotkeysDisabled: (state: State) => state.hotkeysDisabled,
    sidePanelWidths: (state: State) => ({
        left: state.left.width,
        right: state.right.width
    }),
    tasks: (state: State) => state.tasks
}

export default Selectors