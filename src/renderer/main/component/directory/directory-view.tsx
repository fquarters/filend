import React, { useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import useDirInfoUpdate from "./use-dir-info-update"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"
import DirectoryContext, { DirectoryContextType } from "../context/directory-context"
import "./directory-view.scss"
import FileTable from "./file-table"
import PathInput from "./path-input"

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
        dirInfo,
        path,
        creatingNewDir
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

    useDirInfoUpdate({
        side,
        updateRequired: !dirInfo
    })

    const fileTable = useMemo(() => dirInfo && <FileTable dirInfo={dirInfo}
        creatingNewDir={creatingNewDir} />, [
        dirInfo?.files,
        creatingNewDir
    ])

    return <div className="directory-view">
        <div className="directory-view__path">
            <PathInput value={path}
                side={side} />
        </div>
        <div className="directory-view__table-container"
            ref={rowContainer} >
            <DirectoryContext.Provider value={context}>
                {fileTable}
            </DirectoryContext.Provider>
        </div>
        <div className="directory-view__stats">
            stats
        </div>
    </div>
}

export default DirectoryView