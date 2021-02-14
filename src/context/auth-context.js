import React, { useEffect, useState } from "react";
import app from "../lib/Firebase";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    app.auth().onAuthStateChanged((res) => {
      console.log(res);
      setUser(res);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

const AuthHOC = (Component) => {
  return function WrappedComponent(props) {
    const { user } = useAuth();
    return <Component {...props} user={user} />;
  };
};

export { AuthContext, AuthProvider, useAuth, AuthHOC };
