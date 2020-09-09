import React, { useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"
import DirectoryContext, { DirectoryContextType } from "../context/directory-context"
import "./directory-view.css"
import FileRow from "./directory/file-row"
import TopRow from "./directory/top-row"

type DirectoryViewProps = {
    side: Side
}

const DirectoryView = ({
    side
}: DirectoryViewProps) => {

    const {
        dirInfo,
        rowInFocus,
        selectedRows
    } = useSelector(Selectors.activeTabOfSide(side))

    const rowContainer = useRef<HTMLDivElement | null>(null)

    const context = useMemo<DirectoryContextType>(() => ({
        containerRef: rowContainer
    }), [])

    return <div className="directory-view" ref={rowContainer} >
        <DirectoryContext.Provider value={context}>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Extension</th>
                        <th>Date</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    <TopRow inFocus={rowInFocus === 0} />
                    {
                        dirInfo?.files.map((file, index) => <FileRow key={file.name}
                            inFocus={rowInFocus - 1 === index}
                            selected={selectedRows.indexOf(index + 1) > -1}
                            {...file} />)
                    }
                </tbody>
            </table>
        </DirectoryContext.Provider>
    </div>
}

export default DirectoryView