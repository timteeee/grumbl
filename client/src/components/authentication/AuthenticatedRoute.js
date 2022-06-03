import React from "react";
import { Redirect, Route } from "react-router";
import { useUser } from "../../services/UserContext";

const AuthenticationCheck = ({ component: Component, ...rest }) => {
  const user = useUser()
  const { location, computedMatch } = rest
  const { url, params } = computedMatch
  if (user === undefined) {
    return <div>Loading...</div>
  }
  if (user !== null) {
    return (
      <Component {...params} />
    )
  }
  return <Redirect to={{ pathname: "/user-sessions/new", state: { url, params } }} />;
};

const AuthenticatedRoute = ({ component, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck 
        component={component} 
        {...rest} 
      />
    </Route>
  );
};

export default AuthenticatedRoute;
