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

const Selectors = {
    side: memoizedSideStateSelector((side: Side) =>
        (state: State) => state[side]),
    tab: memoizedTabStateSelector(({ side, index }: TabSelectorArg) =>
        (state: State) => state[side].tabs[index]),
    activeTab: memoizedActiveTabStateSelector((side: Side) =>
        (state: State) => state[side].tabs[state[side].activeTab]),
    activeSide: (state: State): Side => state.left.active ? 'left' : 'right'
}

export default Selectors