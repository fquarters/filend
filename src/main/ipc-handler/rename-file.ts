import { RenameFileArgs } from "../../common/ipc/protocol"
import fs from 'original-fs'

const renameFileHandler = async ({
    newPath,
    oldPath
}: RenameFileArgs) => new Promise((resolve, reject) => {

    fs.rename(oldPath, newPath, (err) => {

        if (err) {
            reject(err)
        }

        resolve()
    })
})

export default renameFileHandler