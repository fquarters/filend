import { ipcInvoke } from "../../common/ipc"
import { InitInfo } from "../../../common/ipc/protocol"
import { InitInfoMessage } from "../../../common/ipc/messages"
import moment from "moment"
import { getInitInfo } from "../../../common/ipc/message-creators"

const getInitInfoThunk = () => async () => {

    const info = await ipcInvoke<InitInfo, InitInfoMessage>(getInitInfo())

    moment.locale(info.locale)

}

export default getInitInfoThunk