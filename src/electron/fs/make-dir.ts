import { mkdir } from "original-fs";

const makeDir = (path: string): Promise<void> => new Promise((resolve, reject) => {
    mkdir(path, {

        recursive: true
        
    }, (err) => {

        if (err) {

            reject(err)

        } else {

            resolve()
        }

    })
})

export default makeDir