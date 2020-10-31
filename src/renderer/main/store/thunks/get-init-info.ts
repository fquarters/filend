import moment from "moment"
import Message from "../../../../common/ipc/message-creators"
import { InitInfoMessage } from "../../../../common/ipc/messages"
import { InitInfo } from "../../../../common/ipc/protocol"
import { ipcInvoke } from "../../../common/ipc"
import { Locales } from "../../../common/locales"
import Strings from "../../../common/strings"

const getInitInfoThunk = () => async () => {

    const info = await ipcInvoke<InitInfo, InitInfoMessage>(Message.getInitInfo())

    moment.locale(info.locale)

    //Strings.setLocale(info.locale.split('-')[0] as Locales)
    Strings.setLocale('ru')
}

export default getInitInfoThunk