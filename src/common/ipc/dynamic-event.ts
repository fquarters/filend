import { HasId } from "./protocol"

type CopyConflictReplyEventArgs = {
    conflictId: string
} & HasId

type DirRemovalConfirmReplyEventArgs = {
    confirmId: string   
} & HasId

const operationCancelEvent = (id: string) => `OPERATION_CANCEL/${id}`
const operationErrorEvent = (id: string) => `OPERATION_ERROR/${id}`

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

export {
    operationCancelEvent,
    operationErrorEvent,
    copyConflictEmitEvent,
    copyConflictReplyEvent,
    copyProgressEvent,
    dirRemovalConfirmEmitEvent,
    dirRemovalConfirmReplyEvent,
    deleteProgressEvent
}