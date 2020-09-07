import { Dispatch } from "react"
import { AnyAction } from "redux"
import { Supplier } from "../../../common/types"
import { patchTab } from "../action/action-creators"
import Selectors from "../data/selectors"
import { State } from "../data/state"

type RowChange = 'up' | 'down' | number

const changeRowInFocus = (change: RowChange) => (
    dispatch: Dispatch<AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        row,
        side,
        tab
    } = Selectors.currentActiveState(state)

    const {
        dirInfo
    } = Selectors.tabByIndex({
        index: tab,
        side
    })(state)

    const fileCount = dirInfo?.files.length

    let newRow = row

    if (change === 'up') {

        newRow = Math.max(0, newRow - 1)

    } else if (change === 'down') {

        newRow = fileCount ? Math.min(fileCount, newRow + 1) : 0

    } else {

        newRow = change
    }

    dispatch(patchTab({
        index: tab,
        patch: {
            rowInFocus: newRow
        },
        side
    }))

}

export default changeRowInFocus