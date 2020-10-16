import { ipcRenderer } from "electron"
import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { copyConflictEmitEvent, copyConflictReplyEvent, copyProgressEvent } from "../../../../common/ipc/dynamic-event"
import Message from "../../../../common/ipc/message-creators"
import { CopyConflictMessage, CopyProgressMessage, NextIdMessage } from "../../../../common/ipc/messages"
import { CopyConflict, CopyConflictResult, CopyProgress } from "../../../../common/ipc/protocol"
import { Supplier } from "../../../../common/types"
import { ipcInvoke } from "../../../common/ipc"
import Strings from "../../../common/strings"
import { confirmDialog } from "../../../component/modal/global-modal-access"
import Selectors from "../data/selectors"
import { State } from "../data/state"
import pushTask from "./push-task"
import removeTask from "./remove-task"
import updateTabDirInfo from "./update-tab-dir-info"
import updateTask from "./update-task"

const resolveCopyConflict = async ({
    destination,
    name
}: CopyConflict) =>
    new Promise<CopyConflictResult>((resolve) => {

        confirmDialog({
            title: Strings.get('confirmDialogTitle'),
            children: Strings.getTemplate('copyConflictDialogMessage', {
                fileName: name,
                destination
            }),
            onCancel: () => resolve('cancel'),
            onOk: () => resolve('ok'),
            onOkAll: () => resolve('all'),
        })
    })

const getConflictHandler = (taskId: string) =>
    async (_: unknown, data: CopyConflict) => {

        const result = await resolveCopyConflict(data)

        ipcRenderer.send(copyConflictReplyEvent({
            id: taskId,
            conflictId: data.conflictId
        }), result)
    }


const copySelectedFiles = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const selectedFiles = Selectors.selectedFilesOnActiveTab(state)
    const otherSide = state.left.active ? 'right' : 'left'

    const taskId = await ipcInvoke<string, NextIdMessage>(Message.nextId())

    const onConflict = getConflictHandler(taskId)

    const destination = Selectors.activeTabOfSide(otherSide)(state).path

    const taskArgs = {
        destination,
        id: taskId,
        source: selectedFiles.map((file) => file.path)
    }

    const onProgress = (_: unknown, data: CopyProgress) => {

        dispatch(updateTask({
            id: taskId,
            currentProgress: data.currentCopied / data.currentSize,
            description: `Copying ${data.currentFile} to ${destination}`
        }))
    }

    ipcRenderer.on(copyConflictEmitEvent(taskId), onConflict)
    ipcRenderer.on(copyProgressEvent(taskId), onProgress)

    try {

        dispatch(pushTask({
            id: taskId,
            args: taskArgs,
            currentProgress: 0,
            description: 'Copying files',
            type: 'COPY'
        }))

        await ipcInvoke(Message.copyFiles(taskArgs))

    } finally {

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


}

export default copySelectedFiles