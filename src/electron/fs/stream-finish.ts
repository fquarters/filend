import { finished } from 'stream'

const streamFinish = (stream: NodeJS.ReadableStream
    | NodeJS.WritableStream
    | NodeJS.ReadWriteStream) => new Promise((resolve, reject) => {

        finished(stream, (err) => {

            if (err) {

                reject(err)
            }

            resolve()
        })
    })

export default streamFinish