import electron from 'electron'
import { createWindow } from './create-window'
import { handleInvoke } from './ipc'
import executeFile from './ipc-handler/execute-file'
import readDir from './ipc-handler/read-dir'
import getInitInfo from './ipc-handler/init-info'
import executeCommand from './ipc-handler/execute-command'
import Logger from 'js-logger'

Logger.useDefaults();

const { app, BrowserWindow } = electron

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

handleInvoke('READ_DIR', readDir)
handleInvoke('EXECUTE_FILE', executeFile)
handleInvoke('GET_INIT_INFO', getInitInfo)
handleInvoke('EXECUTE_COMMAND', executeCommand)