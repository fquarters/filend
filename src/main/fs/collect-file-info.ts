import { FileInfo } from "../../common/ipc/protocol"
import getFileInfo from "./get-file-info"

const collectFileInfos = (filePaths: string[]): Promise<FileInfo[]> =>

    Promise.all(filePaths.map((filePath) => getFileInfo(filePath)))


export default collectFileInfos