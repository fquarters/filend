import React, { useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import Selectors from "../../../store/data/selectors"
import { Side } from "../../../store/data/state"
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
        dirInfo,
        rowInFocus,
        selectedRows
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