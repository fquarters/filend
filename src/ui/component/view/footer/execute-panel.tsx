import React, { useCallback, useContext } from "react"
import { useDispatch } from "react-redux"
import { patchRoot } from "../../../store/action/action-creators"
import "./execute-panel.css"
import GlobalContext from "../../context/global-context"

const ExecutePanel = () => {

    const dispatch = useDispatch()

    const disableHotkeys = useCallback(() => dispatch(patchRoot({
        hotkeysDisabled: true
    })), [dispatch])

    const enableHotkeys = useCallback(() => dispatch(patchRoot({
        hotkeysDisabled: false
    })), [dispatch])

    const blurOnEscape = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Escape") {

            e.currentTarget.blur()

        } else if (e.key === "Enter") {

            // execute
        }

    }, [])

    const globalContext = useContext(GlobalContext)!

    return <div className="execute-panel">
        <label>
            Execute:
        </label>
        <input ref={globalContext.executeInputRef}
            onFocus={disableHotkeys}
            onBlur={enableHotkeys}
            onKeyUp={blurOnEscape} />
    </div>
}

export default ExecutePanel