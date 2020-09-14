import { OperationErrorMessage } from "../../common/ipc/messages";
import { OperationError } from "../../common/ipc/protocol";
import { ipcEmit } from "./ipc";

const notifyOperationError = (error: OperationError) => ipcEmit<OperationErrorMessage>({
    data: error,
    type: 'OPERATION_ERROR'
})

export {
    notifyOperationError
};
