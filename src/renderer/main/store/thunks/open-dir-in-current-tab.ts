import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import Message from "../../../../common/ipc/message-creators"
import { ResolvePathMessage } from "../../../../common/ipc/messages"
import { Supplier } from "../../../../common/types"
import { ipcInvoke } from "../../../common/ipc"
import { patchTab } from "../action/action-creators"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import updateTabDirInfo from "./update-tab-dir-info"


const openDirInCurrentTab = (...path: string[]) => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    const resolvedPath = await ipcInvoke<string | null, ResolvePathMessage>(
        Message.resolvePath(...path)
    )

    if (resolvedPath) {

        batch(() => {

            dispatch(patchTab({
                index: tab,
                patch: {
                    path: resolvedPath,
                    rowInFocus: 0,
                    selectedRows: []
                },
                side
            }))

            dispatch(updateTabDirInfo({
                side,
                tab
            }))
        })
    }
}

export default openDirInCurrentTab