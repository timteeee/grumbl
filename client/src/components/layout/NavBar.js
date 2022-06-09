import React, { useState } from "react";
import { useUser } from "../../services/UserContext";
import LogoHomeButton from "../navigation/LogoHomeButton";
import { HomeButton, AboutButton, HowItWorksButton, ContactButton, AccountButton } from "../navigation/ButtonIndex";
import SignInButton from "../navigation/SignInButton";
import SignOutButton from "../navigation/SignOutButton";
import SignUpButton from "../navigation/SignUpButton";
import NavDropDown from "../navigation/NavDropDown";

const NavBar = () => {
  const user = useUser()
  
  const [userSignedOut, setUserSignedOut] = useState(false);

  if (userSignedOut) {
    location.href = "/";
  }

  const navButtons = [
    <HomeButton key="home" />,
    <AboutButton key="about" />,
    <HowItWorksButton key="how-it-works" />,
    <ContactButton key="contact" />
  ]

  const userButtons = user ? [
    <AccountButton key="account" />,
    <SignOutButton key="sign-out" setUserSignedOut={setUserSignedOut} />
  ] : [
    <SignInButton key="sign-in" />,
    <SignUpButton key="sign-up" />
  ]


  return (
    <div className="w-full bg-white bg-opacity-50 shadow-sm">
      <nav className="w-full max-w-[1400px] mx-auto grid grid-cols-[1fr_minmax(0,_3fr)_1fr] place-items-center py-3 px-6 text-xl">
        <LogoHomeButton/>      
        <ul className="hidden lg:flex col-start-2 gap-8">
          { navButtons.map((button, index) => {
            return (
              <li key={ index } className="hover:text-[#ff485a]">
                { button }
              </li>
            )
          }) }
        </ul>
        <NavDropDown className="col-start-3 justify-self-end lg:hidden">
          { [...navButtons, ...userButtons] }
        </NavDropDown>
        <ul className="hidden lg:flex col-start-3 gap-6 justify-self-end">
          { userButtons.map((button, index) => {
            return (
              <li key={ index } className="hover:text-[#ff485a]">
                { button }
              </li>
            )
          }) }
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;