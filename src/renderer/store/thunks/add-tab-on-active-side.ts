import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../common/types"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import addTabThunk from "./add-tab"

const addTabOnActiveSide = () => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    dispatch(addTabThunk({
        onSide: side,
        cloneTab: tab
    }))
}

export default addTabOnActiveSide