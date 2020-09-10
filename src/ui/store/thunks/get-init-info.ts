import { ipcInvoke } from "../../common/ipc"
import { InitInfo } from "../../../common/protocol"
import { InitInfoMessage } from "../../../common/ipc"
import moment from "moment"

const getInitInfo = () => async () => {

    const info = await ipcInvoke<InitInfo, InitInfoMessage>({
        type: 'GET_INIT_INFO',
        data: null
    })

    moment.locale(info.locale)

}

export default getInitInfo