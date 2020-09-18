import { ipcMain } from "electron"
import { RendererIpcMessageType, SomeMainIpcMessage } from "../../common/ipc/messages"
import { MapFunction } from "../../common/types"
import holder from "./renderer-holder"

const ipcEmit = <M extends SomeMainIpcMessage>({
    data,
    type
}: M) => holder.value!.send(type, data)

const ipcEmitDynamic = <M extends SomeMainIpcMessage>(address: string,
    event: M) => holder.value!.send(address, event)

type IpcHandler = MapFunction<any, Promise<any>>

const handleInvoke = (type: RendererIpcMessageType, handler: IpcHandler) =>
    ipcMain.handle(type, async (_event, ...args) =>
        await handler(args[0]))

const expectReply = <R>(event: string, timeout = 60 * 60 * 1000): Promise<R> => new Promise((resolve, reject) => {

    const handler = (_: unknown, ...args: any[]) => {

        resolve(args[0] as R)
    }
    
    ipcMain.once(event, handler)

    setTimeout(() => {

        ipcMain.off(event, handler)
        reject()

    }, timeout)
})

export {
    ipcEmit,
    ipcEmitDynamic,
    handleInvoke,
    expectReply
}
