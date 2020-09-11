import { useContext, useCallback } from "react"
import SideContext from "../component/context/side-context"
import { useDispatch } from "react-redux"
import focusRow from "../store/thunks/focus-row"

const useRowFocusSet = (index: number) => {

    const {
        side
    } = useContext(SideContext)!

    const dispatch = useDispatch()

    return useCallback(() => {

        dispatch(focusRow({
            row: index,
            side
        }))

    }, [index, side])
}

export default useRowFocusSet