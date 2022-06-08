import React from "react";
import { useUser } from "../../services/UserContext";
import LogoHomeButton from "../navigation/LogoHomeButton";
import SignInButton from "../navigation/SignInButton";
import SignOutButton from "../navigation/SignOutButton";
import SignUpButton from "../navigation/SignUpButton";

const NavBar = () => {
  const user = useUser()

  const userButtons = user ? (
    [
      <li 
        key="sign-out"
        className="text-gray-700 hover:text-[#ff485a]">
        <SignOutButton />
      </li>
    ]
  ) : (
    [
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
    ]
  )

  const menuButtons = [
    <li className="text-gray-700 hover:text-[#ff485a]">
      <button>Home</button>
    </li>,
    <li className="text-gray-700 hover:text-[#ff485a]">
      <button>About</button>
    </li>,
    <li className="text-gray-700 hover:text-[#ff485a]">
      <button>Contact</button>
    </li>,
    <li className="text-gray-700 hover:text-[#ff485a]">
      <button>How It Works</button>
    </li>
  ]

  return (
    <nav className="container mx-auto grid grid-cols-2 lg:grid-cols-[2fr_3fr_2fr] place-items-center p-6 text-xl">
      <LogoHomeButton/>      
      <ul className="hidden lg:flex gap-8 xl:gap-10">
        { menuButtons }
      </ul>
      <button className="justify-self-end lg:hidden">Menu</button>
      <ul className="hidden lg:flex gap-10 justify-self-end">
        { userButtons }
      </ul>
    </nav>
  );
};

export default NavBar;