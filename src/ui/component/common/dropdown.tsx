import React, { ReactNode, useCallback, useMemo, useRef, useState } from "react"
import { Closure, Consumer, MapFunction } from "../../../common/types"
import SearchInput from "./search-input"
import "./dropdown.css"
import { Row as Row, Column } from "./bulma-wrappers"

type DropdownProps = {
    children: ReactNode,
    input: ReactNode
}

const dropdownStyle = {
    display: 'flex'
}

const dropdownTriggerStyle = {
    flexGrow: 1
}

export type DropdownContext = {
    doOpen: Closure,
    hide: Closure,
    clicking: React.MutableRefObject<boolean>,
    searching: React.MutableRefObject<boolean>,
    inputRef: React.MutableRefObject<null | HTMLInputElement>,
    matchesSearch: MapFunction<string, boolean>
}

const DropdownComponentContext = React.createContext<DropdownContext | null>(null)

const Dropdown = ({
    children,
    input
}: DropdownProps) => {

    const [open, setOpen] = useState<boolean>(false)

    const doOpen = useCallback(() => setOpen(true), [])
    const hide = useCallback(() => setOpen(false), [])
    const clicking = useRef(false)
    const searching = useRef(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    const matchesSearch = useCallback((searchBy: string) => !searchTerm
        || searchBy.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        [searchTerm])

    const context = useMemo(() => ({
        doOpen,
        hide,
        clicking,
        searching,
        inputRef,
        matchesSearch
    }), [doOpen, hide, matchesSearch])

    return <DropdownComponentContext.Provider value={context}>
        <div className={`dropdown ${!open || "is-active"}`} style={dropdownStyle}>
            <div className="dropdown-trigger" style={dropdownTriggerStyle}>
                <Row>
                    <Column>
                        {input}
                    </Column>
                </Row>
            </div>
            {
                open && <div className={`dropdown-menu`} role="menu">
                    <div className="dropdown-content app-dropdown-content">
                        <div className="dropdown-item">
                            <SearchInput value={searchTerm}
                                onChange={setSearchTerm} />
                        </div>
                        {children}
                    </div>
                </div>
            }
        </div>
    </DropdownComponentContext.Provider>
}

export {
    Dropdown,
    DropdownComponentContext
}
