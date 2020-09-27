import React, { useEffect, useState } from "react"
import { viewFileChunkEmitEvent } from "../../../common/ipc/dynamic-event"
import Message from "../../../common/ipc/message-creators"
import { ViewFileChunkMessage } from "../../../common/ipc/messages"
import { ViewFileChunkResponse } from "../../../common/ipc/protocol"
import { ipcInvoke, ipcInvokeDynamic } from "../../common/ipc"
import "../../main.scss"
import "./viewer.scss"

type ViewerAppProps = {
    id: string,
    path: string
}

const ViewerApp = ({
    id,
    path
}: ViewerAppProps) => {

    const [content, setContent] = useState('')

    useEffect(() => {

        const getFirstChunk = async () => {

            const chunk = await ipcInvokeDynamic<ViewFileChunkResponse, ViewFileChunkMessage>({
                address: viewFileChunkEmitEvent(id),
                ...Message.viewFileChunk({
                    id,
                    path,
                    start: 0,
                    encoding: 'utf-8'
                })
            })

            setContent(chunk.content)
        }

        getFirstChunk()

    }, [id, path])

    return <div className="viewer">
        <pre className="viewer__content">
            {content}
        </pre>
    </div>
}

export default ViewerApp