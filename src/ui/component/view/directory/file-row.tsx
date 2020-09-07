import moment from "moment";
import React, { useCallback, useRef, useEffect } from "react";
import { FileInfo } from "../../../../common/protocol";
import { Consumer } from "../../../../common/types";
import { RowProps } from "./types";
import useRowInFocus from "../../../hook/use-row-in-focus";

type FileRowProps = FileInfo
    & RowProps
    & {
        openFile: Consumer<string>
    }

const FileRow = ({
    name,
    stats,
    openFile,
    inFocus
}: FileRowProps) => {

    const doOpenFile = useCallback(() => openFile(name), [openFile, name])

    const rowRef = useRef<HTMLTableRowElement | null>(null)

    const classInFocus = useRowInFocus(rowRef.current, inFocus)

    return <tr key={name}
        className={`${classInFocus}`}
        ref={rowRef}
        onDoubleClick={doOpenFile}>
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