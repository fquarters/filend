import { AnyAction, Dispatch } from "redux"
import { Supplier } from "../../../common/types"
import { State } from "../data/state"
import Selectors from "../data/selectors"
import { patchTab } from "../action/action-creators"

const openParentDirInCurrentTab = () => (
    dispatch: Dispatch<AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    const tabState = state[side].tabs[tab]
    const currentDirPath = tabState.path

    dispatch(patchTab({
        index: tab,
        patch: {
            path: `${currentDirPath}/..`
        },
        side
    }))
}

export default openParentDirInCurrentTab