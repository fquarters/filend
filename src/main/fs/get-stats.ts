import { Stats, stat } from "original-fs"

const getStats = (path: string) => new Promise<Stats>((resolve, reject) =>
    stat(path, (err, stats) => {

        if (err != null) {
            reject(err)
        }

        resolve(stats)
    })
)

export default getStats