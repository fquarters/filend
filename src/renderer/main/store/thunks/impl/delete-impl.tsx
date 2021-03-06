import { ipcRenderer } from "electron"
import React from "react"
import { batch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { copyConflictEmitEvent, copyProgressEvent, deleteProgressEvent, dirRemovalConfirmEmitEvent, dirRemovalConfirmReplyEvent } from "../../../../../common/ipc/dynamic-event"
import Message from "../../../../../common/ipc/message-creators"
import { NextIdMessage } from "../../../../../common/ipc/messages"
import { DeleteProgress, DirRemovalConfirm, DirRemovalConfirmResult, FileInfo } from "../../../../../common/ipc/protocol"
import { Supplier } from "../../../../../common/types"
import { ipcInvoke } from "../../../../common/ipc"
import { Locales } from "../../../../common/locales"
import Strings from "../../../../common/strings"
import { confirmDialog } from "../../../../component/modal/global-modal-access"
import Selectors from "../../data/selectors"
import { State } from "../../data/state"
import pushTask from "../push-task"
import removeTask from "../remove-task"
import updateTabDirInfo from "../update-tab-dir-info"
import updateTask from "../update-task"


const confirmDirRemoval = (locale: Locales) => async (path: string) =>
    new Promise<DirRemovalConfirmResult>((resolve) => {

        confirmDialog({
            title: Strings.get(locale)('confirmDialogTitle'),
            children: Strings.getTemplate(locale)('dirRemovalConfirmDialogMessage', {
                dirName: path
            }),
            onCancel: () => resolve('cancel'),
            onOk: () => resolve('ok'),
            onOkAll: () => resolve('all'),
        })
    })

const getConfirmHandler = (locale: Locales) => (taskId: string) =>
    async (_: unknown, data: DirRemovalConfirm) => {

        const result = await confirmDirRemoval(locale)(data.path)

        ipcRenderer.send(dirRemovalConfirmReplyEvent({
            id: taskId,
            confirmId: data.confirmId
        }), result)
    }

const confirmDelete = (locale: Locales) => async (selectedFiles: FileInfo[]) =>
    new Promise<boolean>((resolve) => {

        confirmDialog({
            title: Strings.get(locale)('confirmDialogTitle'),
            children: <React.Fragment>
                {Strings.get(locale)('deleteConfirmDialogMessage')}
                {
                    selectedFiles.map((info) => <p key={info.name}>
                        {info.name}
                    </p>)
                }
            </React.Fragment>,
            onCancel: () => resolve(false),
            onOk: () => resolve(true)
        })
    })

type DeleteImplArgs = {
    askConfirm?: boolean
}

const deleteImpl = ({
    askConfirm = true
}: DeleteImplArgs) => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

        const state = getState()
        const {
            side,
            tab
        } = Selectors.currentActiveState(state)

        const selectedFiles = Selectors.selectedFilesOnActiveTab(state)

        if (askConfirm) {
            const confirmResult = await confirmDelete(state.locale)(selectedFiles)

            if (!confirmResult) {
                return
            }
        }

        const taskId = await ipcInvoke<string, NextIdMessage>(Message.nextId())

        const onConfirm = getConfirmHandler(state.locale)(taskId)

        const taskArgs = {
            id: taskId,
            source: selectedFiles.map((file) => file.path),
            permanently: false // TODO
        }

        const onProgress = (_: unknown, data: DeleteProgress) => {

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

        } finally {

            batch(() => {
                dispatch(updateTabDirInfo({
                    side,
                    tab
                }))
                dispatch(removeTask(taskId))
            })

            ipcRenderer.off(copyConflictEmitEvent(taskId), onConfirm)
            ipcRenderer.off(copyProgressEvent(taskId), onProgress)
        }

    }

export default deleteImpl