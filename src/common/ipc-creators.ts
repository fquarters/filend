import { ExecuteFileMessage, ReadDirMessage } from "./ipc";

const readDir = (path: string): ReadDirMessage => ({
    data: path,
    type: 'READ_DIR'
})
const executeFile = (path: string[]): ExecuteFileMessage => ({
    data: path,
    type: 'EXECUTE_FILE'
})

export {
    readDir,
    executeFile
};
