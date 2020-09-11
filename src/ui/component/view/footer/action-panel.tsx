import React from "react"
import "./action-panel.css"

const ActionPanel = () => {

    return <div className="action-panel">
        <button>F3 View</button>
        <button>F4 Edit</button>
        <button>F5 Copy</button>
        <button>F6 Move</button>
        <button>F7 New</button>
        <button>F8 Delete</button>
    </div>
}

export default ActionPanel