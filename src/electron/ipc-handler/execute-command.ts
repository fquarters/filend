import process from 'child_process'
import { shell } from "electron"
import { exists } from "fs"
import path from 'path'
import { CommandData } from "../../common/ipc/protocol"
import Logger from 'js-logger'

const tryOpen = async (args: CommandData): Promise<boolean> => {

    const filePath = path.resolve(args.path, args.command)

    const fileExists = await new Promise<boolean>((resolve) =>
        exists(filePath, (exists) =>
            resolve(exists)))

    if (fileExists) {

        shell.openPath(filePath)
        return true

    } else {
        return false
    }
}

const logger = Logger.get('execute-command')

const executeCommand = (args: CommandData): Promise<void> => new Promise((resolve, reject) => {

    tryOpen(args).then((opened) => {

        if (!opened) {

            try {

                logger.debug('executing', args.command)

                process.exec(args.command)

            } catch (e) {

                logger.error(e)
            }
        } 

        resolve()
    })

})

export default executeCommand