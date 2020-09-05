import { useEffect } from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { patchTab } from "../store/action/action-creators"
import { Side, TabState } from "../store/data/state"
import { DirInfo } from "../../common/protocol"
import Selectors from "../store/data/selectors"

type ActiveTabUpdateArgs = {
    index: number,
    dirInfo: DirInfo | null,
    side: Side
}

const useActiveTabUpdate = ({
    index,
    dirInfo,
    side
}: ActiveTabUpdateArgs) => {

    const dispatch = useDispatch()

    const tabState = useSelector(Selectors.activeTab(side), shallowEqual)

    useEffect(() => {

        if (dirInfo) {

            const nameChanged = dirInfo.name !== tabState.name

            if (dirInfo.name && nameChanged) {

                const patch: Partial<TabState> = {
                    path: dirInfo.path
                }

                if (!tabState.named) {
                    patch.name = dirInfo.name
                }
    
                dispatch(patchTab({
                    index,
                    patch,
                    side
                }))
            }
        }

    }, [
        dirInfo,
        dispatch,
        index,
        side,
        tabState
    ])
}

export default useActiveTabUpdate