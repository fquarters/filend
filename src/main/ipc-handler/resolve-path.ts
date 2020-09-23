import path from "path"
import checkFileExists from "../fs/check-file-exists"

const resolvePath = async (pathSegments: string[]): Promise<string | null> => {

    const resolvedPath = path.resolve(...pathSegments)

    const exists = await checkFileExists(resolvedPath)

    return Promise.resolve(exists ? resolvedPath : null)
}

export default resolvePath
