import { AnyAction, Dispatch } from "redux";
import { Supplier } from "../../../common/types";
import { State } from "../data/state";
import Selectors from "../data/selectors";
import { ipcInvoke } from "../../common/ipc";
import { executeFile } from "../../../common/ipc-creators";
import { patchTab } from "../action/action-creators";

const openFileInFocus = () => (
    dispatch: Dispatch<AnyAction>,
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

        dispatch(patchTab({
            index: tab,
            patch: {
                path: `${currentDirPath}/..`
            },
            side
        }))
    }

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
                path: `${currentDirPath}/${fileName}`
            },
            side
        }))
    }
}

export default openFileInFocus