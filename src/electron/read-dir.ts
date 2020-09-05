import { readdir, stat, Stats } from 'fs'
import path from 'path'
import { FileInfo, DirInfo } from '../common/protocol'

const getFileInfoStats = (stats: Stats) => ({
    ...stats,
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory()
})

const readDir = (dirPath: string): Promise<DirInfo> =>

    new Promise((resolve, reject) => {

        readdir(dirPath, (err, files) => {

            if (err != null) {
                reject(err)
            }

            const filePromises = files.map((fileName) => {

                const filePath = path.resolve(dirPath, fileName)

                return new Promise<FileInfo>((resolve, reject) => {

                    stat(filePath, (err, stats) => {

                        if (err != null) {
                            reject(err)
                        }

                        resolve({
                            name: fileName,
                            path: filePath,
                            stats: getFileInfoStats(stats)
                        })
                    })
                })
            })

            stat(dirPath, (err, stats) => {

                if (err != null) {
                    reject(err)
                }

                Promise.all(filePromises).then((files) => {

                    resolve({
                        name: path.basename(path.resolve(dirPath)),
                        path: path.resolve(dirPath),
                        stats: getFileInfoStats(stats),
                        files
                    })
                })

            })
        })
    })

export default readDir