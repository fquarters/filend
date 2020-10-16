import path from "path"
import checkFileExists from "../fs/check-file-exists"
import makeDir from "../fs/make-dir"
import { MakeDir } from "../../common/ipc/protocol"
import { notifyOperationError } from "../common/ipc"

const makeDirHandler = async (args: MakeDir): Promise<boolean> => {

    const resolvedPath = path.resolve(...args.path)

    const exists = await checkFileExists(resolvedPath)

    if (!exists) {

        try {

            await makeDir(resolvedPath)

        } catch (e) {

            notifyOperationError({
                id: args.id,
                message: e
            })
        }
    }

    return Promise.resolve(!exists)
}

export default makeDirHandler
