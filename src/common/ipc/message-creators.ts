import { ExecuteFileMessage, ReadDirMessage, InitInfoMessage, ExecuteCommandMessage, ResolvePathMessage } from "./messages";
import { CommandData } from "./protocol";

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

export {
    readDir,
    executeFile,
    getInitInfo,
    executeCommand,
    resolvePath
};
