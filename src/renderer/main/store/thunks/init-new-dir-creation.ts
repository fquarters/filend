import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../../common/types"
import { State } from "../data/state"
import Selectors from "../data/selectors"
import { patchTab } from "../action/action-creators"

const initNewDirCreation = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    dispatch(patchTab({
        index: tab,
        side,
        patch: {
            creatingNewDir: true
        }
    }))
}

export default initNewDirCreation