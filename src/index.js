/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

// core components
import App from "./components/App/App";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import { Component } from "react";
import { AuthProvider } from "context/auth-context";
import { BrowserRouter } from "react-router-dom";

const render = (Component) => {
  return ReactDOM.render(
    <AuthProvider>
      <BrowserRouter basename="/">
        <Component />
      </BrowserRouter>
    </AuthProvider>,
    document.getElementById("root")
  );
};

render(App);
