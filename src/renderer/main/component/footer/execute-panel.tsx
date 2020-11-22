import React, { useCallback, useContext } from "react"
import { useSelector } from "react-redux"
import Message from "../../../../common/ipc/message-creators"
import { ExecuteCommandMessage } from "../../../../common/ipc/messages"
import { ipcInvoke } from "../../../common/ipc"
import Selectors from "../../store/data/selectors"
import GlobalContext from "../context/global-context"
import useHotkeysToggle from "../hook/use-hotkeys-toggle"
import "./execute-panel.scss"

const ExecutePanel = () => {

    const { disableHotkeys, enableHotkeys } = useHotkeysToggle()

    const path = useSelector(Selectors.executePanelState)

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