import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { executeFile } from "../../../common/ipc-creators";
import { Supplier } from "../../../common/types";
import { ipcInvoke } from "../../common/ipc";
import { patchTab } from "../action/action-creators";
import Selectors from "../data/selectors";
import { State } from "../data/state";
import openParentDirInCurrentTab from "./open-parent-dir-in-current-tab";

const openFileInFocus = () => (
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

        if (file.stats.isFile) {

            ipcInvoke(executeFile([currentDirPath, fileName]))

        } else {

            dispatch(patchTab({
                index: tab,
                patch: {
                    path: `${currentDirPath}/${fileName}`,
                    rowInFocus: 0,
                    selectedRows: []
                },
                side
            }))
        }
    }
}

export default openFileInFocus