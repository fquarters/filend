import { useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"
import { patchRoot } from "../../store/action/action-creators"

const useHotkeysToggle = () => {

    const dispatch = useDispatch()

    const disableHotkeys = useCallback(() => dispatch(patchRoot({
        hotkeysDisabled: true
    })), [dispatch])

    const enableHotkeys = useCallback(() => dispatch(patchRoot({
        hotkeysDisabled: false
    })), [dispatch])

    return useMemo(() => ({ disableHotkeys, enableHotkeys }),
        [disableHotkeys, enableHotkeys])
}

export default useHotkeysToggle