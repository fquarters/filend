import { ExecuteFileMessage, ReadDirMessage, InitInfoMessage, ExecuteCommandMessage, ResolvePathMessage, CopyFilesMessage, CopyProgressMessage, CopyConflictMessage, OperationErrorMessage, NextIdMessage, DirRemovalConfirmMessage, DeleteFilesMessage, DeleteProgressMessage, ViewFileMessage, ViewFileCancelMessage, ViewFileChunkMessage } from "./messages";
import { CommandData, CopyArgs, CopyProgress, CopyConflict, OperationError, DirRemovalConfirm, DeleteArgs, DeleteProgress, ViewFileArgs, ViewFileChunkArgs } from "./protocol";

const readDir = (path: string): ReadDirMessage => ({
    data: path,
    type: 'READ_DIR'
})

const executeFile = (path: string): ExecuteFileMessage => ({
    data: path,
    type: 'EXECUTE_FILE'
})

const executeCommand = (command: CommandData): ExecuteCommandMessage => ({
    data: command,
    type: 'EXECUTE_COMMAND'
})

const getInitInfo = (): InitInfoMessage => ({
    data: null,
    type: 'GET_INIT_INFO'
})

const resolvePath = (...path: string[]): ResolvePathMessage => ({
    data: path,
    type: 'RESOLVE_PATH'
})

const copyFiles = (data: CopyArgs): CopyFilesMessage => ({
    data,
    type: 'COPY_FILES'
})

const deleteFiles = (data: DeleteArgs): DeleteFilesMessage => ({
    data,
    type: 'DELETE_FILES'
})

const copyProgress = (data: CopyProgress): CopyProgressMessage => ({
    data,
    type: 'COPY_PROGRESS'
})

const deleteProgress = (data: DeleteProgress): DeleteProgressMessage => ({
    data,
    type: 'DELETE_PROGRESS'
})

const copyConflict = (data: CopyConflict): CopyConflictMessage => ({
    data,
    type: 'COPY_CONFLICT'
})

const operationError = (data: OperationError): OperationErrorMessage => ({
    data,
    type: 'OPERATION_ERROR'
})

const nextId = (): NextIdMessage => ({
    data: null,
    type: 'NEXT_ID'
})

const dirRemovalConfirm = (data: DirRemovalConfirm): DirRemovalConfirmMessage => ({
    data,
    type: 'DIR_REMOVAL_CONFIRM'
})

const viewFile = (data: ViewFileArgs): ViewFileMessage => ({
    data,
    type: 'VIEW_FILE'
})

const viewFileChunk = (data: ViewFileChunkArgs): ViewFileChunkMessage => ({
    data,
    type: 'VIEW_FILE_CHUNK'
})

const viewFileCancel = (data: string): ViewFileCancelMessage => ({
    data,
    type: 'VIEW_FILE_CANCEL'
})

const Message = {
    readDir,
    executeFile,
    getInitInfo,
    executeCommand,
    resolvePath,
    copyFiles,
    copyProgress,
    copyConflict,
    operationError,
    nextId,
    dirRemovalConfirm,
    deleteFiles,
    deleteProgress,
    viewFile,
    viewFileChunk,
    viewFileCancel
}
 
export default Message
