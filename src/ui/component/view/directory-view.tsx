import React, { useCallback } from "react"
import { DirInfo } from "../../../common/protocol"
import usePathOpen from "../../hook/use-path-open"
import "./directory-view.css"
import FileRow from "./directory/file-row"
import TopRow from "./directory/top-row"

type DirectoryViewProps = {
    dirInfo: DirInfo
}

const DirectoryView = ({
    dirInfo
}: DirectoryViewProps) => {

    const openPath = usePathOpen()

    const openFile = useCallback((name: string) => openPath(`${dirInfo.path}/${name}`), [
        dirInfo.path,
        openPath
    ])

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
                dirInfo.files.map((file) => <FileRow key={file.name}
                    openFile={openFile}
                    {...file} />)
            }
        </tbody>
    </table>
}

export default DirectoryView