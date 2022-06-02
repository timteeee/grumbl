import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../services/UserContext";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = () => {
  const user = useUser()
  const unauthenticatedButtons = [
    <li 
      key="sign-in"
      className="text-gray-700 hover:underline hover:text-[#ff485a]"
      role="button">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li 
      key="sign-up"
      className="text-gray-700 hover:underline hover:text-[#ff485a]"
      role="button">
      <Link to="/users/new" className="">
        Sign Up
      </Link>
    </li>,
  ];

  const authenticatedButtons = [
    <li key="sign-out">
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
              className="text-gray-700 hover:underline hover:text-[#ff485a]"
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

export default TopBar;
