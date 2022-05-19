import React from "react";
import { Redirect, Route } from "react-router";

const AuthenticationCheck = ({ component: Component, user, ...rest }) => {
  const { url, params } = rest.computedMatch
  if (user === undefined) {
    return <div>Loading...</div>
  }
  if (user !== null) {
    return <Component user={user} params={params} />;
  }
  return <Redirect to={{ pathname: "/user-sessions/new", state: { url, params } }} />;
};

const AuthenticatedRoute = ({ component, user, ...rest }) => {
  return (
    <Route
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <AuthenticationCheck user={user} component={component} {...rest} />
    </Route>
  );
};

export default AuthenticatedRoute;
