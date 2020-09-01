import { ReadDirMessage } from "./ipc";

const readDir = (path: string): ReadDirMessage => ({
    data: path,
    type: 'READ_DIR'
})

export {
    readDir
}