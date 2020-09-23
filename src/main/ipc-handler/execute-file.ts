import { shell } from 'electron'

const executeFile = (filePath: string): Promise<string> => shell.openPath(filePath)

export default executeFile