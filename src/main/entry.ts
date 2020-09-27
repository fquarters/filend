import electron from 'electron'
import { createMainWindow } from './create-window'
import executeFile from './ipc-handler/execute-file'
import readDir from './ipc-handler/read-dir'
import getInitInfo from './ipc-handler/init-info'
import executeCommand from './ipc-handler/execute-command'
import Logger from 'js-logger'
import resolvePath from './ipc-handler/resolve-path'
import copyFiles from './ipc-handler/copy-files'
import generateNextId from './ipc-handler/next-id'
import deleteFiles from './ipc-handler/delete-files'
import { handleInvoke } from './common/ipc'
import { isProductionMode } from '../common/defined-values'
import viewFileHandler from './ipc-handler/view-file'

Logger.useDefaults()

if (isProductionMode()) {

    Logger.setLevel(Logger.WARN)
}

const { app, BrowserWindow } = electron

app.whenReady().then(createMainWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})

handleInvoke('READ_DIR', readDir)
handleInvoke('EXECUTE_FILE', executeFile)
handleInvoke('GET_INIT_INFO', getInitInfo)
handleInvoke('EXECUTE_COMMAND', executeCommand)
handleInvoke('RESOLVE_PATH', resolvePath)
handleInvoke('COPY_FILES', copyFiles)
handleInvoke('NEXT_ID', generateNextId)
handleInvoke('DELETE_FILES', deleteFiles)
handleInvoke('VIEW_FILE', viewFileHandler)