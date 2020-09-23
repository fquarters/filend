import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { Supplier } from "../../../common/types"
import { State } from "../data/state"
import Selectors from "../data/selectors"
import { patchTab } from "../action/action-creators"
import { ipcInvoke } from "../../common/ipc"
import Message from "../../../common/ipc/message-creators"
import { NextIdMessage } from "../../../common/ipc/messages"
import { batch } from "react-redux"
import updateTabDirInfo from "./update-tab-dir-info"
import focusRow from "./focus-row"

const finishNewDirCreation = (dirName?: string) => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    const stopCreation = () => dispatch(patchTab({
        index: tab,
        side,
        patch: {
            creatingNewDir: false
        }
    }))

    if (!dirName) {

        stopCreation()
        return
    }

    const {
        path
    } = state[side].tabs[tab]

    const operationId = await ipcInvoke<string, NextIdMessage>(Message.nextId())

    const created = await ipcInvoke(Message.makeDir({
        id: operationId,
        path: [path, dirName]
    }))

    batch(() => {

        stopCreation()

        if (created) {

            dispatch(focusRow({
                row: 0,
                side
            }))
            dispatch(updateTabDirInfo({
                side,
                tab
            }))
        }
    })
}

export default finishNewDirCreation