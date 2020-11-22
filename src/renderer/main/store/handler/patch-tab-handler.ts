import { TabPatch } from "../action/actions"
import { State, TabState } from "../data/state"
import handlePatchSide from "./patch-side-handler"

const handlePatchTab = (data: TabPatch, state: State): State => {

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

    return handlePatchSide({
        side,
        patch: {
            tabs: newTabs
        }
    }, state)
}

export default handlePatchTab