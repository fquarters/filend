import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { executeFile, resolvePath } from "../../../common/ipc/message-creators";
import { Supplier } from "../../../common/types";
import { ipcInvoke } from "../../common/ipc";
import { patchTab } from "../action/action-creators";
import Selectors from "../data/selectors";
import { State } from "../data/state";
import openParentDirInCurrentTab from "./open-parent-dir-in-current-tab";
import { ResolvePathMessage } from "../../../common/ipc/messages";
import { batch } from "react-redux";
import updateTabDirInfo from "./update-tab-dir-info";

const openFileInFocus = () => async (
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

    if (row === 0) {

        dispatch(openParentDirInCurrentTab())

    } else {

        const file = tabState.dirInfo?.files[row - 1]

        if (!file) {
            return
        }

        const fileName = file.name

        const resolvedPath = await ipcInvoke<string, ResolvePathMessage>(
            resolvePath([currentDirPath, fileName])
        )

        if (resolvedPath) {

            if (file.stats.isFile) {

                ipcInvoke(executeFile(resolvedPath))

            } else {

                batch(() => {

                    dispatch(patchTab({
                        index: tab,
                        patch: {
                            path: resolvedPath,
                            rowInFocus: 0,
                            selectedRows: []
                        },
                        side
                    }))
                    dispatch(updateTabDirInfo({
                        side,
                        tab
                    }))
                })

            }
        }

    }
}

export default openFileInFocus