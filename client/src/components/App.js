import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "../assets/style/tailwind.css";
import getCurrentUser from "../services/getCurrentUser";
import { UserContext } from "../services/UserContext";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import RoomCreator from "./room/RoomCreator";
import RoomShowPage from "./RoomShowPage";
import LandingPage from "./LandingPage";

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
      <UserContext.Provider value={currentUser}>
        <div className="h-screen bg-gradient-to-tl from-[#ffddd2] to-[#F4F1BB]">
          <TopBar />
          <div className="">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <AuthenticatedRoute exact path="/rooms/new" component={RoomCreator} />
              <AuthenticatedRoute 
                exact path="/rooms/:roomId" 
                component={RoomShowPage} 
                {...props}
              />
              <Route exact path="/users/new" component={RegistrationForm} />
              <Route exact path="/user-sessions/new" component={SignInForm} />
            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default hot(App);