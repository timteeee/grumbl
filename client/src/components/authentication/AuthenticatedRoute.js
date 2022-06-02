import React, { useContext } from "react";
import { Redirect, Route } from "react-router";
import { UserContext } from "../../services/UserContext";
import SocketGenerator from "./SocketGenerator";

const AuthenticationCheck = ({ component: Component, inheritedSocket, ...rest }) => {
  const user = useContext(UserContext)
  const { url, params } = rest.computedMatch
  if (user === undefined) {
    return <div>Loading...</div>
  }
  if (user !== null) {
    return (
      <SocketGenerator 
        inheritedSocket={inheritedSocket}
        Component={Component} 
        {...rest} 
      />
    )
  }
  return <Redirect to={{ pathname: "/user-sessions/new", state: { url, params } }} />;
};

const AuthenticatedRoute = ({ component, ...rest }) => {
  const { location } = rest
  const inheritedSocket = location.socket ? location.socket : null

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck 
        inheritedSocket={inheritedSocket} 
        component={component} 
        {...rest} 
      />
    </Route>
  );
};

export default AuthenticatedRoute;
