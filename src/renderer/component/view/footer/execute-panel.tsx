import React, { useCallback, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { patchRoot } from "../../../store/action/action-creators"
import "./execute-panel.scss"
import GlobalContext from "../../context/global-context"
import { ipcInvoke } from "../../../common/ipc"
import { ExecuteCommandMessage } from "../../../../common/ipc/messages"
import Selectors from "../../../store/data/selectors"
import Message from "../../../../common/ipc/message-creators"

const ExecutePanel = () => {

    const dispatch = useDispatch()

    const disableHotkeys = useCallback(() => dispatch(patchRoot({
        hotkeysDisabled: true
    })), [dispatch])

    const enableHotkeys = useCallback(() => dispatch(patchRoot({
        hotkeysDisabled: false
    })), [dispatch])

    const {
        path
    } = useSelector(Selectors.currentActiveTabState)

    const onKeyUp = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Escape") {

            e.currentTarget.blur()

        } else if (e.key === "Enter") {

            ipcInvoke<void, ExecuteCommandMessage>(Message.executeCommand({
                command: e.currentTarget.value,
                path
            }))
        }

    }, [path])

    const globalContext = useContext(GlobalContext)!

    return <div className="execute-panel">
        <label>
            {path}/&gt;
        </label>
        <input ref={globalContext.executeInputRef}
            onFocus={disableHotkeys}
            onBlur={enableHotkeys}
            onKeyUp={onKeyUp} />
    </div>
}

export default ExecutePanel