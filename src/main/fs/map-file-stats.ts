import { Stats } from "original-fs"
import { FileInfoStats } from "../../common/ipc/protocol"

const mapStatsToFileInfoStats = (stats: Stats): FileInfoStats => ({
    ...stats,
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory()
})

export default mapStatsToFileInfoStats