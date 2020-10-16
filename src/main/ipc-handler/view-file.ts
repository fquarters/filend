import { ipcMain } from "electron"
import Logger from "js-logger"
import { createReadStream } from "original-fs"
import { VIEWER_CHUNK_SIZE } from "../../common/constants"
import { viewFileCancelEmitEvent, viewFileChunkEmitEvent } from "../../common/ipc/dynamic-event"
import { FileInfo, ViewFileArgs, ViewFileChunkArgs, ViewFileChunkResponse } from "../../common/ipc/protocol"
import lazy, { Lazy } from "../../common/lazy"
import { createViewerWindow } from "../create-window"
import getFileInfo from "../fs/get-file-info"

const logger = Logger.get('view-file-handler')

const getFileReader = (args: ViewFileArgs) => {

    let lazyFileInfo: Lazy<Promise<FileInfo>>

    const reinit = () => {

        lazyFileInfo = lazy(() => getFileInfo(args.path))
    }

    reinit()

    const handleChunkRequest = async (_: unknown, args: ViewFileChunkArgs): Promise<ViewFileChunkResponse> => {

        const reader = createReadStream(args.path, {
            start: args.start,
            end: args.start + VIEWER_CHUNK_SIZE
        })

        logger.debug('handleChunkRequest', args, reader.bytesRead)

        const fileInfo = await lazyFileInfo.get()
        const result = Buffer.alloc(Math.min(fileInfo.stats.size, VIEWER_CHUNK_SIZE))
        let position = 0

        for await (const chunk of reader) {

            const buffer = chunk as Buffer

            buffer.copy(result, position)
            position += reader.bytesRead

            logger.debug('handleChunkRequest position', position)
        }

        logger.debug('handleChunkRequest size', result.byteLength)

        reader.close()

        return {
            content: result.toString(args.encoding),
            size: reader.bytesRead,
            totalSize: fileInfo.stats.size
        }
    }

    return {
        handleChunkRequest
    }
}

const viewFileHandler = async (args: ViewFileArgs) => {

    createViewerWindow(args)

    const fileReader = getFileReader(args)

    ipcMain.handle(viewFileChunkEmitEvent(args.id), fileReader.handleChunkRequest)
    ipcMain.on(viewFileCancelEmitEvent(args.id), () => {

        logger.debug('viewFileHandler cancelled', args)

    })

    // TODO: clear handler on viewer window closing
    // ipcMain.removeHandler(viewFileChunkEmitEvent(args.id))

}

export default viewFileHandler