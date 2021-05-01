import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "../components/LandingPage";
import InvoicePage from "../components/InvoicePage";

export default function InvoiceRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/invoice" component={InvoicePage} />
      </Switch>
    </Router>
  );
}
