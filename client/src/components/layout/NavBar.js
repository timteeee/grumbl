import React from "react";
import { useUser } from "../../services/UserContext";
import LogoHomeButton from "../navigation/LogoHomeButton";
import SignInButton from "../navigation/SignInButton";
import SignOutButton from "../navigation/SignOutButton";
import SignUpButton from "../navigation/SignUpButton";

const NavBar = () => {
  const user = useUser()

  const unauthenticatedButtons = [
    <li 
      key="sign-in"
      className="text-gray-700 hover:text-[#ff485a]"
      role="button" >
      <SignInButton />
    </li>,
    <li 
      key="sign-up"
      className="text-gray-700 hover:text-[#ff485a]"
      role="button" >
      <SignUpButton />
    </li>
  ];

  const authenticatedButtons = [
    <li 
      key="sign-out"
      className="text-gray-700 hover:text-[#ff485a]">
      <SignOutButton />
    </li>
  ];

  return (
    <nav className="min-w-full bg-white bg-opacity-50 backdrop-blur-md mx-auto p-4 shadow-xl text-xl">
      <div className="flex items-center justify-around">
        <LogoHomeButton />
        <ul className="flex justify-end space-x-8 w-1/2 ">
          {user ? authenticatedButtons : unauthenticatedButtons}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
