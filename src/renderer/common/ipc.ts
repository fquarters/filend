import { ipcRenderer } from "electron";
import { SomeRendererIpcMessage } from "../../common/ipc/messages";

type HasAddress = {
    address: string
}

const ipcInvoke = <T, M extends SomeRendererIpcMessage>({
    data,
    type
}: M) => ipcRenderer.invoke(type, data) as Promise<T>

const ipcInvokeDynamic = <T, M extends SomeRendererIpcMessage>({
    address,
    data
}: M & HasAddress) => ipcRenderer.invoke(address, data) as Promise<T>

export {
    ipcInvoke,
    ipcInvokeDynamic
};
