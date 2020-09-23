import React, { useState } from "react"
import { DirInfo } from "../../../../common/ipc/protocol"
import TableHeader from "../../common/table-header"
import { ColumnMeta } from "../../common/types"
import FileRow from "./file-row"
import TopRow from "./top-row"

type FileTableProps = {
    dirInfo: DirInfo
}

const FileTable = ({
    dirInfo
}: FileTableProps) => {

    const [columns, setColumns] = useState<ColumnMeta[]>([
        {
            title: 'Name',
            key: 'name',
            resizable: true
        },
        {
            title: 'Extension',
            key: 'ext',
            resizable: true
        },
        {
            title: 'Date',
            key: 'date',
            resizable: true
        },
        {
            title: 'Size',
            key: 'size'
        }
    ])

    return <table>
        <TableHeader columns={columns} setColumns={setColumns} />
        <tbody>
            <TopRow index={0} />
            {dirInfo.files.map((file, index) => <FileRow key={file.name}
                index={index + 1}
                {...file} />)}
        </tbody>
    </table>
}

export default FileTable