import moment from "moment";
import React, { useRef, useMemo, useContext } from "react";
import { FileInfo } from "../../../../common/ipc/protocol";
import useRowFileOpen from "../../../hook/use-row-file-open";
import useRowFocusSet from "../../../hook/use-row-focus-set";
import useRowInFocus from "../../../hook/use-row-in-focus";
import { RowProps } from "./types";
import DirectoryContext from "../../context/directory-context";

type FileRowProps = FileInfo
    & RowProps

const selectedRowClass = 'directory-view__file--selected'

const FileRow = ({
    name,
    stats,
    index
}: FileRowProps) => {

    const doOpenFile = useRowFileOpen()

    const rowRef = useRef<HTMLTableRowElement | null>(null)

    const classInFocus = useRowInFocus({
        row: rowRef.current,
        index
    })

    const {
        selectedRows
    } = useContext(DirectoryContext)!

    const rowSelected = useMemo(() => selectedRows.indexOf(index) > -1, [
        index,
        selectedRows
    ])

    const setFocus = useRowFocusSet(index)

    return <tr key={name}
        className={`directory-view__file ${classInFocus} ${rowSelected ? selectedRowClass : ''}`}
        ref={rowRef}
        onClick={setFocus}
        onDoubleClick={doOpenFile}>
        <td>
            {name}
        </td>
        <td>
            {stats.isDirectory ? 'DIR' : name.split('.').pop()}
        </td>
        <td>
            {moment(stats.ctime).format('L LTS')}
        </td>
        <td>
            {stats.size}
        </td>
    </tr>;
}

export default FileRow