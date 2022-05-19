import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/style/main.pcss";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
// import RoomShowPage from "./RoomShowPage"
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import NewRoomButton from "./navigation/NewRoomButton";
import RoomConnection from "./RoomConnection";

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2 className="text-4xl">Welcome</h2>
          <NewRoomButton />
        </Route>
        <AuthenticatedRoute 
          exact path="/rooms/:action" 
          component={RoomConnection} 
          user={currentUser}
        />
        <AuthenticatedRoute 
          exact path="/rooms/:action/:roomId" 
          component={RoomConnection} 
          user={currentUser}
        />
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  );
};

export default hot(App);
