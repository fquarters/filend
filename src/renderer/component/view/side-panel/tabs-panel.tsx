import React, { useCallback, useContext, useMemo, useRef } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import Selectors from "../../../store/data/selectors"
import { TabState } from "../../../store/data/state"
import addTabThunk from "../../../store/thunks/add-tab"
import switchActiveSide from "../../../store/thunks/switch-active-side"
import SideContext from "../../context/side-context"
import Tab from "./tab"

const TabsPanel = () => {

    const side = useContext(SideContext)!.side

    const {
        tabs
    } = useSelector(Selectors.sideByName(side))

    const dispatch = useDispatch()

    const panelRef = useRef<HTMLDivElement | null>(null)

    const addTab = useCallback((e: React.MouseEvent<HTMLDivElement>) => {

        if (e.target !== panelRef.current) {
            return
        }

        batch(() => {
            dispatch(switchActiveSide({
                to: side
            }))
            dispatch(addTabThunk({
                onSide: side
            }))
        })

    }, [dispatch, side])

    return useMemo(() => <div className={"side-view__tabs"}
        onDoubleClick={addTab}
        ref={panelRef}>
        {tabs.map(({ name }: TabState, index: number) => <Tab
            name={name}
            index={index}
            key={index} />)}
    </div>, [tabs])
}

export default TabsPanel