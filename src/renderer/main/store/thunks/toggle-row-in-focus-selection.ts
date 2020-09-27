import { Dispatch } from "react"
import { AnyAction } from "redux"
import { difference, union } from "../../../../common/collections"
import { Supplier } from "../../../../common/types"
import { patchTab } from "../action/action-creators"
import Selectors from "../data/selectors"
import { State } from "../data/state"

const toggleRowInFocusSelection = () => (
    dispatch: Dispatch<AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        row,
        side,
        tab
    } = Selectors.currentActiveState(state)

    const selected = state[side].tabs[tab].selectedRows

    dispatch(patchTab({
        index: tab,
        side,
        patch: {
            selectedRows: selected.indexOf(row) > -1
                ? difference(selected, [row])
                : union(selected, [row])
        }
    }))
}

export default toggleRowInFocusSelection