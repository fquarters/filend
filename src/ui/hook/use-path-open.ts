import { useContext, useCallback } from "react"
import SideContext from "../component/context/side-context"
import { useSelector, useDispatch } from "react-redux"
import Selectors from "../store/data/selectors"
import { patchTab } from "../store/action/action-creators"

const usePathOpen = () => {

    const {
        side,
        activeTab: index
    } = useContext(SideContext)!

    const {
        name
    } = useSelector(Selectors.activeTab(side))

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