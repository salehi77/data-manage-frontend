import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import DescriptionEdit from "./components/pages/DescriptionEdit";
import Algorithm from "./components/pages/Algorithm";
import Custom from "./components/pages/Custom";

function App(props) {
  return (
    <div dir="rtl">
      <Switch>
        <Route exact path="/" component={Dashboard} />

        <Route path="/edit/:id" component={DescriptionEdit} />

        <Route path="/algo/:id" component={Algorithm} />

        <Route path="/a" component={Custom} />
      </Switch>
    </div>
  );
}

export default App;
