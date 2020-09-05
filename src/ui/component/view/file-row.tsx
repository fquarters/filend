import { FileInfo } from "../../../common/protocol";
import React from "react";
import moment from "moment";

const FileRow = ({
    name,
    stats
}: FileInfo) => <tr key={name}>
        <td>
            {name}
        </td>
        <td>
            {stats.isFile && !stats.isFile() ? 'DIR' : name.split('.').pop()}
        </td>
        <td>
            {moment(stats.ctime).format()}
        </td>
        <td>
            {stats.size}
        </td>
    </tr>

export default FileRow