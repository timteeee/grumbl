import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../services/UserContext";
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
    <nav className="min-w-full bg-white bg-opacity-50 backdrop-blur-md mx-auto mb-3 p-4 shadow-xl text-xl">
      <div className="flex items-center lg:justify-around">
        <Link 
        className="mx-auto text-5xl font-Lobster text-[#ff485a]"
        to="/">
            Grumbl
        </Link>
        <ul className="hidden lg:flex justify-end space-x-8 w-1/2 ">
          <li>
            <Link 
              className="text-gray-700 hover:text-[#ff485a]"
              to="/">
              Home  
            </Link>
          </li>
          {user ? authenticatedButtons : unauthenticatedButtons}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
