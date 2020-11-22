import { useCallback, useContext, useEffect, useRef } from "react"
import { batch, useDispatch, useSelector } from "react-redux"
import { patchDriveSelect, patchSide } from "../../store/action/action-creators"
import Selectors from "../../store/data/selectors"
import addTabOnActiveSide from "../../store/thunks/add-tab-on-active-side"
import copySelectedFiles from "../../store/thunks/copy-selected-files"
import createMoveRequest from "../../store/thunks/create-move-request"
import deleteSelectedFiles from "../../store/thunks/delete-selected-files"
import editFileInFocus from "../../store/thunks/edit-file-in-focus"
import initNewDirCreation from "../../store/thunks/init-new-dir-creation"
import moveRowFocus from "../../store/thunks/move-row-focus"
import openFileInFocus from "../../store/thunks/open-file-in-focus"
import openParentDirInCurrentTab from "../../store/thunks/open-parent-dir-in-current-tab"
import switchActiveSide from "../../store/thunks/switch-active-side"
import toggleRowInFocusSelection from "../../store/thunks/toggle-row-in-focus-selection"
import viewFileInFocus from "../../store/thunks/view-file-in-focus"
import GlobalContext from "../context/global-context"

const useGlobalHotkeysBind = () => {

    const dispatch = useDispatch()
    const hotkeysDisabled = useSelector(Selectors.hotkeysDisabled)
    const selectingDrive = useSelector(Selectors.selectingDrive)
    const executeInputRef = useContext(GlobalContext)!.executeInputRef
    const metaKeyPressed = useRef<boolean>(false)
    const disableNavigation = useRef(false)

    const handleNavigationKeys = useCallback((e: KeyboardEvent): boolean => {

        if (e.key === "ArrowLeft") {

            dispatch(switchActiveSide({
                to: 'left'
            }))
            return true

        } else if (e.key === "ArrowRight") {

            dispatch(switchActiveSide({
                to: 'right'
            }))
            return true

        } else if (e.key === "ArrowUp") {

            dispatch(moveRowFocus('up'))
            e.preventDefault()

            return true

        } else if (e.key === "ArrowDown") {

            dispatch(moveRowFocus('down'))
            e.preventDefault()

            return true

        } else if (e.key === "Enter") {

            dispatch(openFileInFocus())
            return true

        } else {

            return false
        }

    }, [dispatch])

    const onKeyDown = useCallback((e: KeyboardEvent) => {

        if (e.key === "Meta") {

            metaKeyPressed.current = true

        } else if (e.key === "Tab") {

            dispatch(switchActiveSide({}))
            e.preventDefault()

        } else if (e.key === "Backspace") {

            dispatch(openParentDirInCurrentTab())

        } else if (e.key === " ") {

            dispatch(toggleRowInFocusSelection())
            e.preventDefault()

        } else if (e.key === "/") {

            executeInputRef.current?.focus()

        } else if (e.key === "t" && (e.ctrlKey || metaKeyPressed.current)) {

            dispatch(addTabOnActiveSide())

        } else if (e.key === "F3") {

            dispatch(viewFileInFocus())

        } else if (e.key === "F4") {

            dispatch(editFileInFocus())

        } else if (e.key === "F5") {

            dispatch(copySelectedFiles())

        } else if (e.key === "F6") {

            dispatch(createMoveRequest())

        } else if (e.key === "F7") {

            dispatch(initNewDirCreation())

        } else if (e.key === "F8") {

            dispatch(deleteSelectedFiles())

        } else if (!disableNavigation.current && handleNavigationKeys(e)) {
        } else if (e.altKey) {

            if (e.key == "F1") {

                batch(() => {
                    dispatch(patchDriveSelect({
                        side: 'left',
                        patch: {
                            selecting: true
                        }
                    }))
                    dispatch(switchActiveSide({
                        to: 'left'
                    }))
                })

            } else if (e.key == "F2") {

                batch(() => {
                    dispatch(patchDriveSelect({
                        side: 'right',
                        patch: {
                            selecting: true
                        }
                    }))
                    dispatch(switchActiveSide({
                        to: 'right'
                    }))
                })
            }
        }

    }, [dispatch, executeInputRef, handleNavigationKeys])

    const onKeyUp = useCallback((e: KeyboardEvent) => {

        if (e.key === "Meta") {

            metaKeyPressed.current = false
        }

    }, [])

    useEffect(() => {

        if (!hotkeysDisabled) {

            document.addEventListener('keydown', onKeyDown)

            return () => {
                document.removeEventListener('keydown', onKeyDown)
            }
        }

    }, [onKeyDown, hotkeysDisabled, selectingDrive])

    useEffect(() => {

        disableNavigation.current = selectingDrive

    }, [selectingDrive])

    useEffect(() => {

        if (!hotkeysDisabled) {

            document.addEventListener('keyup', onKeyUp)

            return () => document.removeEventListener('keyup', onKeyUp)
        }

    }, [onKeyUp, hotkeysDisabled])
}

export default useGlobalHotkeysBind