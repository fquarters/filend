import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../common/types"
import { patchSide } from "../action/action-creators"
import { Side, State, TabState } from "../data/state"
import updateTabDirInfo from "./update-tab-dir-info"

type AddTabArgs = {
    onSide: Side,
    cloneTab?: number
}

const addTabThunk = ({
    onSide,
    cloneTab
}: AddTabArgs) => (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

        const state = getState()

        const side = state[onSide]
        const sourceTab = side.tabs[cloneTab || side.tabs.length - 1]

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

            const newTabIndex = side.tabs.length

            dispatch(patchSide({
                side: onSide,
                patch: {
                    tabs: [...side.tabs, newTab],
                    activeTab: newTabIndex
                }
            }))

            dispatch(updateTabDirInfo({
                side: onSide,
                tab: newTabIndex
            }))
        })
    }

export default addTabThunk