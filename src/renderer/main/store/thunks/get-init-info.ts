import moment from "moment"
import Message from "../../../../common/ipc/message-creators"
import { InitInfoMessage } from "../../../../common/ipc/messages"
import { InitInfo } from "../../../../common/ipc/protocol"
import { ipcInvoke } from "../../../common/ipc"

const getInitInfoThunk = () => async () => {

    const info = await ipcInvoke<InitInfo, InitInfoMessage>(Message.getInitInfo())

    moment.locale(info.locale)

}

export default getInitInfoThunk