import React, { MutableRefObject, ReactChild } from "react"
import "./dropdown.scss"

type DropdownProps = {
    children: ReactChild | ReactChild[],
    open: boolean
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
    open,
    children
}: DropdownProps, ref) => <div className={`dropdown ${open ? '' : 'dropdown--hidden'}`}
    ref={ref}>
        <div className={'dropdown__content'}>
            {children}
        </div>
    </div>)

export default Dropdown