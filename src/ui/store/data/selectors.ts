import { State, Side, SideState, TabState } from "./state"
import { MapFunction } from "../../../common/types"
import memoized from "../../../common/memoized"

type TabSelectorArg = {
    side: Side,
    index: number
}

const memoizedSideStateSelector = memoized<Side, MapFunction<State, SideState>>()
const memoizedTabStateSelector = memoized<TabSelectorArg, MapFunction<State, TabState>>()

const Selectors = {
    side: memoizedSideStateSelector((side: Side) =>
        (state: State) => state[side]),
    tab: memoizedTabStateSelector(({ side, index }: TabSelectorArg) =>
        (state: State) => state[side].tabs[index])
}

export default Selectors