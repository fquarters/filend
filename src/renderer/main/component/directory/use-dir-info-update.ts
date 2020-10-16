import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Selectors from "../../store/data/selectors"
import { Side } from "../../store/data/state"
import updateTabDirInfo from "../../store/thunks/update-tab-dir-info"

type DirInfoUpdateArgs = {
    side: Side,
    updateRequired: boolean
}

const useDirInfoUpdate = ({
    side,
    updateRequired
}: DirInfoUpdateArgs) => {

    const activeTab = useSelector(Selectors.activeTabIndexOfSide(side))

    const dispatch = useDispatch()

    useEffect(() => {

        if (updateRequired) {

            dispatch(updateTabDirInfo({
                side,
                tab: activeTab
            }))
        }

    }, [updateRequired, dispatch, side, activeTab])
}

export default useDirInfoUpdate