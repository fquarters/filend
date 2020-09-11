import { ipcMain } from "electron";
import { RendererIpcMessageType } from "../common/ipc/messages";
import { MapFunction } from "../common/types";

type IpcHandler = MapFunction<any, Promise<any>>

const handleInvoke = (type: RendererIpcMessageType, handler: IpcHandler) =>
    ipcMain.handle(type, async (_event, ...args) =>
        await handler(args[0]))

export {
    handleInvoke
}