import React, { ReactChild, ReactChildren, useEffect, useMemo, useState } from "react"
import { replaceElement } from "../../../common/collections"
import { Closure, Consumer, MapFunction } from "../../../common/types"
import ConfirmDialog from "./confirm-dialog"
import { ModalProps } from "./modal"

type ConfirmDialogArgs = {
    onOk: Closure,
    onCancel: Closure,
    onOkAll?: Closure
} & Omit<ModalProps, 'footer' | 'visible' | 'dismissable' | 'toggleVisiblity'>

type ConfirmDialogProps = ConfirmDialogArgs & {
    visible: boolean
}

type Holder = {
    setArgs?: Consumer<ConfirmDialogProps[] | MapFunction<ConfirmDialogProps[], ConfirmDialogProps[]>>
}

const holder: Holder = {

}

const confirmDialog = (args: ConfirmDialogArgs) => {

    if (holder.setArgs) {

        let visible = true

        const newDialogProps: ConfirmDialogProps = {
            ...args,
            visible,
            onCancel: () => {
                args.onCancel()
                update(false)
            },
            onOk: () => {
                args.onOk()
                update(false)
            },
            onOkAll: args.onOkAll ? () => {
                args.onOkAll && args.onOkAll()
                update(false)
            } : undefined
        }

        const update = (visible: boolean) => holder.setArgs && holder
            .setArgs(current => replaceElement(current, {
                ...newDialogProps,
                visible
            }, (item) => item === newDialogProps))

        holder.setArgs((current) => [...current, newDialogProps])
    }

}

type GlobalModalAccessProps = {
    children: ReactChild | ReactChildren
}

type GlobalModalContextType = {
    activeModals: number,
    setActiveModals: Consumer<number | MapFunction<number, number>>
}

const GlobalModalContext = React.createContext<GlobalModalContextType | null>(null)

const GlobalModalAccess = ({
    children
}: GlobalModalAccessProps) => {

    const [args, setArgs] = useState<ConfirmDialogProps[]>([])
    const [activeModals, setActiveModals] = useState<number>(0)

    useEffect(() => {

        holder.setArgs = setArgs

        return () => {

            holder.setArgs = undefined
        }

    }, [])

    const context = useMemo(() => ({

        activeModals,
        setActiveModals

    }), [activeModals])

    return <GlobalModalContext.Provider value={context}>
        {children}
        {args.map((args, index) => <ConfirmDialog {...args}
            key={index} />)}
    </GlobalModalContext.Provider>
}

export default GlobalModalAccess

export {
    confirmDialog,
    GlobalModalContext
}
