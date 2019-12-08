import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";

import "@projectstorm/react-diagrams/dist/style.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/my_css.css";


import purple from "@material-ui/core/colors/green";

import { create } from "jss";
import rtl from "jss-rtl";
import {
  ThemeProvider,
  createMuiTheme,
  StylesProvider,
  jssPreset
} from "@material-ui/core/styles";




const jss = create({
  plugins: [...jssPreset().plugins, rtl()]
});

const theme = createMuiTheme({
  palette: {
    // primary: purple,
    // secondary: {
    //   main: "#f44336"
    // },
    type: "light",

  },
  typography: {
    // fontFamily: 'XM Yekan',
    fontFamily: 'Vazir'
  },
  direction: "rtl"
});


console.log(theme);

ReactDOM.render(
  <StylesProvider jss={jss}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Route component={App} />
      </ThemeProvider>
    </BrowserRouter>
  </StylesProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
