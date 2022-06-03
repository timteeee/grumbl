import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "../assets/style/tailwind.css";
import { UserProvider } from "../services/UserContext";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import RoomShowPage from "./RoomShowPage";
import LandingPage from "./LandingPage";

const App = (props) => {
  return (
    <Router>
      <div className="h-screen bg-gradient-to-tl from-[#ffddd2] to-[#F4F1BB]">
        <UserProvider>
          <TopBar />
          <div className="">
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <AuthenticatedRoute 
                exact path="/rooms/:roomId" 
                component={RoomShowPage} 
                {...props}
              />
              <Route exact path="/users/new" component={RegistrationForm} />
              <Route exact path="/user-sessions/new" component={SignInForm} />
            </Switch>
          </div>
        </UserProvider>
      </div>
    </Router>
  );
};

export default hot(App);