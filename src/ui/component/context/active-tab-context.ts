import React from "react"
import { Side } from "../../store/data/state"

export type ActiveTabContextType = {
    side: Side,
    index: number,
    path: string
}

const ActiveTabContext = React.createContext<ActiveTabContextType | null>(null)

export default ActiveTabContext