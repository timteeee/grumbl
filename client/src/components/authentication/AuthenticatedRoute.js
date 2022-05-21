import React from "react";
import { Redirect, Route } from "react-router";
import SocketGenerator from "./SocketGenerator";

const AuthenticationCheck = ({ component: Component, user, inheritedSocket, ...rest }) => {
  const { url, params } = rest.computedMatch
  if (user === undefined) {
    return <div>Loading...</div>
  }
  if (user !== null) {
    return (
      <SocketGenerator 
        user={user} 
        inheritedSocket={inheritedSocket}
        Component={Component} 
        {...rest} 
      />
    )
  }
  return <Redirect to={{ pathname: "/user-sessions/new", state: { url, params } }} />;
};

const AuthenticatedRoute = ({ component, user, ...rest }) => {
  const { location } = rest
  const inheritedSocket = location.socket ? location.socket : null

  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck 
        user={user} 
        inheritedSocket={inheritedSocket} 
        component={component} 
        {...rest} 
      />
    </Route>
  );
};

export default AuthenticatedRoute;
