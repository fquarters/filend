import React, { ReactNode, useCallback, useContext, useState } from "react"
import { Consumer } from "../../common/types"
import { DropdownComponentContext } from "./dropdown"
import "./select-input.css"

type Tag<T> = {
    label: ReactNode,
    value: T
}

type Props<T> = {
    tags: Tag<T>[],
    onDelete: Consumer<T>
}

const SelectInput = <T,>({
    tags,
    onDelete
}: Props<T>) => {

    const context = useContext(DropdownComponentContext)!

    const setFocus = useCallback(() => {
        setTimeout(() => {
            context.inputRef.current?.focus({
                preventScroll: true
            })
            setActive(true)
        }, 0)
    }, [context.inputRef])

    const onBlur = useCallback((e: React.FocusEvent) => {

        if (context.clicking.current) {
            context.clicking.current = false
            setFocus()
        } else if (!context.searching.current) {
            context.hide()
            setActive(false)
        } else {
            setActive(false)
        }

    }, [
        context.hide,
        context.clicking,
        setFocus
    ])

    const onMouseDown = useCallback((e: React.MouseEvent) => {

        context.searching.current = false
        setFocus()

    }, [context.searching])

    const setRef = useCallback((current) => context.inputRef.current = current, [])

    const [active, setActive] = useState(false)

    const onInputKeyDown = useCallback((e: React.KeyboardEvent) => {

        e.preventDefault()

        if (!tags.length) {
            return
        }

        if (e.keyCode === 8) {

            onDelete(tags[tags.length - 1].value)

        } else if (e.keyCode === 46) {

            onDelete(tags[0].value)
        }

    }, [tags])

    return <div>
        <div className={`app-fake-input ${active ? 'app-active' : ''} input`}
            ref={setRef}
            onMouseDown={onMouseDown}
            onKeyDown={onInputKeyDown}
            onFocus={context.doOpen}
            onBlur={onBlur}
            suppressContentEditableWarning={true}
            contentEditable={true}>
            {tags.map((tag, index) =>
                <span className="tag is-light ml-1"
                    key={index}>
                    {tag.label}
                    <button className="delete is-small"
                        onClick={() => onDelete(tag.value)}></button>
                </span>)}
        </div>
    </div>
}

export default SelectInput