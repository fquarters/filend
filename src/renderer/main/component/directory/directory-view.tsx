import React, { useMemo, useRef } from "react"
import { shallowEqual, useSelector } from "react-redux"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"
import DirectoryContext, { DirectoryContextType } from "../context/directory-context"
import "./directory-view.scss"
import DriveSelect from "./drive-select"
import FileTable from "./file-table"
import PathInput from "./path-input"
import StatsRow from "./stats-row"
import useDirInfoUpdate from "./use-dir-info-update"

type DirectoryViewProps = {
    side: Side
}

const DirectoryView = ({
    side
}: DirectoryViewProps) => {

    const activeTab = useSelector(Selectors.activeTabIndexOfSide(side))

    const {
        rowInFocus,
        selectedRows,
        dirInfo,
        path,
        creatingNewDir
    } = useSelector(Selectors.tabByIndex({
        index: activeTab,
        side
    }), shallowEqual)

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
            <DriveSelect side={side} />
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
            <StatsRow side={side} tab={activeTab} />
        </div>
    </div>
}

export default DirectoryView