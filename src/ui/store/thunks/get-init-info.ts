import { ipcInvoke } from "../../common/ipc"
import { InitInfo } from "../../../common/ipc/protocol"
import { InitInfoMessage } from "../../../common/ipc/messages"
import moment from "moment"
import Message from "../../../common/ipc/message-creators"

const getInitInfoThunk = () => async () => {

    const info = await ipcInvoke<InitInfo, InitInfoMessage>(Message.getInitInfo())

    moment.locale(info.locale)

}

export default getInitInfoThunk