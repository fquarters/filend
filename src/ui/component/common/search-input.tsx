import React, { useCallback, useContext } from "react"
import { Consumer } from "../../../common/types"
import { DropdownComponentContext } from "./dropdown"

type Props = {
    value: string,
    onChange: Consumer<string>
}

const SearchInput = ({
    value,
    onChange
}: Props) => {

    const context = useContext(DropdownComponentContext)!

    const onBlur = useCallback((e: React.FocusEvent) => {

        if (context.clicking.current) {
            context.clicking.current = false
            context.searching.current = false
            setTimeout(() => {
                context.inputRef.current?.focus()
            }, 0)
        } else {
            context.hide()
        }

    }, [
        context.hide,
        context.clicking,
        context.inputRef,
        context.searching
    ])

    const onMouseDown = useCallback(() => {
        context.searching.current = true
    }, [context.searching])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value), [])

    return <input type="text"
        className="input"
        onBlur={onBlur}
        value={value}
        onChange={handleChange}
        onMouseDown={onMouseDown} />
}

export default SearchInput