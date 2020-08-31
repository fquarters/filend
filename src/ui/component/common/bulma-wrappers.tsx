import React, { ReactChild, ReactChildren, ReactNode } from "react"
import "../../style/bulma-overrides.css"

type FieldProps = {
    label: string,
    children: ReactChildren | ReactChild,
    labelSize?: number
}

const Field = ({
    label,
    children,
    labelSize = 1
}: FieldProps) => {
    return <div className={`field is-horizontal app-label-grow-${labelSize}`}>
        <div className="field-label is-normal">
            <label className="label">{label}</label>
        </div>
        <div className="field-body">
            <div className="field">
                <div className="control">
                    {children}
                </div>
            </div>
        </div>
    </div>
}

type ColumnProps = {
    narrow?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const Column = ({
    className = '',
    narrow = false,
    children,
    ...props
}: ColumnProps) => <div {...props}
    className={`column ${className} ${narrow ? "is-narrow" : ""}`}>
        {children}
    </div>

type RowProps = {
    className?: string,
    children: ReactNode | ReactNode[],
    multiline?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const Row = ({
    className = '',
    multiline = true,
    children,
    ...props
}: RowProps) => <div {...props}
    className={`columns ${className} ${multiline ? "is-multiline" : ''}`}>
        {children}
    </div>


export {
    Field,
    Column,
    Row
}
