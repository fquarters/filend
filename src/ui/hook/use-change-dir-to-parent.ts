import { useCallback, useContext } from "react"
import { useSelector } from "react-redux"
import SideContext from "../component/context/side-context"
import Selectors from "../store/data/selectors"
import usePathOpen from "./use-path-open"

const useChangeDirToParent = () => {

    const {
        side
    } = useContext(SideContext)!

    const {
        path
    } = useSelector(Selectors.activeTabOfSide(side))

    const openPath = usePathOpen()

    return useCallback(() => openPath(`${path}/..`), [openPath, path])
}

export default useChangeDirToParent