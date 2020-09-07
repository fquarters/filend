import { Dispatch } from "react"
import { batch } from "react-redux"
import { AnyAction } from "redux"
import { Supplier } from "../../../common/types"
import { patchSide } from "../action/action-creators"
import Selectors from "../data/selectors"
import { State } from "../data/state"

const switchActiveSide = () => (
    dispatch: Dispatch<AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()
    const activeSide = Selectors.activeSideName(state)

    batch(() => {

        dispatch(patchSide({
            side: activeSide,
            patch: {
                active: false
            }
        }))
        dispatch(patchSide({
            side: activeSide === 'left' ? 'right' : 'left',
            patch: {
                active: true
            }
        }))

    })
}

export default switchActiveSide