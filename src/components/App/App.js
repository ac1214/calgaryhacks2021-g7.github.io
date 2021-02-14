import React from "react";
import { AuthProvider } from "../../context/auth-context";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../../context/PrivateRoute";
import Admin from "../../layouts/Admin";
import Login from "../Login/Login";
import { createBrowserHistory } from "history";

const hist = createBrowserHistory();

const App = (props) => {
  return (
    <AuthProvider>
      <Router history={hist}>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Router>
    </AuthProvider>
  );
};

export default App;
