import { ipcMain } from "electron";
import { once } from 'events';
import { createReadStream, createWriteStream } from "original-fs";
import path from "path";
import { copyCancelEvent, copyConflictEmitEvent, copyConflictReplyEvent, copyProgressEvent } from "../../common/ipc/dynamic-event";
import { CopyArgs, CopyConflict, CopyConflictResult } from "../../common/ipc/protocol";
import nextId from "../common/id-generator";
import { ipcEmitDynamic } from "../common/ipc";
import { notifyOperationError } from "../common/operation";
import checkFileExists from "../fs/check-file-exists";
import collectFileInfos from "../fs/collect-file-info";
import makeDir from "../fs/make-dir";
import streamFinish from "../fs/stream-finish";
import readDir from "./read-dir";
import Logger from "js-logger";
import Message from "../../common/ipc/message-creators";

type CopyDestination = {
    destination: string
}

type CopyFileArgs = {
    source: string,
    name: string,
} & CopyDestination

type CopySingleFileArgs = {
    size: number
} & CopyFileArgs

type CopyFilesArgs = {
    source: string[],
} & CopyDestination

const logger = Logger.get('copy-files')

const resolveConflict = ({
    id,
    conflictId,
    ...args
}: CopyConflict): Promise<CopyConflictResult> =>
    new Promise((resolve, reject) => {

        logger.debug('resolveConflict enter', id, args)

        ipcMain.once(copyConflictReplyEvent({
            conflictId,
            id
        }), (_, args) => {

            logger.debug('resolveConflict reply', args)

            const response = args[0] as CopyConflictResult

            resolve(response)
        })

        ipcEmitDynamic(
            copyConflictEmitEvent(id),
            Message.copyConflict({
                id,
                conflictId,
                ...args
            })
        )
    })

const getCopier = (id: string) => {

    logger.debug('initializing', id)

    let cancelled = false
    let overwriteAll = false

    const copyFile = async ({
        source,
        destination,
        name,
        size
    }: CopySingleFileArgs): Promise<void> => {

        logger.debug('copyFile start', source, destination, name, id)

        const destinationFile = path.resolve(destination, name)

        if (destinationFile === source) {
            throw "A file cannot be copied into itself"
        }

        const exists = await checkFileExists(destinationFile)

        if (exists && !overwriteAll) {

            const response = await resolveConflict({
                destination,
                id,
                name,
                conflictId: nextId()
            })

            cancelled = response === 'cancel'
            overwriteAll = response === 'all'

        }

        if (cancelled) {

            return
        }

        const reader = createReadStream(source)
        const writer = createWriteStream(destinationFile)

        for await (const chunk of reader) {

            if (!writer.write(chunk)) {

                await once(writer, 'drain')
            }

            if (cancelled) {

                logger.debug('copyFile cancelled', id)

                writer.close()
                reader.close()
                break
            }

            ipcEmitDynamic(copyProgressEvent(id), Message.copyProgress({
                id,
                currentCopied: writer.bytesWritten,
                currentFile: source,
                currentSize: size
            }))
        }

        writer.end()

        await streamFinish(writer)

        logger.debug('copyFile end', source, destination, name, id)

    }

    const copyDir = async ({
        destination,
        source,
        name
    }: CopyFileArgs): Promise<void> => {

        logger.debug('copyDir start', source, destination, name)

        if (cancelled) {

            return
        }

        const destinationDir = path.resolve(destination, name)

        logger.debug('copyDir will copy to', destinationDir)

        await makeDir(destinationDir)

        const dirInfo = await readDir(source)

        return copyFileList({
            source: dirInfo.files.map((file) => file.path),
            destination: destinationDir
        })
    }

    const copyFileList = async ({
        source,
        destination
    }: CopyFilesArgs): Promise<void> => {

        logger.debug('copyFileList start', source, destination)

        const fileInfos = await collectFileInfos(source)

        for (let src of fileInfos) {

            if (cancelled) {

                break
            }

            const nextArgs: CopyFileArgs = {
                source: src.path,
                name: src.name,
                destination
            }

            if (src.stats.isFile) {

                await copyFile({
                    ...nextArgs,
                    size: src.stats.size
                })

            } else {

                await copyDir(nextArgs)
            }

        }

        logger.debug('copyFileList end', source, destination)
    }

    return {
        begin: copyFileList,
        cancel: () => {

            logger.debug('cancelled', id)

            return cancelled = true;
        }
    }
}

const copyFiles = async ({
    id,
    ...args
}: CopyArgs): Promise<void> => {

    logger.debug('copyFiles', id, args)

    const copier = getCopier(id)

    ipcMain.once(copyCancelEvent(id), copier.cancel)

    try {

        await copier.begin(args)

    } catch (e) {

        logger.error('copyFiles', e)

        notifyOperationError({
            id,
            message: e
        })

    } finally {

        ipcMain.off(copyCancelEvent(id), copier.cancel)
    }

}

export default copyFiles