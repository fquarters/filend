import { ipcRenderer } from "electron"
import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { copyConflictEmitEvent, copyConflictReplyEvent, copyProgressEvent } from "../../../common/ipc/dynamic-event"
import Message from "../../../common/ipc/message-creators"
import { CopyConflictMessage, CopyProgressMessage, NextIdMessage } from "../../../common/ipc/messages"
import { CopyConflictResult } from "../../../common/ipc/protocol"
import { Supplier } from "../../../common/types"
import { ipcInvoke } from "../../common/ipc"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import pushTask from "./push-task"
import removeTask from "./remove-task"
import updateTabDirInfo from "./update-tab-dir-info"
import updateTask from "./update-task"

const getConflictHandler = (taskId: string) =>
    (_: unknown, args: CopyConflictMessage) => {

        const {
            conflictId,
            destination,
            name
        } = args.data

        const result = confirm(`File ${name} already exists in ${destination}. Overwrite?`)

        const response: CopyConflictResult = result ? 'ok' : 'cancel'

        ipcRenderer.send(copyConflictReplyEvent({
            id: taskId,
            conflictId
        }), response)
    }


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

    const taskId = await ipcInvoke<string, NextIdMessage>(Message.nextId())

    const onConflict = getConflictHandler(taskId)

    const destination = Selectors.activeTabOfSide(otherSide)(state).path
    const taskArgs = {
        destination,
        id: taskId,
        source: selectedFiles.map((file) => file.path)
    }

    const onProgress = (_: unknown, { data }: CopyProgressMessage) => {

        dispatch(updateTask({
            id: taskId,
            currentProgress: data.currentCopied / data.currentSize,
            description: `Copying ${data.currentFile} to ${destination}`
        }))
    }

    ipcRenderer.on(copyConflictEmitEvent(taskId), onConflict)
    ipcRenderer.on(copyProgressEvent(taskId), onProgress)

    dispatch(pushTask({
        id: taskId,
        args: taskArgs,
        currentProgress: 0,
        description: 'Copying files',
        type: 'COPY'
    }))

    await ipcInvoke(Message.copyFiles(taskArgs))

    batch(() => {
        dispatch(updateTabDirInfo({
            side: otherSide,
            tab: state[otherSide].activeTab
        }))
        dispatch(removeTask(taskId))
    })

    ipcRenderer.off(copyConflictEmitEvent(taskId), onConflict)
    ipcRenderer.off(copyProgressEvent(taskId), onProgress)
}

export default copySelectedFiles