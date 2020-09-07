import React, { useCallback } from "react"
import { useSelector } from "react-redux"
import usePathOpen from "../../hook/use-path-open"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"
import "./directory-view.css"
import FileRow from "./directory/file-row"
import TopRow from "./directory/top-row"

type DirectoryViewProps = {
    side: Side
}

const DirectoryView = ({
    side
}: DirectoryViewProps) => {

    const openPath = usePathOpen()

    const {
        dirInfo,
        rowInFocus
    } = useSelector(Selectors.activeTabOfSide(side))

    const openFile = useCallback((name: string) => openPath(`${dirInfo?.path}/${name}`), [
        dirInfo?.path,
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
            <TopRow inFocus={rowInFocus === 0}/>
            {
                dirInfo?.files.map((file, index) => <FileRow key={file.name}
                    openFile={openFile}
                    inFocus={rowInFocus - 1 === index}
                    {...file} />)
            }
        </tbody>
    </table>
}

export default DirectoryView