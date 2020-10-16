import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../../common/types"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import openDirInCurrentTab from "./open-dir-in-current-tab"

const openParentDirInCurrentTab = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        path
    } = Selectors.currentActiveTabState(state)

    dispatch(openDirInCurrentTab(path, ".."))
}

export default openParentDirInCurrentTab