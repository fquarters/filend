import { ipcRenderer } from "electron"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { copyConflictEmitEvent, copyConflictReplyEvent, copyProgressEvent } from "../../../common/ipc/dynamic-event"
import { CopyConflictMessage, CopyProgressMessage, NextIdMessage } from "../../../common/ipc/messages"
import { CopyConflictResult } from "../../../common/ipc/protocol"
import { Supplier } from "../../../common/types"
import { ipcInvoke } from "../../common/ipc"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import updateTabDirInfo from "./update-tab-dir-info"
import Message from "../../../common/ipc/message-creators"

const copySelectedFiles = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()
    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    const {
        selectedRows,
        dirInfo
    } = state[side].tabs[tab]

    if (!dirInfo) {
        return
    }

    const selectedFiles = dirInfo.files.filter((_, index) => selectedRows.indexOf(index + 1) > -1)
    const otherSide = side === 'left' ? 'right' : 'left'

    const operationId = await ipcInvoke<string, NextIdMessage>(Message.nextId())

    const onConflict = (_: unknown, args: CopyConflictMessage) => {

        const {
            conflictId,
            destination,
            name
        } = args.data

        const result = confirm(`File ${name} already exists in ${destination}. Overwrite?`)

        const response: CopyConflictResult = result ? 'ok' : 'cancel'

        ipcRenderer.send(copyConflictReplyEvent({
            id: operationId,
            conflictId
        }), response)
    }

    const onProgress = (_: unknown, args: CopyProgressMessage) => {

    }

    ipcRenderer.on(copyConflictEmitEvent(operationId), onConflict)
    ipcRenderer.on(copyProgressEvent(operationId), onProgress)

    await ipcInvoke(Message.copyFiles({
        destination: Selectors.activeTabOfSide(otherSide)(state).path,
        id: operationId,
        source: selectedFiles.map((file) => file.path)
    }))

    dispatch(updateTabDirInfo({
        side: otherSide,
        tab: state[otherSide].activeTab
    }))

    ipcRenderer.off(copyConflictEmitEvent(operationId), onConflict)
    ipcRenderer.off(copyProgressEvent(operationId), onProgress)
}

export default copySelectedFiles