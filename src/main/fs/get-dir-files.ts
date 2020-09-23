import { readdir } from "original-fs"

const ignoredFiles = ['.DS_Store']

const getDirFiles = (dirPath: string) => new Promise<string[]>((resolve, reject) => {

    readdir(dirPath, (err, files) => {

        if (err != null) {
            reject(err)
        }

        resolve(files.filter((file) => ignoredFiles.indexOf(file) < 0))

    })
})

export default getDirFiles
