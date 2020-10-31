import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import Message from "../../../../common/ipc/message-creators";
import { ReadDirMessage } from "../../../../common/ipc/messages";
import { DirInfo } from "../../../../common/ipc/protocol";
import { Supplier } from "../../../../common/types";
import { ipcInvoke } from "../../../common/ipc";
import { patchTab } from "../action/action-creators";
import Selectors from "../data/selectors";
import { Side, State, TabState } from "../data/state";


type UpdateTabDirInfoArgs = {
    side: Side,
    tab: number
}

const updateTabDirInfo = ({
    side,
    tab
}: UpdateTabDirInfoArgs) => async (
    dispatch: ThunkDispatch<State, unknown, AnyAction>,
    getState: Supplier<State>) => {

        const state = getState()
        const tabState = Selectors.tabByIndex({
            index: tab,
            side
        })(state)

        const dirInfo = await ipcInvoke<DirInfo, ReadDirMessage>(Message.readDir(tabState.path))

        const patch: Partial<TabState> = {
            dirInfo: dirInfo,
            path: dirInfo.path,
            selectedRows: [],
            rowInFocus: 0
        }

        if (!tabState.named) {
            patch.name = dirInfo.name
        }

        dispatch(patchTab({
            side,
            index: tab,
            patch
        }))

    }

export default updateTabDirInfo