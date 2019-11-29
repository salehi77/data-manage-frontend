import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Custom from "./components/pages/Custom";

function App() {
  return (
    <div dir="rtl" style={{ direction: "rtl" }}>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>

        <Route path="/a">
          <Custom />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
