import React from "react"
import { Side } from "../../store/data/state"

export type SideContextType = {
    side: Side
    active: boolean
    activeTab: number
}

const SideContext = React.createContext<SideContextType | null>(null)

export default SideContext