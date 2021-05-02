import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../configs/config";
export default function InvoiceRouter() {
  return (
    <Router>
      <Switch>
        {
          routes.map(({ path, component }, key) => (
            <Route exact path={path} key={key} component={component} />
          ))
        }
      </Switch>
    </Router>
  );
}
