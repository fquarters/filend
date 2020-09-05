import { PatchTab } from "../action/actions"
import { State, TabState, SideState } from "../data/state"

const patchTab = ({
    data
}: PatchTab, state: State): State => {

    const {
        side,
        index,
        patch
    } = data
    const tabSide = state[side]

    if (tabSide.tabs.length <= index) {
        return state
    }

    const newTabState: TabState = {
        ...tabSide.tabs[index],
        ...patch
    }
    const newTabs = tabSide.tabs.slice()
    newTabs[index] = newTabState

    const rootTabPatch = {} as Partial<State>

    const sideTabPatch: SideState = {
        ...tabSide,
        tabs: newTabs
    }

    rootTabPatch[side] = sideTabPatch

    return {
        ...state,
        ...rootTabPatch
    }
}

export default patchTab