import React, { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Selectors from "../../../store/data/selectors"
import { Side } from "../../../store/data/state"
import updateTabDirInfo from "../../../store/thunks/update-tab-dir-info"
import DirectoryContext, { DirectoryContextType } from "../../context/directory-context"
import "./directory-view.css"
import FileRow from "./file-row"
import TopRow from "./top-row"

type DirectoryViewProps = {
    side: Side
}

const DirectoryView = ({
    side
}: DirectoryViewProps) => {

    const {
        activeTab
    } = useSelector(Selectors.sideByName(side))

    const {
        rowInFocus,
        selectedRows,
        dirInfo
    } = useSelector(Selectors.tabByIndex({
        index: activeTab,
        side
    }))

    const rowContainer = useRef<HTMLDivElement | null>(null)

    const context = useMemo<DirectoryContextType>(() => ({
        containerRef: rowContainer,
        rowInFocus,
        selectedRows
    }), [
        rowInFocus,
        selectedRows
    ])

    const dispatch = useDispatch()

    const dirInfoMissing = !dirInfo

    useEffect(() => {

        if (dirInfoMissing) {

            console.log('ddd')

            dispatch(updateTabDirInfo({
                side,
                tab: activeTab
            }))
        }

    }, [dirInfoMissing, dispatch, side, activeTab])

    const fileTable = useMemo(() => <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Extension</th>
                <th>Date</th>
                <th>Size</th>
            </tr>
        </thead>
        <tbody>
            <TopRow index={0} />
            {
                dirInfo?.files.map((file, index) => <FileRow key={file.name}
                    index={index + 1}
                    {...file} />)
            }
        </tbody>
    </table>, [
        dirInfo?.files
    ])

    return <div className="directory-view" ref={rowContainer} >
        <DirectoryContext.Provider value={context}>
            {fileTable}
        </DirectoryContext.Provider>
    </div>
}

export default DirectoryView