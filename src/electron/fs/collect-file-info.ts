import { stat } from "original-fs"
import { FileInfo } from "../../common/ipc/protocol"
import mapStatsToFileInfoStats from "./map-file-stats"
import path from "path"

const collectFileInfos = (filePaths: string[]): Promise<FileInfo[]> =>

    Promise.all(filePaths.map((filePath) => {

        return new Promise<FileInfo>((resolve, reject) => {

            stat(filePath, (err, stats) => {

                if (err != null) {
                    reject(err)
                }

                resolve({
                    name: filePath.split(path.sep).pop() || filePath,
                    path: filePath,
                    stats: mapStatsToFileInfoStats(stats)
                })
            })
        })
    }))


export default collectFileInfos