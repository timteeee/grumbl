import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import "../assets/style/tailwind.css";
import { UserProvider } from "../services/UserContext";
import AuthenticatedRoute from "./users/AuthenticatedRoute"
import RegistrationForm from "./users/RegistrationForm";
import SignInForm from "./users/SignInForm";
import NavBar from "./layout/NavBar";
import RoomShowPage from "./pages/RoomShowPage";
import LandingPage from "./pages/LandingPage";
import Welcome from "./pages/Welcome";

const App = (props) => {
  return (
    <Router>
      <div className="h-screen bg-gradient-to-tl from-[#ffddd2] to-[#F4F1BB]">
        <UserProvider>
          <NavBar />
          <div>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/welcome" component={Welcome} />
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