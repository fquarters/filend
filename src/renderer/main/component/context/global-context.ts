import React, { MutableRefObject } from "react";

type GlobalContextType = {
    executeInputRef: MutableRefObject<HTMLInputElement | null>
}

const GlobalContext = React.createContext<GlobalContextType | null>(null)

export default GlobalContext

export type {
    GlobalContextType
}