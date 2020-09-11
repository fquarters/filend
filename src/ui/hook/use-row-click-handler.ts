import { useContext, useCallback, SyntheticEvent } from "react"
import SideContext from "../component/context/side-context"
import { useDispatch } from "react-redux"
import focusRow from "../store/thunks/focus-row"
import toggleRowInFocusSelection from "../store/thunks/toggle-row-in-focus-selection"

const useRowClickHandler = (index: number) => {

    const {
        side
    } = useContext(SideContext)!

    const dispatch = useDispatch()

    return useCallback((e: React.PointerEvent) => {

        dispatch(focusRow({
            row: index,
            side
        }))

        if (e.button === 2 && index) {

            dispatch(toggleRowInFocusSelection())
        } 

    }, [index, side])
}

export default useRowClickHandler