import path from 'path'
import { shell } from 'electron'

const executeFile = (filePath: string[]): Promise<string> => {

    const resolvedPath = path.resolve(...filePath)
    
    return shell.openPath(resolvedPath)
}

export default executeFile