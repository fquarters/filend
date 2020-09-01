import React, { useEffect, useState } from "react"
import { readDir } from "../../common/ipc-creators"
import { ipcInvoke } from "../common/ipc"
import { FileInfo } from "../../common/protocol"

const defaultPath = './'

const DirectoryView = () => {

    const [files, setFiles] = useState<FileInfo[]>([])

    useEffect(() => {

        const getDirContent = async () => {

            const content = await ipcInvoke<FileInfo[]>(readDir(defaultPath))

            setFiles(content)
        }

        getDirContent()

    }, [])

    return <table>
        <tbody>
            {
                files.map(({
                    name
                }) => <tr key={name}>
                <td>
                    {name}
                </td>
            </tr>)
            }
        </tbody>
    </table>
}

export default DirectoryView