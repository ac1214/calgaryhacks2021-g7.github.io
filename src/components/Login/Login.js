import React, { useContext } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import app from "../../lib/Firebase";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

export default function Login() {
  const { user } = useContext(AuthContext);
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/admin",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    // callbacks: {
    //   // Avoid redirects after sign-in.
    //   signInSuccessWithAuthResult: () => {
    //     return <Redirect to="/admin" />;
    //   },
    // },
  };
  return (
    <>
      {user ? (
        <Redirect to="/admin" />
      ) : (
        <div>
          <h1>My App</h1>
          <p>Please sign-in</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={app.auth()} />
        </div>
      )}
    </>
  );
}
