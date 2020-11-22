import React, { useMemo } from "react"
import { Closure } from "../../../common/types"
import Strings from "../../common/strings"
import useLocale from "../../hook/use-locale"
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

    const locale = useLocale()

    const footer = useMemo(() => {

        const stringsProvider = Strings.get(locale)

        return <React.Fragment>
            <Button onClick={onOk}>
                {stringsProvider('yesButton')}
            </Button>
            {onOkAll && <Button onClick={onOkAll}>
                {stringsProvider('yesToAllButton')}
            </Button>}
            <Button onClick={onCancel}>
                {stringsProvider('cancelButton')}
            </Button>
        </React.Fragment>
    }, [
        onCancel,
        onOk,
        onOkAll,
        locale
    ])

    return <Modal {...props} footer={footer}>
        {children}
    </Modal>
}

export default ConfirmDialog