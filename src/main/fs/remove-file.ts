import { unlink } from "fs"

const removeFile = async (path: string): Promise<void> => new Promise((resolve, reject) => {

    unlink(path, (err) => {

        if (err) {

            reject(err)
        }

        resolve()
    })
})

export default removeFile