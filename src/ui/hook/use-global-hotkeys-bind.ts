import { useCallback, useEffect } from "react"
import { useDispatch } from "react-redux"
import changeRowInFocus from "../store/thunks/change-row-in-focus"
import switchActiveSide from "../store/thunks/switch-active-side"
import openFileInFocus from "../store/thunks/open-file-in-focus"

const useGlobalHotkeysBind = () => {

    const dispatch = useDispatch()

    const onKeyDown = useCallback((e: KeyboardEvent) => {

        if (e.key === "Tab") {

            dispatch(switchActiveSide())

        } else if (e.key === "ArrowUp") {

            dispatch(changeRowInFocus('up'))

        } else if (e.key === "ArrowDown") {

            dispatch(changeRowInFocus('down'))

        } else if (e.key === "Enter") {

            dispatch(openFileInFocus())
        }

    }, [dispatch])

    useEffect(() => {

        document.addEventListener('keydown', onKeyDown)

        return () => document.removeEventListener('keydown', onKeyDown)

    }, [onKeyDown])
}

export default useGlobalHotkeysBind