type RendererIpcMessageType = 'READ_DIR' | 'IS_DIR' | 'EXECUTE_FILE' | 'GET_INIT_INFO'

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

type ReadDirMessage = RendererIpcMessage<'READ_DIR'> & MessageData<string>
type ExecuteFileMessage = RendererIpcMessage<'EXECUTE_FILE'> & MessageData<string[]>
type InitInfoMessage = RendererIpcMessage<'GET_INIT_INFO'> & EmptyMessage

type SomeRendererIpcMessage = RendererIpcMessage<any> & (
    ReadDirMessage 
    | ExecuteFileMessage
    | InitInfoMessage
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
    ExecuteFileMessage
}