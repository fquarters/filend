import React, { useMemo } from "react"
import { Closure } from "../../../common/types"
import Strings from "../../common/strings"
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

    const footer = useMemo(() => <React.Fragment>
        <Button onClick={onOk}>
            {Strings.get('yesButton')}
        </Button>
        {
            onOkAll && <Button onClick={onOkAll}>
                {Strings.get('yesToAllButton')}
            </Button>
        }
        <Button onClick={onCancel}>
            {Strings.get('cancelButton')}
        </Button>
    </React.Fragment>, [
        onCancel,
        onOk,
        onOkAll
    ])

    return <Modal {...props} footer={footer}>
        {children}
    </Modal>
}

export default ConfirmDialog