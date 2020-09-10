import { InitInfo } from "../../common/protocol"
import { app } from "electron"

const getInitInfo = (): Promise<InitInfo> => new Promise((resolve, reject) => {

    resolve({
        locale: app.getLocale()
    })
})

export default getInitInfo