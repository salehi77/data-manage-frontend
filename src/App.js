import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import DescriptionEdit from "./components/pages/DescriptionEdit";
import Custom from "./components/pages/Custom";
import Diagram from './components/pages/Diagram'
import CssBaseline from '@material-ui/core/CssBaseline'

function App(props) {

  return (

    <div dir="rtl">

      <CssBaseline />

      <Switch>

        <Route exact path="/" component={Dashboard} />

        <Route exact path="/dg" component={Diagram} />

        <Route path="/edit/:id" component={DescriptionEdit} />

        <Route path="/a" component={Custom} />

        <Route path="*">not found</Route>

      </Switch>

    </div>

  );
}

export default App;
