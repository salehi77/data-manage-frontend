import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import DescriptionEdit from "./components/pages/DescriptionEdit";
import Algorithm from "./components/pages/Algorithm";
import Custom from "./components/pages/Custom";

function App() {
  return (
    <div dir="rtl">
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>

        <Route path="/edit/:id">
          <DescriptionEdit />
        </Route>

        <Route path="/algo/:id">
          <Algorithm />
        </Route>

        <Route path="/a">
          <Custom />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
