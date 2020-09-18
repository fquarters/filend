import { useCallback, useEffect, useContext, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import changeRowInFocus from "../store/thunks/change-row-in-focus"
import switchActiveSide from "../store/thunks/switch-active-side"
import openFileInFocus from "../store/thunks/open-file-in-focus"
import openParentDirInCurrentTab from "../store/thunks/open-parent-dir-in-current-tab"
import toggleRowInFocusSelection from "../store/thunks/toggle-row-in-focus-selection"
import Selectors from "../store/data/selectors"
import GlobalContext from "../component/context/global-context"
import addTabOnActiveSide from "../store/thunks/add-tab-on-active-side"
import copySelectedFiles from "../store/thunks/copy-selected-files"
import deleteSelectedFiles from "../store/thunks/delete-selected-files"

const useGlobalHotkeysBind = () => {

    const dispatch = useDispatch()
    const hotkeysDisabled = useSelector(Selectors.hotkeysDisabled)
    const executeInputRef = useContext(GlobalContext)!.executeInputRef
    const metaKeyPressed = useRef<boolean>(false)

    const onKeyDown = useCallback((e: KeyboardEvent) => {

        if (hotkeysDisabled) {
            return
        }

        if (e.key === "Meta") {

            metaKeyPressed.current = true

        } else if (e.key === "Tab") {

            dispatch(switchActiveSide({}))
            e.preventDefault()

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

        } else if (e.key === "t" && (e.ctrlKey || metaKeyPressed.current)) {

            dispatch(addTabOnActiveSide())

        } else if (e.key === "F5") {

            dispatch(copySelectedFiles())

        } else if (e.key === "F8") {

            dispatch(deleteSelectedFiles())
        }

    }, [dispatch, hotkeysDisabled, executeInputRef])

    const onKeyUp = useCallback((e: KeyboardEvent) => {

        if (e.key === "Meta") {

            metaKeyPressed.current = false
        }

    }, [])

    useEffect(() => {

        document.addEventListener('keydown', onKeyDown)

        return () => document.removeEventListener('keydown', onKeyDown)

    }, [onKeyDown])

    useEffect(() => {

        document.addEventListener('keyup', onKeyUp)

        return () => document.removeEventListener('keydown', onKeyUp)

    }, [onKeyUp])
}

export default useGlobalHotkeysBind