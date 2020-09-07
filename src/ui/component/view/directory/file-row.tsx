import moment from "moment";
import React, { useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { FileInfo } from "../../../../common/protocol";
import useRowInFocus from "../../../hook/use-row-in-focus";
import openFileInFocus from "../../../store/thunks/open-file-in-focus";
import { RowProps } from "./types";

type FileRowProps = FileInfo
    & RowProps

const FileRow = ({
    name,
    stats,
    inFocus
}: FileRowProps) => {

    const dispatch = useDispatch()

    const doOpenFile = useCallback(() => dispatch(openFileInFocus()), [
        dispatch
    ])

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