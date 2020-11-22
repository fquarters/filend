import moment from "moment"
import { Dispatch } from "redux"
import Message from "../../../../common/ipc/message-creators"
import { InitInfoMessage } from "../../../../common/ipc/messages"
import { InitInfo } from "../../../../common/ipc/protocol"
import { Supplier } from "../../../../common/types"
import { ipcInvoke } from "../../../common/ipc"
import { Locales } from "../../../common/locales"
import { patchRoot } from "../action/action-creators"
import { State } from "../data/state"

const getInitInfoThunk = () => async (dispatch: Dispatch, getState: Supplier<State>) => {

    const info = await ipcInvoke<InitInfo, InitInfoMessage>(Message.getInitInfo())

    moment.locale(info.locale)

    dispatch(patchRoot({
        mountpoints: info.mountpoints,
        locale: info.locale.split('-')[0] as Locales
    }))

    // Strings.setLocale('ru')
}

export default getInitInfoThunk