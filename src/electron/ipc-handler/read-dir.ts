import path from 'path'
import { DirInfo } from '../../common/ipc/protocol'
import collectFileInfos from '../fs/collect-file-info'
import getDirFiles from '../fs/get-dir-files'
import getStats from '../fs/get-stats'
import mapStatsToFileInfoStats from '../fs/map-file-stats'

const readDir = async (dirPath: string): Promise<DirInfo> => {

    const filePaths = await getDirFiles(dirPath)
    const stats = await getStats(dirPath)

    const files = await collectFileInfos(filePaths.map((filename) =>
        path.resolve(dirPath, filename)))

    return Promise.resolve({
        name: path.basename(path.resolve(dirPath)),
        path: path.resolve(dirPath),
        stats: mapStatsToFileInfoStats(stats),
        files
    })
}

export default readDir

