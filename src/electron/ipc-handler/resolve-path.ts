import { exists } from "fs"
import path from "path"

const resolvePath = (pathSegments: string[]): Promise<string> =>
    new Promise<string>((resolve, reject) => {

        const resolvedPath = path.resolve(...pathSegments)

        exists(resolvedPath, (doesExist) => {

            if (doesExist) {

                resolve(resolvedPath)

            } else {

                resolve('')
            }

        })
    })

export default resolvePath
