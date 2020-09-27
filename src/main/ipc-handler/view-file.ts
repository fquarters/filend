import { ipcMain } from "electron"
import Logger from "js-logger"
import { createReadStream } from "original-fs"
import { viewFileCancelEmitEvent, viewFileChunkEmitEvent } from "../../common/ipc/dynamic-event"
import { ViewFileArgs, ViewFileChunkArgs, ViewFileChunkResponse } from "../../common/ipc/protocol"
import { createViewerWindow } from "../create-window"
import getFileInfo from "../fs/get-file-info"

const chunkSize = 64 * 1024

const logger = Logger.get('view-file-handler')

const viewFileHandler = async (args: ViewFileArgs) => {

    const reader = createReadStream(args.path)

    const fileInfo = await getFileInfo(args.path)

    createViewerWindow(args)

    const handleChunkRequest = async (_: unknown, args: ViewFileChunkArgs): Promise<ViewFileChunkResponse> => {

        logger.debug('handleChunkRequest', args)

        const stopAt = chunkSize + args.start
        const startedAt = reader.bytesRead

        if (startedAt > stopAt) {

            logger.debug('handleChunkRequest way ahead')

            return {
                content: '',
                size: 0
            }
        }

        const result = Buffer.alloc(Math.min(fileInfo.stats.size, chunkSize))
        let position = 0

        for await (const chunk of reader) {

            const buffer = chunk as Buffer

            buffer.copy(result, position)
            position += reader.bytesRead - startedAt

            if (reader.bytesRead > stopAt) {
                break
            }
        }

        return {
            content: result.toString(args.encoding),
            size: reader.bytesRead - startedAt
        }
    }

    ipcMain.handle(viewFileChunkEmitEvent(args.id), handleChunkRequest)
    ipcMain.once(viewFileCancelEmitEvent(args.id), () => {

        ipcMain.removeHandler(viewFileChunkEmitEvent(args.id))
    })
}

export default viewFileHandler