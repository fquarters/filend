import { ipcRenderer } from "electron"
import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { copyConflictEmitEvent, copyConflictReplyEvent, copyProgressEvent, deleteProgressEvent, dirRemovalConfirmEmitEvent, dirRemovalConfirmReplyEvent } from "../../../common/ipc/dynamic-event"
import Message from "../../../common/ipc/message-creators"
import { CopyConflictMessage, CopyProgressMessage, DeleteProgressMessage, DirRemovalConfirmMessage, NextIdMessage } from "../../../common/ipc/messages"
import { CopyConflictResult, DeleteProgress, DirRemovalConfirmResult } from "../../../common/ipc/protocol"
import { Supplier } from "../../../common/types"
import { ipcInvoke } from "../../common/ipc"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import pushTask from "./push-task"
import removeTask from "./remove-task"
import updateTabDirInfo from "./update-tab-dir-info"
import updateTask from "./update-task"

const getConfirmHandler = (taskId: string) =>
    (_: unknown, args: DirRemovalConfirmMessage) => {

        const {
            confirmId,
            id,
            path
        } = args.data

        const result = confirm(`Directory ${path} is not empty. Are you sure you want to delete it?`)

        const response: DirRemovalConfirmResult = result ? 'ok' : 'cancel'

        ipcRenderer.send(dirRemovalConfirmReplyEvent({
            id: taskId,
            confirmId
        }), response)
    }


const deleteSelectedFiles = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()
    const {
        side,
        tab
    } = Selectors.currentActiveState(state)

    const selectedFiles = Selectors.selectedFilesOnActiveTab(state)
    const otherSide = side === 'left' ? 'right' : 'left'

    const taskId = await ipcInvoke<string, NextIdMessage>(Message.nextId())

    const onConfirm = getConfirmHandler(taskId)

    const taskArgs = {
        id: taskId,
        source: selectedFiles.map((file) => file.path),
        permanently: false // TODO
    }

    const onProgress = (_: unknown, { data }: DeleteProgressMessage) => {

        dispatch(updateTask({
            id: taskId,
            currentProgress: 0,
            description: `Deleting ${data.currentFile}`
        }))
    }

    ipcRenderer.on(dirRemovalConfirmEmitEvent(taskId), onConfirm)
    ipcRenderer.on(deleteProgressEvent(taskId), onProgress)

    try {

        dispatch(pushTask({
            id: taskId,
            args: taskArgs,
            currentProgress: 0,
            description: 'Deleting files',
            type: 'DELETE'
        }))
    
        await ipcInvoke(Message.deleteFiles(taskArgs))
    
        batch(() => {
            dispatch(updateTabDirInfo({
                side,
                tab
            }))
            dispatch(removeTask(taskId))
        })

    } finally {

        ipcRenderer.off(copyConflictEmitEvent(taskId), onConfirm)
        ipcRenderer.off(copyProgressEvent(taskId), onProgress)
    }

}

export default deleteSelectedFiles