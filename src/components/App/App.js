import React, { useContext, useEffect } from "react";
import { AuthContext, AuthProvider } from "../../context/auth-context";
import { Route, Switch, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { routes } from "../../routes";
import Modal from "@material-ui/core/Modal";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import app from "../../lib/Firebase";
import firebase from "firebase";
import Admin from "../../layouts/Admin";

const hist = createBrowserHistory();

const App = (props) => {
  const { user } = useContext(AuthContext);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => {
        return false;
      },
    },
  };

  useEffect(() => {
    console.log(props);
    if (!routes.includes(props.location.pathname)) {
      props.history.push("/dashboard");
    }
  }, [props]);

  return (
    <div>
      <Modal
        open={!user}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
        </div>
      </Modal>
      <Switch>
        <Route
          path="*"
          render={(routeProps) => {
            return <Admin {...routeProps} />;
          }}
        />
      </Switch>
    </div>
  );
};

export default withRouter(App);
