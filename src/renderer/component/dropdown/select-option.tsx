import React, { ReactChild, useCallback, useContext, useMemo } from "react"
import { OptionContext, OptionContextType, SelectContext, SelectContextType } from "./select"

type OptionProps<V> = {
    children?: ReactChild,
    value: V,
    label?: string
}

const SelectOption = <V,>({
    children,
    value,
    label
}: OptionProps<V>) => {

    const selectContext = useContext<SelectContextType<V> | null>(SelectContext)!
    const optionContext = useContext<OptionContextType | null>(OptionContext)!

    const onClick = useCallback(() => selectContext.onOptionClick(value, optionContext.index),
        [selectContext.onOptionClick, optionContext.index])

    const isSelected = useMemo<boolean>(() => selectContext.selected.indexOf(value) > -1,
        [selectContext.selected, value])

    const isFocused = selectContext.focusedOption == optionContext.index

    const className = `select__option 
    ${isSelected ? 'select__option--selected' : ''}
    ${isFocused ? 'select__option--focused' : ''}`

    return <div className={className}
        onClick={onClick}>
        {children || label}
    </div>
}

export default SelectOption