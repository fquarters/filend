import { ThunkDispatch } from "redux-thunk"
import { State } from "../data/state"
import { AnyAction } from "redux"
import { Supplier } from "../../../common/types"
import Selectors from "../data/selectors"
import { ipcInvoke } from "../../common/ipc"
import { copyFiles, nextId } from "../../../common/ipc/message-creators"
import updateTabDirInfo from "./update-tab-dir-info"
import { NextIdMessage, CopyConflictMessage, CopyProgressMessage } from "../../../common/ipc/messages"
import { ipcRenderer } from "electron"
import { copyConflictEmitEvent, copyConflictReplyEvent, copyProgressEvent } from "../../../common/ipc/dynamic-event"
import { CopyConflict, CopyConflictResult } from "../../../common/ipc/protocol"

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

    const operationId = await ipcInvoke<string, NextIdMessage>(nextId())

    const onConflict: (...args: any[]) => void = (_, args: CopyConflictMessage) => {

        console.log('conflict:', args)

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

    const onProgress: (...args: any[]) => void = (_, args: CopyProgressMessage) => {

        console.log('copy progress:', args)
    }

    ipcRenderer.on(copyConflictEmitEvent(operationId), onConflict)
    ipcRenderer.on(copyProgressEvent(operationId), onProgress)

    await ipcInvoke(copyFiles({
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