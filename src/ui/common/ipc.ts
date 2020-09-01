import { SomeRendererIpcMessage } from "../../common/ipc";
import { ipcRenderer } from "electron";

const ipcInvoke = <T>({
    data,
    type
}: SomeRendererIpcMessage) => ipcRenderer.invoke(type, data) as Promise<T>;

export {
    ipcInvoke
}