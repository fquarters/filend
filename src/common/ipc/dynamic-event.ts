import { HasId } from "./protocol"

type CopyConflictReplyEventArgs = {
    conflictId: string
} & HasId

const copyCancelEvent = (id: string) => `COPY_CANCEL_${id}`

const copyConflictEmitEvent = (id: string) => `COPY_CONFLICT_${id}`

const copyConflictReplyEvent = ({
    id,
    conflictId
}: CopyConflictReplyEventArgs) => `COPY_CONFLICT_${id}_${conflictId}`

const copyProgressEvent = (id: string) => `COPY_PROGRESS_${id}` 

export {
    copyCancelEvent,
    copyConflictEmitEvent,
    copyConflictReplyEvent,
    copyProgressEvent
}