import { CommandData as CommandData } from "./protocol"

type RendererIpcMessageType = 'READ_DIR'
    | 'IS_DIR'
    | 'EXECUTE_FILE'
    | 'GET_INIT_INFO'
    | 'EXECUTE_COMMAND'
    | 'RESOLVE_PATH'

type MainIpcMessageType = ''

type MessageData<T> = {
    data: T
}

type EmptyMessage = MessageData<null>

type RendererIpcMessage<T extends RendererIpcMessageType> = {
    type: T
}

type MainIpcMessage<T extends MainIpcMessageType> = {
    type: T
}

type ResolvePathMessage = RendererIpcMessage<'RESOLVE_PATH'> & MessageData<string[]>
type ReadDirMessage = RendererIpcMessage<'READ_DIR'> & MessageData<string>
type ExecuteFileMessage = RendererIpcMessage<'EXECUTE_FILE'> & MessageData<string>
type ExecuteCommandMessage = RendererIpcMessage<'EXECUTE_COMMAND'> & MessageData<CommandData>
type InitInfoMessage = RendererIpcMessage<'GET_INIT_INFO'> & EmptyMessage

type SomeRendererIpcMessage = RendererIpcMessage<any> & (
    ReadDirMessage
    | ExecuteFileMessage
    | InitInfoMessage
    | ExecuteCommandMessage
    | ResolvePathMessage
)

type SomeMainIpcMessage = MainIpcMessage<any>

export type {
    RendererIpcMessageType,
    MainIpcMessageType,
    MessageData,
    RendererIpcMessage,
    MainIpcMessage,
    ReadDirMessage,
    InitInfoMessage,
    SomeMainIpcMessage,
    SomeRendererIpcMessage,
    ExecuteFileMessage,
    ExecuteCommandMessage,
    ResolvePathMessage
}