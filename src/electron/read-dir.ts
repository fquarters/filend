import { readdir, stat } from 'fs'
import path from 'path'
import { FileInfo } from '../common/protocol'

const readDir = (dirPath: string): Promise<FileInfo[]> =>

    new Promise((resolve, reject) => {

        readdir(dirPath, (err, files) => {

            if (err != null) {
                reject(err)
            }

            const promises = files.map((fileName) => {

                const filePath = path.resolve(dirPath, fileName)

                return new Promise<FileInfo>((resolve, reject) => {

                    stat(filePath, (err, stats) => {

                        if (err != null) {
                            reject(err)
                        }

                        resolve({
                            name: fileName,
                            path: filePath,
                            stats
                        })
                    })
                })
            })

            resolve(Promise.all(promises))
        })
    })

export default readDir