import { useState, useEffect } from "react"
import { DirInfo } from "../../common/protocol"
import { ipcInvoke } from "../common/ipc"
import { readDir } from "../../common/ipc-creators"

const useDirInfo = (path: string) => {

    const [dirInfo, setDirInfo] = useState<DirInfo | null>(null)

    useEffect(() => {

        const getDirContent = async () => {

            const content = await ipcInvoke<DirInfo>(readDir(path))

            setDirInfo(content)
        }

        getDirContent()

    }, [path])

    return dirInfo
}

export default useDirInfo