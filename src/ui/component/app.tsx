import Logger from "js-logger";
import React from "react";
import { Route, Switch } from "react-router-dom";

Logger.useDefaults();

const App = () => {

    return <div className={'content mx-2'}>
        <Switch>
            <Route path={"/"}>
                henlo!
            </Route>
        </Switch>
    </div>
};

export default App