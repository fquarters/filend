import React, { ReactChild, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { difference, union } from "../../../common/collections"
import { BiConsumer, Closure, Consumer } from "../../../common/types"
import { isChildOfElement } from "../../common/dom-utils"
import Dropdown from "./dropdown"
import OptionWrapper from "./select-option-wrapper"
import "./select.scss"

type SelectProps<V> = {
    open?: boolean,
    onOutsideClick?: Closure,
    onTriggerClick?: Closure,
    children: ReactChild | ReactChild[],
    onOpen?: Closure,
    onClose?: Closure,
    multiple?: boolean,
    onSelect?: Consumer<V[]>,
    value?: V[]
}

export type SelectContextType<V> = {
    onOptionClick: BiConsumer<V, number>,
    selected: V[]
    focusedOption: number
}



const SelectContext = React.createContext<SelectContextType<any> | null>(null)


const Select = <V,>({
    open,
    onOutsideClick,
    onTriggerClick,
    children,
    multiple = false,
    onOpen,
    onClose,
    onSelect,
    value
}: SelectProps<V>) => {

    const [innerOpen, setInnerOpen] = useState(false)
    const [innerValue, setInnerValue] = useState<V[]>([])
    const [focusedOption, setFocusedOption] = useState(0)

    const inputRef = useRef<HTMLDivElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const resolvedOpen = useMemo(() => open == undefined ? innerOpen : open,
        [innerOpen, open])

    const resolvedValue = useMemo(() => value == undefined ? innerValue : value,
        [innerValue, value])

    const resolvedChangeHandler = useMemo(() => onSelect || setInnerValue,
        [onSelect])

    const resolvedOutsideClickHandler = useCallback(() => onOutsideClick
        ? onOutsideClick()
        : setInnerOpen(false),
        [onOutsideClick])

    const onOptionSelect = useCallback((value: V, index: number) => {

        setFocusedOption(index)
        setInnerOpen(false)

        if (multiple) {

            if (resolvedValue.indexOf(value) > -1) {

                resolvedChangeHandler(difference(resolvedValue, [value]))

            } else {

                resolvedChangeHandler(union(resolvedValue, [value]))
            }

        } else {

            resolvedChangeHandler([value])
        }

    }, [
        multiple,
        resolvedChangeHandler,
        resolvedValue
    ])

    const context = useMemo<SelectContextType<V>>(() => ({
        onOptionClick: onOptionSelect,
        selected: resolvedValue,
        focusedOption
    }), [onOptionSelect, resolvedValue, focusedOption])

    const handleTriggerClick = useCallback(() => {

        if (onTriggerClick) {

            onTriggerClick()

        } else {

            setInnerOpen((current) => !current)

        }
    }, [onTriggerClick])

    const handleKeyEvents = useCallback((e: KeyboardEvent) => {

        const childrenCount = Array.isArray(children) ? children.length : 1

        if (e.key === "ArrowUp") {

            setFocusedOption((current) => Math.max(0, current - 1))
            e.preventDefault()

        } else if (e.key === "ArrowDown") {

            setFocusedOption((current) => Math.min(childrenCount - 1, current + 1))
            e.preventDefault()

        } else if (e.key === "Enter") {

            const selectChild = (child: ReactChild) => {

                if (React.isValidElement(child)) {

                    const value: V = child.props.value
                    onOptionSelect(value, focusedOption)
                }
            }

            if (Array.isArray(children)) {

                selectChild(children[focusedOption])

            } else {

                selectChild(children)
            }

        }

    }, [children, focusedOption, onOptionSelect])

    useEffect(() => {

        if (resolvedOpen) {

            const clickHandler = (e: MouseEvent) => {

                const target = e.target as HTMLElement

                const clickedDropdown = dropdownRef.current && isChildOfElement(target, dropdownRef.current)
                const clickedWrapper = wrapperRef.current && isChildOfElement(target, wrapperRef.current)
                const shouldHide = !(clickedDropdown || clickedWrapper)

                if (shouldHide) {

                    resolvedOutsideClickHandler()
                }
            }

            document.addEventListener('click', clickHandler)

            return () => {
                document.removeEventListener('click', clickHandler)
            }
        }

    }, [resolvedOpen, resolvedOutsideClickHandler])

    useEffect(() => {

        if (resolvedOpen) {

            document.addEventListener('keydown', handleKeyEvents)

            return () => {
                document.removeEventListener('keydown', handleKeyEvents)
            }
        }

    }, [resolvedOpen, handleKeyEvents])

    useEffect(() => {

        if (onOpen && resolvedOpen) {

            onOpen()
        }

        if (onClose && !resolvedOpen) {

            onClose()
        }

    }, [resolvedOpen, onOpen, onClose])

    const setFocus = useCallback((index: number) => setFocusedOption(index), [])
    const removeFocus = useCallback((index: number) => setFocusedOption(current => current == index ? -1 : current), [])

    return <div className="select">
        <SelectContext.Provider value={context}>
            <div className="select__input-wrapper"
                ref={wrapperRef}>
                <div ref={inputRef}
                    className="select__current-value"
                    onClick={handleTriggerClick}>
                    {resolvedValue.length ? resolvedValue.join('; ') : 'placeholder'}
                </div>
                <button className={`select__trigger ${open ? 'select__trigger--open' : ''}`}
                    onClick={handleTriggerClick}>▼</button>
            </div>
            <Dropdown open={resolvedOpen}
                ref={dropdownRef}>
                {
                    (Array.isArray(children)
                        ? children
                        : [children])
                        .map((child, index) => <OptionWrapper key={index}
                            setFocus={setFocus}
                            removeFocus={removeFocus}
                            index={index}>
                            {child}
                        </OptionWrapper>
                        )
                }
            </Dropdown>
        </SelectContext.Provider>
    </div>
}


export default Select

export {
    SelectContext
}
