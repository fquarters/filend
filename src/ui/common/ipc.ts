import { SomeRendererIpcMessage } from "../../common/ipc";
import { ipcRenderer } from "electron";

const ipcInvoke = <T, M extends SomeRendererIpcMessage>({
    data,
    type
}: M) => ipcRenderer.invoke(type, data) as Promise<T>;

export {
    ipcInvoke
}