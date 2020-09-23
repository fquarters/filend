import React, { useState } from "react"
import { DirInfo } from "../../../../common/ipc/protocol"
import TableHeader from "../../common/table-header"
import { ColumnMeta } from "../../common/types"
import FileRow from "./file-row"
import TopRow from "./top-row"
import NewDirRow from "./new-dir-row"

type FileTableProps = {
    dirInfo: DirInfo,
    creatingNewDir: boolean
}

const defaultColumns = [
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
]

const FileTable = ({
    dirInfo,
    creatingNewDir
}: FileTableProps) => {

    const [columns, setColumns] = useState<ColumnMeta[]>(defaultColumns)

    const rowIndexShift = 1 + (creatingNewDir? 1 : 0)

    return <table>
        <TableHeader columns={columns} setColumns={setColumns} />
        <tbody>
            <TopRow index={0} />
            {
                creatingNewDir && <NewDirRow/>
            }
            {dirInfo.files.map((file, index) => <FileRow key={file.name}
                index={index + rowIndexShift}
                {...file} />)}
        </tbody>
    </table>
}

export default FileTable