import Logger from "js-logger";
import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./nav-bar";

Logger.useDefaults();

const App = () => {

    return <div className={'content mx-2'}>
        <NavBar />
        <Switch>
            <Route path={"/"}>
                henlo
            </Route>
        </Switch>
    </div>
};

export default App