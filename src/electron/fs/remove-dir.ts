import { rmdir } from "fs"

const removeDir = async (path: string): Promise<void> => new Promise((resolve, reject) => {

    rmdir(path, {

        recursive: true

    }, (err) => {

        if (err) {

            reject(err)
        }

        resolve()
    })
})

export default removeDir