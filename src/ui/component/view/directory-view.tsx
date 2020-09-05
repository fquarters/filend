import React from "react"
import { DirInfo } from "../../../common/protocol"
import "./directory-view.css"
import FileRow from "./file-row"
import TopRow from "./top-row"

type DirectoryViewProps = {
    dirInfo: DirInfo
}

const DirectoryView = ({
    dirInfo
}: DirectoryViewProps) => {

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
                dirInfo.files.map((file) => <FileRow key={file.name} {...file} />)
            }
        </tbody>
    </table>
}

export default DirectoryView