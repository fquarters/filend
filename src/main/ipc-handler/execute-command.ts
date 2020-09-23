import process from 'child_process'
import Logger from 'js-logger'
import { CommandData } from "../../common/ipc/protocol"
import tryOpen from '../fs/try-open-file'

const logger = Logger.get('execute-command')

const executeCommand = async (args: CommandData): Promise<void> => {

    const opened = await tryOpen(args)

    if (!opened) {

        try {

            logger.debug('executing', args.command)

            process.exec(args.command)

            return Promise.resolve()
        }
        catch (e) {

            logger.error(e)

            return Promise.reject(e)
        }
    }

    return Promise.resolve()
}

export default executeCommand