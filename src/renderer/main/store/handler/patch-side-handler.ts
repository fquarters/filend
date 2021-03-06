import { PatchSide, SidePatch } from "../action/actions"
import { State, SideState } from "../data/state"

const handlePatchSide = (data: SidePatch, state: State): State => {

    const rootSidePatch = {} as Partial<State>

    const sidePatch: SideState = {
        ...state[data.side],
        ...data.patch
    }

    rootSidePatch[data.side] = sidePatch

    return {
        ...state,
        ...rootSidePatch
    }
}

export default handlePatchSide