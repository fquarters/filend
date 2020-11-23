import React, { ReactChild, useLayoutEffect, useState } from "react"
import useVisiblityTransition from "../../hook/use-visibility-transition"
import "./dropdown.scss"

type DropdownProps = {
    children: ReactChild | ReactChild[],
    open: boolean
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(({
    open,
    children
}: DropdownProps, ref) => {

    const visiblityClasses = useVisiblityTransition({
        fadingInClass: 'dropdown--fading-in',
        fadingOutClass: 'dropdown--fading-out',
        hiddenClass: 'dropdown--hidden',
        visibleClass: '',
        visible: open
    })

    return <div className={`dropdown ${visiblityClasses}`}
        ref={ref}>
        <div className={'dropdown__content'}>
            {children}
        </div>
    </div>
})

export default Dropdown