import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../common/types"
import { patchTab } from "../action/action-creators"
import { State, Side } from "../data/state"
import switchActiveSide from "./switch-active-side"
import Selectors from "../data/selectors"

type FocusRowThunkArgs = {
    row: number,
    side: Side
}

const focusRow = ({
    row,
    side
}: FocusRowThunkArgs) => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        tab,
        side: activeSide
    } = Selectors.currentActiveState(state)


    batch(() => {

        if (side !== activeSide) {
            dispatch(switchActiveSide({
                to: side
            }))
        }

        dispatch(patchTab({
            side,
            index: tab,
            patch: {
                rowInFocus: row
            }
        }))
    })

}

export default focusRow
