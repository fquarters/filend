import { CommandData as CommandData, CopyArgs, CopyProgress, CopyConflict, OperationError } from "./protocol"

type RendererIpcMessageType = 'READ_DIR'
    | 'IS_DIR'
    | 'EXECUTE_FILE'
    | 'GET_INIT_INFO'
    | 'EXECUTE_COMMAND'
    | 'RESOLVE_PATH'
    | 'COPY_FILES'
    | 'NEXT_ID'

type MainIpcMessageType = 'COPY_PROGRESS'
    | 'COPY_CONFLICT'
    | 'OPERATION_ERROR'

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
type CopyFilesMessage = RendererIpcMessage<'COPY_FILES'> & MessageData<CopyArgs>
type NextIdMessage = RendererIpcMessage<'NEXT_ID'> & EmptyMessage

type SomeRendererIpcMessage = RendererIpcMessage<any> & (
    ReadDirMessage
    | ExecuteFileMessage
    | InitInfoMessage
    | ExecuteCommandMessage
    | ResolvePathMessage
    | CopyFilesMessage
)

type CopyProgressMessage = MainIpcMessage<'COPY_PROGRESS'> & MessageData<CopyProgress>
type CopyConflictMessage = MainIpcMessage<'COPY_CONFLICT'> & MessageData<CopyConflict>
type OperationErrorMessage = MainIpcMessage<'OPERATION_ERROR'> & MessageData<OperationError>

type SomeMainIpcMessage = MainIpcMessage<any> & (
    CopyProgressMessage
    | CopyConflictMessage
    | OperationErrorMessage
)

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
    ResolvePathMessage,
    CopyFilesMessage,
    CopyProgressMessage,
    CopyConflictMessage,
    OperationErrorMessage,
    NextIdMessage
}