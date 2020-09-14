import { SomeMainIpcMessage } from "../../common/ipc/messages"
import holder from "./renderer-holder"

const ipcEmit = <M extends SomeMainIpcMessage>({
    data,
    type
}: M) => holder.value!.send(type, data)

const ipcEmitDynamic = <M extends SomeMainIpcMessage>(address: string,
    event: M) => holder.value!.send(address, event)

export {
    ipcEmit,
    ipcEmitDynamic
}
