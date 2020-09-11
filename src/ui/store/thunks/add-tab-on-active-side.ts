import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../common/types"
import { patchSide } from "../action/action-creators"
import Selectors from "../data/selectors"
import { State, TabState } from "../data/state"
import updateTabDirInfo from "./update-tab-dir-info"

const addTabOnActiveSide = () => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    const sourceTab = state[side].tabs[tab]

    const newTab: TabState = {
        dirInfo: {
            ...sourceTab.dirInfo!
        },
        named: false,
        name: sourceTab.path.split('/').pop() || sourceTab.name,
        path: sourceTab.path,
        rowInFocus: 0,
        selectedRows: [],
    }

    batch(() => {

        const newTabIndex = state[side].tabs.length

        dispatch(patchSide({
            side,
            patch: {
                tabs: [...state[side].tabs, newTab],
                activeTab: newTabIndex
            }
        }))

        dispatch(updateTabDirInfo({
            side,
            tab: newTabIndex
        }))
    })
}

export default addTabOnActiveSide