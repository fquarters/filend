import { BrowserWindow } from "electron"
import { VIEWER_ID_ARG_NAME, VIEWER_PATH_ARG_NAME } from "../common/constants"
import { isDevMode } from "../common/defined-values"
import { ViewFileArgs } from "../common/ipc/protocol"
import windowHolder, { WindowName } from "./common/renderer-holder"

type WindowCreatorArgs = {
    entryPath: string,
    windowName: WindowName,
    additionalArguments?: string[]
}

const createWindow = ({
    entryPath,
    windowName,
    additionalArguments = []
}: WindowCreatorArgs) => {

    const win = new BrowserWindow({
        width: 960,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            additionalArguments
        },
        show: false,
        backgroundColor: '#000000'
    })

    win.loadFile(entryPath)

    if (isDevMode()) {
        // Open the DevTools.
        win.webContents.openDevTools({
            mode: 'bottom'
        })
    }

    win.setBackgroundColor('#000000')

    win.once('ready-to-show', win.show)

    windowHolder[windowName] = win.webContents
}

const createMainWindow = () => createWindow({
    entryPath: './index.html',
    windowName: 'main'
})

const createViewerWindow = ({
    id,
    path
}: ViewFileArgs) => createWindow({
    entryPath: `./viewer.html`,
    windowName: `viewer_${id}`,
    additionalArguments: [`${VIEWER_ID_ARG_NAME}=${id}`, `${VIEWER_PATH_ARG_NAME}=${path}`]
})

export {
    createMainWindow,
    createViewerWindow
}
