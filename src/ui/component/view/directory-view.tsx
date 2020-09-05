import React, { useEffect, useState } from "react"
import { readDir } from "../../../common/ipc-creators"
import { FileInfo } from "../../../common/protocol"
import { ipcInvoke } from "../../common/ipc"
import "./directory-view.css"
import FileRow from "./file-row"
import TopRow from "./top-row"

type DirectoryViewProps = {
    path: string
}

const DirectoryView = ({
    path
}: DirectoryViewProps) => {

    const [files, setFiles] = useState<FileInfo[]>([])

    useEffect(() => {

        const getDirContent = async () => {

            const content = await ipcInvoke<FileInfo[]>(readDir(path))

            setFiles(content)
        }

        getDirContent()

    }, [path])

    return <table className={'directory-view'}>
        <thead>
            <tr>
                <th>Name</th>
                <th>Extension</th>
                <th>Date</th>
                <th>Size</th>
            </tr>
        </thead>
        <tbody>
            <TopRow />
            {
                files.map((file) => <FileRow key={file.name} {...file} />)
            }
        </tbody>
    </table>
}

export default DirectoryView