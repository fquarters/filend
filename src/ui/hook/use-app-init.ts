import useGlobalHotkeysBind from "./use-global-hotkeys-bind"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import getInitInfoThunk from "../store/thunks/get-init-info"

const useAppInit = () => {

    useGlobalHotkeysBind()

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(getInitInfoThunk())

    }, [dispatch])
}

export default useAppInit