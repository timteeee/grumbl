import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../authentication/SignOutButton";

const TopBar = ({ user }) => {
  const unauthenticatedButtons = [
    <li key="sign-in">
      <Link to="/user-sessions/new">Sign In</Link>
    </li>,
    <li key="sign-up">
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
    <nav className="min-w-full bg-white mx-auto mb-3 p-4 shadow-xl">
      <div className="flex items-center justify-between">
        <div className="text-2xl">Grumbl</div>
        <ul className="flex justify-end space-x-8 w-1/2 ">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? authenticatedButtons : unauthenticatedButtons}
        </ul>
      </div>
    </nav>
  );
};

export default TopBar;
