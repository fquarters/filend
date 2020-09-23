import { CommandData as CommandData, CopyArgs, CopyProgress, CopyConflict, OperationError, DeleteArgs, DirRemovalConfirm, DeleteProgress, MakeDir } from "./protocol"

type RendererIpcMessageType = 'READ_DIR'
    | 'IS_DIR'
    | 'EXECUTE_FILE'
    | 'GET_INIT_INFO'
    | 'EXECUTE_COMMAND'
    | 'RESOLVE_PATH'
    | 'COPY_FILES'
    | 'DELETE_FILES'
    | 'NEXT_ID'
    | 'MAKE_DIR'


type MainIpcMessageType = 'COPY_PROGRESS'
    | 'DELETE_PROGRESS'
    | 'COPY_CONFLICT'
    | 'OPERATION_ERROR'
    | 'DIR_REMOVAL_CONFIRM'

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
type MakeDirMessage = RendererIpcMessage<'MAKE_DIR'> & MessageData<MakeDir>
type ReadDirMessage = RendererIpcMessage<'READ_DIR'> & MessageData<string>
type ExecuteFileMessage = RendererIpcMessage<'EXECUTE_FILE'> & MessageData<string>
type ExecuteCommandMessage = RendererIpcMessage<'EXECUTE_COMMAND'> & MessageData<CommandData>
type InitInfoMessage = RendererIpcMessage<'GET_INIT_INFO'> & EmptyMessage
type CopyFilesMessage = RendererIpcMessage<'COPY_FILES'> & MessageData<CopyArgs>
type DeleteFilesMessage = RendererIpcMessage<'DELETE_FILES'> & MessageData<DeleteArgs>
type NextIdMessage = RendererIpcMessage<'NEXT_ID'> & EmptyMessage

type SomeRendererIpcMessage = RendererIpcMessage<any> & (
    ReadDirMessage
    | ExecuteFileMessage
    | InitInfoMessage
    | ExecuteCommandMessage
    | ResolvePathMessage
    | CopyFilesMessage
    | DeleteFilesMessage
    | MakeDirMessage
)

type CopyProgressMessage = MainIpcMessage<'COPY_PROGRESS'> & MessageData<CopyProgress>
type DeleteProgressMessage = MainIpcMessage<'DELETE_PROGRESS'> & MessageData<DeleteProgress>
type CopyConflictMessage = MainIpcMessage<'COPY_CONFLICT'> & MessageData<CopyConflict>
type DirRemovalConfirmMessage = MainIpcMessage<'DIR_REMOVAL_CONFIRM'> & MessageData<DirRemovalConfirm>
type OperationErrorMessage = MainIpcMessage<'OPERATION_ERROR'> & MessageData<OperationError>

type SomeMainIpcMessage = MainIpcMessage<any> & (
    CopyProgressMessage
    | DeleteProgressMessage
    | CopyConflictMessage
    | OperationErrorMessage
    | DirRemovalConfirmMessage
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
    NextIdMessage,
    DeleteFilesMessage,
    DirRemovalConfirmMessage,
    DeleteProgressMessage,
    MakeDirMessage
}