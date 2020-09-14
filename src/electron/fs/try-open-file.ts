import { CommandData } from "../../common/ipc/protocol"
import checkFileExists from "./check-file-exists"
import { shell } from "electron"
import path from "path"

const tryOpen = async (args: CommandData): Promise<boolean> => {

    const filePath = path.resolve(args.path, args.command)

    const fileExists = await checkFileExists(filePath)

    if (fileExists) {

        shell.openPath(filePath)
        return true

    } else {
        return false
    }
}

export default tryOpen