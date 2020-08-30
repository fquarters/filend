import React from "react"
import { Link } from "react-router-dom"
import { Column, Row } from "./common/bulma-wrappers"

const NavBar = () => <Row>
    <Column narrow>
        <Link to="/">Home</Link>
    </Column>
    <Column narrow>
        <Link to="/scrap">Scrap</Link>
    </Column>
</Row>

export default NavBar