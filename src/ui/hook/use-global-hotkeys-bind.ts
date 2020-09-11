import { useCallback, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import changeRowInFocus from "../store/thunks/change-row-in-focus"
import switchActiveSide from "../store/thunks/switch-active-side"
import openFileInFocus from "../store/thunks/open-file-in-focus"
import openParentDirInCurrentTab from "../store/thunks/open-parent-dir-in-current-tab"
import toggleRowInFocusSelection from "../store/thunks/toggle-row-in-focus-selection"
import Selectors from "../store/data/selectors"
import GlobalContext from "../component/context/global-context"

const useGlobalHotkeysBind = () => {

    const dispatch = useDispatch()

    const hotkeysDisabled = useSelector(Selectors.hotkeysDisabled)

    const executeInputRef = useContext(GlobalContext)!.executeInputRef

    const onKeyDown = useCallback((e: KeyboardEvent) => {

        if (hotkeysDisabled) {
            return
        }

        if (e.key === "Tab") {

            dispatch(switchActiveSide({}))

        } else if (e.key === "ArrowLeft") {

            dispatch(switchActiveSide({
                to: 'left'
            }))

        } else if (e.key === "ArrowRight") {

            dispatch(switchActiveSide({
                to: 'right'
            }))

        } else if (e.key === "ArrowUp") {

            dispatch(changeRowInFocus('up'))

        } else if (e.key === "ArrowDown") {

            dispatch(changeRowInFocus('down'))

        } else if (e.key === "Enter") {

            dispatch(openFileInFocus())

        } else if (e.key === "Backspace") {

            dispatch(openParentDirInCurrentTab())

        } else if (e.key === " ") {

            dispatch(toggleRowInFocusSelection())
            e.preventDefault()

        } else if (e.key === "/") {

            executeInputRef.current?.focus()
        }

    }, [dispatch, hotkeysDisabled, executeInputRef])

    useEffect(() => {

        document.addEventListener('keydown', onKeyDown)

        return () => document.removeEventListener('keydown', onKeyDown)

    }, [onKeyDown])
}

export default useGlobalHotkeysBind