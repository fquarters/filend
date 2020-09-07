import { useContext, useCallback } from "react"
import SideContext from "../component/context/side-context"
import { useSelector, useDispatch } from "react-redux"
import Selectors from "../store/data/selectors"
import { patchTab } from "../store/action/action-creators"

const usePathOpen = () => {

    const {
        activeTab: index
    } = useContext(SideContext)!

    const side = useSelector(Selectors.activeSideName)

    const {
        name
    } = useSelector(Selectors.currentActiveTabState)

    const dispatch = useDispatch()

    return useCallback((path: string) => { 

        dispatch(patchTab({
            index,
            patch: {
                path
            },
            side
        }))

    }, [
        index,
        side,
        name,
        dispatch
    ])
}

export default usePathOpen