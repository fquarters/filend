import { InitInfo } from "../../common/ipc/protocol"
import { app } from "electron"

const getInitInfo = (): Promise<InitInfo> => Promise.resolve({
    locale: app.getLocale()
})

export default getInitInfo