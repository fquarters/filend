import { EditFileArgs } from "../../common/ipc/protocol"
import { exec } from 'child_process'
import os from 'os'

const editFileHandler = async (args: EditFileArgs) => {

    const platform = os.platform()

    switch (platform) {

        case 'darwin':
            exec(`open -a TextEdit ${args.path}`)
            break
        case 'win32': exec(`notepad ${args.path}`)
            break
        case 'linux': exec(`xdg-open ${args.path}`)
            break
        default: throw 'Unsupported platform'
    }

}

export default editFileHandler