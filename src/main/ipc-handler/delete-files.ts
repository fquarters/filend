import { ipcMain } from "electron";
import Logger from "js-logger";
import { deleteProgressEvent, dirRemovalConfirmEmitEvent, dirRemovalConfirmReplyEvent, operationCancelEvent } from "../../common/ipc/dynamic-event";
import Message from "../../common/ipc/message-creators";
import { DeleteArgs, DirRemovalConfirm, DirRemovalConfirmResult } from "../../common/ipc/protocol";
import nextId from "../common/id-generator";
import { expectReply, ipcEmitDynamic } from "../common/ipc";
import { notifyOperationError } from "../common/operation";
import collectFileInfos from "../fs/collect-file-info";
import moveToTrash from "../fs/move-to-trash";
import removeDir from "../fs/remove-dir";
import removeFile from "../fs/remove-file";
import readDir from "./read-dir";

type DeleteFileArgs = {
    source: string
}

type DeleteDirArgs = {
    name: string
} & DeleteFileArgs

type DeleteFilesArgs = {
    source: string[]
}

const logger = Logger.get('delete-files')


const getConfirmResult = async (args: DirRemovalConfirm): Promise<DirRemovalConfirmResult> => {

    logger.debug('confirmNotEmptyDirRemoval enter', args)

    const replyPromise = expectReply<DirRemovalConfirmResult>(dirRemovalConfirmReplyEvent(args))

    ipcEmitDynamic({
        address: dirRemovalConfirmEmitEvent(args.id),
        ...Message.dirRemovalConfirm(args)
    })

    return replyPromise
}

type RemoverInitArgs = {
    id: string,
    permanently: boolean
}

const getRemover = ({
    id,
    permanently
}: RemoverInitArgs) => {

    let cancelled = false
    let removeAll = false

    const deleteFile = async ({
        source
    }: DeleteFileArgs): Promise<void> => {

        if (cancelled) {
            return
        }

        if (permanently) {

            await removeFile(source)

        } else {

            await moveToTrash(source)
        }
    }

    const confirmRemoval = async ({ source, name }: DeleteDirArgs) => {

        try {

            const confirmResult = await getConfirmResult({
                confirmId: nextId(),
                id,
                path: source
            })

            removeAll = confirmResult === 'all'
            cancelled = confirmResult === 'cancel'

        } catch (e) {

            logger.debug('deleteDir confirm failed', e, source, name)
            cancelled = true
        }
    }

    const deleteDir = async (args: DeleteDirArgs): Promise<void> => {

        const {
            source,
            name
        } = args

        logger.debug('deleteDir start', source, name)

        if (cancelled) {

            return
        }

        const dirInfo = await readDir(source)

        if (!removeAll && dirInfo.files.length > 0) {

            await confirmRemoval(args)
        }

        if (cancelled) {

            return

        } else if (permanently) {

            await removeDir(source)

        } else {

            await moveToTrash(source)
        }

    }

    const deleteFileList = async ({
        source
    }: DeleteFilesArgs) => {

        logger.debug('deleteFileList start', source)

        const fileInfos = await collectFileInfos(source)

        for (let src of fileInfos) {

            if (cancelled) {

                break
            }

            ipcEmitDynamic({
                address: deleteProgressEvent(id),
                ...Message.deleteProgress({
                    id,
                    currentFile: src.path
                })
            })

            const nextArgs: DeleteFileArgs = {
                source: src.path
            }

            if (src.stats.isFile) {

                await deleteFile(nextArgs)

            } else {

                await deleteDir({
                    ...nextArgs,
                    name: src.name
                })
            }

        }

        logger.debug('deleteFileList end', source)
    }

    return {
        begin: deleteFileList,
        cancel() {

            logger.debug('delete cancelled', id)

            return cancelled = true;
        }
    }
}

const deleteFiles = async ({
    id,
    ...args
}: DeleteArgs): Promise<void> => {

    logger.debug('deleteFiles enter', args)

    const remover = getRemover({ id, ...args })

    ipcMain.once(operationCancelEvent(id), remover.cancel)

    try {

        await remover.begin(args)

    } catch (e) {

        logger.error('deleteFiles error', e)

        notifyOperationError({
            id,
            message: e
        })

    } finally {

        ipcMain.off(operationCancelEvent(id), remover.cancel)

    }
}

export default deleteFiles