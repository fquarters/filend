import { ipcMain } from "electron";
import { once } from 'events';
import { createReadStream, createWriteStream } from "original-fs";
import path from "path";
import { operationCancelEvent, copyConflictEmitEvent, copyConflictReplyEvent, copyProgressEvent } from "../../common/ipc/dynamic-event";
import { CopyArgs, CopyConflict, CopyConflictResult, HasDestination } from "../../common/ipc/protocol";
import nextId from "../common/id-generator";
import { expectReply, ipcEmitDynamic, notifyOperationError } from "../common/ipc";
import checkFileExists from "../fs/check-file-exists";
import collectFileInfos from "../fs/collect-file-info";
import makeDir from "../fs/make-dir";
import streamFinish from "../fs/stream-finish";
import readDir from "./read-dir";
import Logger from "js-logger";
import Message from "../../common/ipc/message-creators";

type CopyFileArgs = {
    source: string,
    name: string,
} & HasDestination

type CopySingleFileArgs = {
    size: number
} & CopyFileArgs

type CopyFilesArgs = {
    source: string[],
} & HasDestination

const logger = Logger.get('copy-files')

const getConflictResolveResult = (args: CopyConflict): Promise<CopyConflictResult> => {

    logger.debug('resolveConflict enter', args)

    const replyPromise = expectReply<CopyConflictResult>(copyConflictReplyEvent(args))

    ipcEmitDynamic({
        address: copyConflictEmitEvent(args.id),
        ...Message.copyConflict(args)
    })

    return replyPromise
}

const getCopier = (id: string) => {

    logger.debug('initializing', id)

    let cancelled = false
    let overwriteAll = false

    const resolveConflict = async (args: CopyFileArgs) => {

        const {
            destination,
            name
        } = args

        try {

            const response = await getConflictResolveResult({
                destination,
                id,
                name,
                conflictId: nextId()
            })

            logger.debug('resolveConflict response', response)

            cancelled = response === 'cancel'
            overwriteAll = response === 'all'

        } catch (e) {

            logger.error('resolveConflict conflict resolve failed', args, id)
            cancelled = true
        }
    }

    const copyFile = async (args: CopySingleFileArgs): Promise<void> => {

        const {
            source,
            destination,
            name,
            size
        } = args

        logger.debug('copyFile start', args, id)

        const destinationFile = path.resolve(destination, name)

        if (destinationFile === source) {
            throw "A file cannot be copied into itself"
        }

        const exists = await checkFileExists(destinationFile)

        if (exists && !overwriteAll) {

            await resolveConflict(args)
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

            ipcEmitDynamic({
                address: copyProgressEvent(id),
                ...Message.copyProgress({
                    id,
                    currentCopied: writer.bytesWritten,
                    currentFile: source,
                    currentSize: size
                })
            })
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

        if (destinationDir.indexOf(source) > 0) {

            throw "A directory cannot be copied into itself or its subdirectory"
        }

        logger.debug('copyDir will copy to', destinationDir)

        await makeDir(destinationDir)

        const dirInfo = await readDir(source)

        await copyFileList({
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
        cancel() {

            logger.debug('copy cancelled', id)

            cancelled = true
        }
    }
}

const copyFiles = async ({
    id,
    ...args
}: CopyArgs): Promise<void> => {

    logger.debug('copyFiles enter', id, args)

    const copier = getCopier(id)

    ipcMain.once(operationCancelEvent(id), copier.cancel)

    try {

        await copier.begin(args)

    } catch (e) {

        logger.error('copyFiles error', e)

        notifyOperationError({
            id,
            message: e
        })

    } finally {

        ipcMain.off(operationCancelEvent(id), copier.cancel)
    }

}

export default copyFiles