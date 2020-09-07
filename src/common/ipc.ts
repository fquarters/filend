type RendererIpcMessageType = 'READ_DIR' | 'IS_DIR' | 'EXECUTE_FILE'

type MainIpcMessageType = ''

type MessageData<T> = {
    data: T
}

type RendererIpcMessage<T extends RendererIpcMessageType> = {
    type: T
}

type MainIpcMessage<T extends MainIpcMessageType> = {
    type: T
}

type ReadDirMessage = RendererIpcMessage<'READ_DIR'> & MessageData<string>
type ExecuteFileMessage = RendererIpcMessage<'EXECUTE_FILE'> & MessageData<string[]>

type SomeRendererIpcMessage = RendererIpcMessage<any> & (ReadDirMessage | ExecuteFileMessage)
type SomeMainIpcMessage = MainIpcMessage<any>

export type {
    RendererIpcMessageType,
    MainIpcMessageType,
    MessageData,
    RendererIpcMessage,
    MainIpcMessage,
    ReadDirMessage,
    SomeMainIpcMessage,
    SomeRendererIpcMessage,
    ExecuteFileMessage
}