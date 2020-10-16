import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Message from "../../../../common/ipc/message-creators";
import { EditFileMessage, NextIdMessage, ResolvePathMessage, ViewFileMessage } from "../../../../common/ipc/messages";
import { Supplier } from "../../../../common/types";
import { ipcInvoke } from "../../../common/ipc";
import Selectors from "../data/selectors";
import { State } from "../data/state";

const editFileInFocus = () => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>
) => {

    const state = getState()

    const {
        row,
        side,
        tab
    } = Selectors.currentActiveState(state)

    const tabState = state[side].tabs[tab]
    const currentDirPath = tabState.path

    if (row !== 0) {

        const file = tabState.dirInfo?.files[row - 1]

        if (!file || file.stats.isDirectory) {
            return
        }

        const fileName = file.name

        const resolvedPath = await ipcInvoke<string | null, ResolvePathMessage>(
            Message.resolvePath(currentDirPath, fileName)
        )

        const operationId = await ipcInvoke<string, NextIdMessage>(Message.nextId())

        if (resolvedPath) {

            ipcInvoke<void, EditFileMessage>(Message.editFile({
                id: operationId,
                path: resolvedPath
            }))
        }

    }
}

export default editFileInFocus