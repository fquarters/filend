import { ThunkDispatch } from "redux-thunk"
import { State, Side } from "../data/state"
import { AnyAction } from "redux"
import { Supplier } from "../../../../common/types"
import { batch } from "react-redux"
import switchActiveSide from "./switch-active-side"
import { patchSide } from "../action/action-creators"

type SwitchTabArgs = {
    side: Side,
    tab: number
}

const switchActiveTab = ({
    side,
    tab
}: SwitchTabArgs) => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    _getState: Supplier<State>
) => {


    batch(() => {

        dispatch(switchActiveSide({
            to: side
        }))

        dispatch(patchSide({
            side,
            patch: {
                activeTab: tab
            }
        }))

    })
}

export default switchActiveTab