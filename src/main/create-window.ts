import { BrowserWindow } from "electron"
import { isDevMode } from "../common/defined-values"
import holder from "./common/renderer-holder"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 960,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('./index.html')

    if (isDevMode()) {
        // Open the DevTools.
        win.webContents.openDevTools({
            mode: 'bottom'
        })
    }

    holder.value = win.webContents
}

export {
    createWindow
}