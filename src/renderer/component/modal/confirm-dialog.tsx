import React from "react"
import { Closure } from "../../../common/types"
import Button from "../button"
import Modal, { ModalProps } from "./modal"

type ConfirmDialogProps = {
    onOk: Closure,
    onCancel: Closure,
    onOkAll?: Closure
} & Omit<ModalProps, 'footer'>

const ConfirmDialog = ({
    children,
    onOk,
    onOkAll,
    onCancel,
    ...props
}: ConfirmDialogProps) => {

    return <Modal {...props} footer={<React.Fragment>
        <Button onClick={onOk}>
            Yes
        </Button>
        {
            onOkAll && <Button onClick={onOkAll}>
                Yes to All
        </Button>
        }
        <Button onClick={onCancel}>
            Cancel
        </Button>
    </React.Fragment>}>
        {children}
    </Modal>
}

export default ConfirmDialog