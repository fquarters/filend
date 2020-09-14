import { readdir } from "original-fs"

const getDirFiles = (dirPath: string) => new Promise<string[]>((resolve, reject) => {

    readdir(dirPath, (err, files) => {

        if (err != null) {
            reject(err)
        }

        resolve(files)

    })
})

export default getDirFiles
