import { HasId } from "./protocol"

type CopyConflictReplyEventArgs = {
    conflictId: string
} & HasId

type DirRemovalConfirmReplyEventArgs = {
    confirmId: string   
} & HasId

const operationCancelEvent = (id: string) => `OPERATION_CANCEL/${id}`

const copyConflictEmitEvent = (id: string) => `COPY_CONFLICT/${id}`

const copyConflictReplyEvent = ({
    id,
    conflictId
}: CopyConflictReplyEventArgs) => `COPY_CONFLICT/${id}/${conflictId}`

const copyProgressEvent = (id: string) => `COPY_PROGRESS/${id}` 

const dirRemovalConfirmEmitEvent = (id: string) => `CONFIRM_DIR_REMOVAL/${id}`

const dirRemovalConfirmReplyEvent = ({
    id,
    confirmId
}: DirRemovalConfirmReplyEventArgs) => `CONFIRM_DIR_REMOVAL/${id}/${confirmId}`

const deleteProgressEvent = (id: string) => `DELETE_PROGRESS/${id}` 

const viewFileChunkEmitEvent = (id: string) => `VIEW_FILE_CHUNK/${id}`
const viewFileCancelEmitEvent = (id: string) => `VIEW_FILE_CANCEL/${id}`

export {
    operationCancelEvent,
    copyConflictEmitEvent,
    copyConflictReplyEvent,
    copyProgressEvent,
    dirRemovalConfirmEmitEvent,
    dirRemovalConfirmReplyEvent,
    deleteProgressEvent,
    viewFileChunkEmitEvent,
    viewFileCancelEmitEvent
}