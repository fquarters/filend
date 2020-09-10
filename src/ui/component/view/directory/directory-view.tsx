import React, { useMemo, useRef, useCallback } from "react"
import { useSelector, useDispatch, batch } from "react-redux"
import { Side } from "../../../store/data/state"
import Selectors from "../../../store/data/selectors"
import DirectoryContext, { DirectoryContextType } from "../../context/directory-context"
import switchActiveSide from "../../../store/thunks/switch-active-side"
import { patchTab } from "../../../store/action/action-creators"
import TopRow from "./top-row"
import FileRow from "./file-row"
import "./directory-view.css"

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
        containerRef: rowContainer
    }), [])

    const dispatch = useDispatch()

    const focusRow = useCallback((index: number) => {

        batch(() => {
            dispatch(switchActiveSide({
                to: side
            }))
            dispatch(patchTab({
                side,
                index: activeTab,
                patch: {
                    rowInFocus: index
                }
            }))
        })

    }, [
        dispatch,
        side,
        activeTab
    ])

    const focusTopRow = useCallback(() => focusRow(0), [focusRow])

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
                    <TopRow inFocus={rowInFocus === 0}
                        setFocus={focusTopRow} />
                    {
                        dirInfo?.files.map((file, index) => <FileRow key={file.name}
                            inFocus={rowInFocus - 1 === index}
                            selected={selectedRows.indexOf(index + 1) > -1}
                            setFocus={() => focusRow(index + 1)}
                            {...file} />)
                    }
                </tbody>
            </table>
        </DirectoryContext.Provider>
    </div>
}

export default DirectoryView