import { ExecuteFileMessage, ReadDirMessage, InitInfoMessage, ExecuteCommandMessage, ResolvePathMessage, CopyFilesMessage, CopyProgressMessage, CopyConflictMessage, OperationErrorMessage, NextIdMessage } from "./messages";
import { CommandData, CopyArgs, CopyProgress, CopyConflict, OperationError } from "./protocol";

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

const resolvePath = (path: string[]): ResolvePathMessage => ({
    data: path,
    type: 'RESOLVE_PATH'
})

const copyFiles = (data: CopyArgs): CopyFilesMessage => ({
    data,
    type: 'COPY_FILES'
})

const copyProgress = (data: CopyProgress): CopyProgressMessage => ({
    data,
    type: 'COPY_PROGRESS'
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
 
export {
    readDir,
    executeFile,
    getInitInfo,
    executeCommand,
    resolvePath,
    copyFiles,
    copyProgress,
    copyConflict,
    operationError,
    nextId
};
