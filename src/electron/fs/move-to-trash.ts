import { shell } from "electron"

const moveToTrash = async (path: string) => {

    new Promise((resolve) => {

        setImmediate(() => {
            
            shell.moveItemToTrash(path, true)

            resolve()
        })
    })
}

export default moveToTrash