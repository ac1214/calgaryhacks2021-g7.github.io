import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./auth-context";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Route
        {...rest}
        render={(routeProps) =>
          user ? <RouteComponent {...routeProps} /> : <Redirect to={"/login"} />
        }
      />
    </>
  );
};

export default PrivateRoute;
