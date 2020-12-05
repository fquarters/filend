import React, { ReactChild, useCallback, useEffect, useMemo, useRef } from "react"
import { Closure, Consumer } from "../../../common/types"
import Dropdown from "./dropdown"
import OptionWrapper from "./select-option-wrapper"
import "./select.scss"
import useSelectKeyEventHandler from "./use-select-key-event-handler"
import useSelectOutsideClickHandler from "./use-select-mouse-click-handler"
import useSelectReducer from "./use-select-reducer"

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
    onOptionClick: Consumer<number>,
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

    const inputRef = useRef<HTMLDivElement | null>(null)
    const dropdownRef = useRef<HTMLDivElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)

    const [state, dispatch] = useSelectReducer<V>({
        open,
        value,
        multiple
    })

    useEffect(() => {

        if (open !== undefined) {

            if (open) {

                dispatch({
                    type: 'OPEN'
                })

            } else {

                dispatch({
                    type: 'CLOSE'
                })
            }
        }

    }, [open])

    useEffect(() => {

        if (value) {

            dispatch({
                type: 'SET_VALUE',
                data: value
            })
        }

    }, [value])

    const {
        open: stateOpen,
        value: stateValue,
        focusedOption,
        selectedValue
    } = state

    useEffect(() => {

        if (onSelect && selectedValue) {

            if (value) {

                if (value !== selectedValue) {

                    onSelect(selectedValue)
                }

            } else {

                onSelect(selectedValue)
            }

            dispatch({
                type: 'CLEAR_SELECTED'
            })
        }

    }, [onSelect, selectedValue, value])

    const getChildValue = useCallback((index: number) => {

        const child = Array.isArray(children) ? children[index] : children

        if (React.isValidElement(child)) {

            const value: V = child.props.value

            return value
        }

        throw 'invalid options'

    }, [children])

    const onOptionSelect = useCallback((index: number) => {

        dispatch({
            type: 'SELECT_OPTION',
            data: {
                index,
                value: getChildValue(index)
            }
        })

    }, [getChildValue])

    const context = useMemo<SelectContextType<V>>(() => ({
        onOptionClick: onOptionSelect,
        selected: stateValue,
        focusedOption
    }), [onOptionSelect, stateValue, focusedOption])

    const handleTriggerClick = useCallback(() => {

        if (onTriggerClick) {

            onTriggerClick()

        } else {

            dispatch({
                type: 'TOGGLE'
            })

        }
    }, [onTriggerClick])

    useEffect(() => {

        if (onOpen && stateOpen) {

            onOpen()
        }

        if (onClose && !stateOpen) {

            onClose()
        }

    }, [stateOpen, onOpen, onClose])

    useSelectKeyEventHandler({
        optionCount: Array.isArray(children) ? children.length : 1,
        onOptionSelect,
        dispatch,
        focusedOption,
        open: stateOpen
    })

    useSelectOutsideClickHandler({
        dispatch,
        dropdownRef,
        wrapperRef,
        open: stateOpen,
        onOutsideClick
    })

    const setFocus = useCallback((index: number) => dispatch({
        type: 'SET_FOCUSED_OPTION',
        data: index
    }), [])

    const removeFocus = useCallback((index: number) => dispatch({
        type: 'REMOVE_FOCUS',
        data: index
    }), [])

    return <div className="select">
        <SelectContext.Provider value={context}>
            <div className="select__input-wrapper"
                ref={wrapperRef}>
                <div ref={inputRef}
                    className="select__current-value"
                    onClick={handleTriggerClick}>
                    {stateValue.length ? stateValue.join('; ') : 'placeholder'}
                </div>
                <button className={`select__trigger ${open ? 'select__trigger--open' : ''}`}
                    onClick={handleTriggerClick}>▼</button>
            </div>
            <Dropdown open={stateOpen}
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
