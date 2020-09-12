import React from "react"
import { DirInfo } from "../../../../common/ipc/protocol"
import FileRow from "./file-row"
import TopRow from "./top-row"

type FileTableProps = {
    dirInfo: DirInfo
}

const FileTable = ({
    dirInfo
}: FileTableProps) => <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Extension</th>
                <th>Date</th>
                <th>Size</th>
            </tr>
        </thead>
        <colgroup>
            <col className="directory-view__file-table__col"/>
            <col className="directory-view__file-table__col"/>
            <col className="directory-view__file-table__col"/>
            <col className="directory-view__file-table__col"/>
        </colgroup>
        <tbody>
            <TopRow index={0} />
            {dirInfo.files.map((file, index) => <FileRow key={file.name}
                index={index + 1}
                {...file} />)}
        </tbody>
    </table>

export default FileTable