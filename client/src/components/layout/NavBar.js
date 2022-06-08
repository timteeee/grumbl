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
        key="account"
        className="hover:text-[#ff485a]">
        <button>Account</button>
      </li>,
      <li 
        key="sign-out"
        className="hover:text-[#ff485a]">
        <SignOutButton />
      </li>
    ]
  ) : (
    [
      <li 
        key="sign-in"
        className="hover:text-[#ff485a]"
        role="button" >
        <SignInButton />
      </li>,
      <li 
        key="sign-up"
        className="hover:text-[#ff485a]"
        role="button" >
        <SignUpButton />
      </li>
    ]
  )

  const menuButtons = [
    <li className="hover:text-[#ff485a]">
      <button>Home</button>
    </li>,
    <li className="hover:text-[#ff485a]">
      <button>About</button>
    </li>,
    <li className="hover:text-[#ff485a]">
      <button>Contact</button>
    </li>,
    <li className="hover:text-[#ff485a]">
      <button>How It Works</button>
    </li>
  ]

  return (
    <nav className="container mx-auto grid grid-cols-2 lg:grid-cols-[1fr_minmax(0,_3fr)_1fr] place-items-center p-6 text-xl">
      <LogoHomeButton/>      
      <ul className="hidden lg:flex gap-8">
        { menuButtons }
      </ul>
      <button className="justify-self-end lg:hidden">Menu</button>
      <ul className="hidden lg:flex gap-8 justify-self-end">
        { userButtons }
      </ul>
    </nav>
  );
};

export default NavBar;