import { BrowserWindow } from "electron"

const createWindow = () => {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    win.loadFile('../index.html')

    // Open the DevTools.
    win.webContents.openDevTools({
        mode: 'bottom'
    })
}

export {
    createWindow
}