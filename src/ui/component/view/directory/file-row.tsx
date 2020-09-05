import moment from "moment";
import React, { useCallback } from "react";
import { FileInfo } from "../../../../common/protocol";
import { Consumer } from "../../../../common/types";

type FileRowProps = FileInfo & {
    openFile: Consumer<string>
}

const FileRow = ({
    name,
    stats,
    openFile
}: FileRowProps) => {

    const doOpenFile = useCallback(() => openFile(name), [openFile, name])

    return <tr key={name} onDoubleClick={doOpenFile}>
        <td>
            {name}
        </td>
        <td>
            {stats.isDirectory ? 'DIR' : name.split('.').pop()}
        </td>
        <td>
            {moment(stats.ctime).format()}
        </td>
        <td>
            {stats.size}
        </td>
    </tr>;
}

export default FileRow