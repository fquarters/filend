import { Dispatch, MutableRefObject, useCallback, useEffect } from "react"
import { Closure } from "../../../common/types"
import { isChildOfElement } from "../../common/dom-utils"
import { SomeSelectAction } from "./use-select-reducer"

type SelectMouseClickHandlerArgs<T> = {
    open: boolean,
    dropdownRef: MutableRefObject<HTMLElement | null>,
    wrapperRef: MutableRefObject<HTMLElement | null>,
    onOutsideClick?: Closure,
    dispatch: Dispatch<SomeSelectAction<T>>
}

const useSelectOutsideClickHandler = <T>({
    open,
    dropdownRef,
    wrapperRef,
    onOutsideClick,
    dispatch
}: SelectMouseClickHandlerArgs<T>) => {

    const resolvedOutsideClickHandler = useCallback(() => onOutsideClick
        ? onOutsideClick()
        : dispatch({
            type: 'CLOSE'
        }),
        [onOutsideClick])

    useEffect(() => {

        if (open) {

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

    }, [open, resolvedOutsideClickHandler])
}

export default useSelectOutsideClickHandler