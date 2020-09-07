import { useSelector, useDispatch, shallowEqual } from "react-redux"
import Selectors from "../store/data/selectors"
import { useCallback } from "react"
import { patchTab } from "../store/action/action-creators"

type RowChange = 'up' | 'down' | number

const useRowFocusChange = () => {

    const {
        row,
        side,
        tab
    } = useSelector(Selectors.currentActiveState, shallowEqual)

    const {
        dirInfo
    } = useSelector(Selectors.tabByIndex({
        index: tab,
        side
    }))

    const fileCount = dirInfo?.files.length

    const dispatch = useDispatch()

    return useCallback((change: RowChange) => {

        let newRow = row
        
        if (change === 'up') {

            newRow = Math.max(0, newRow - 1)

        } else if (change === 'down') {

            newRow = fileCount? Math.min(fileCount, newRow + 1) : 0

        } else {

            newRow = change
        }

        dispatch(patchTab({
            index: tab,
            patch: {
                rowInFocus: newRow
            },
            side
        }))


    }, [row, side, tab, dispatch, fileCount])
}

export default useRowFocusChange