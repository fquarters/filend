import { ExecuteFileMessage, ReadDirMessage, InitInfoMessage, ExecuteCommandMessage, ResolvePathMessage, CopyFilesMessage, CopyProgressMessage, CopyConflictMessage, OperationErrorMessage, NextIdMessage, DirRemovalConfirmMessage, DeleteFilesMessage, DeleteProgressMessage, ViewFileMessage, ViewFileCancelMessage, ViewFileChunkMessage, EditFileMessage, MakeDirMessage, RenameFileMessage } from "./messages";
import { CommandData, CopyArgs, CopyProgress as CopyProgress, CopyConflict as CopyConflict, OperationError, DirRemovalConfirm as DirRemovalConfirmArgs, DeleteArgs, DeleteProgress as DeleteProgress, ViewFileArgs, ViewFileChunkArgs, EditFileArgs, MakeDir as MakeDirArgs, RenameFileArgs as RenameFileArgs } from "./protocol";

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

const makeDir = (data: MakeDirArgs): MakeDirMessage => ({
    data,
    type: 'MAKE_DIR'
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

const dirRemovalConfirm = (data: DirRemovalConfirmArgs): DirRemovalConfirmMessage => ({
    data,
    type: 'DIR_REMOVAL_CONFIRM'
})

const viewFile = (data: ViewFileArgs): ViewFileMessage => ({
    data,
    type: 'VIEW_FILE'
})

const editFile = (data: EditFileArgs): EditFileMessage => ({
    data,
    type: 'EDIT_FILE'
})

const viewFileChunk = (data: ViewFileChunkArgs): ViewFileChunkMessage => ({
    data,
    type: 'VIEW_FILE_CHUNK'
})

const viewFileCancel = (data: string): ViewFileCancelMessage => ({
    data,
    type: 'VIEW_FILE_CANCEL'
})

const renameFile = (data: RenameFileArgs): RenameFileMessage => ({
    data,
    type: 'RENAME_FILE'
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
    viewFileCancel,
    editFile,
    makeDir,
    renameFile
}
 
export default Message
