import React, { useState } from "react"
import { useClickOutside } from "../../services/useClickOutside"

const NavDropDown = ({ className, children }) => {
  const [open, setOpen] = useState(false)

  const menuRef = useClickOutside(() => setOpen(false))

  const dropDownButtons = children.map((button, index) => {
    return (
      <li onClick={() => setOpen(false)} key={ index } className="hover:text-[#ff485a]">
        { button }
      </li>
    )
  })

  return (
    <div ref={menuRef} className={`relative ${className}`}>
      <DropDownToggle setOpen={setOpen}/>
      {
        open && 
        <DropDownMenu>
          { dropDownButtons }
        </DropDownMenu>
      }
    </div>
  )
}

const DropDownToggle =  ({ setOpen }) => {
  return (
    <button onClick={() => setOpen(curr => !curr)}>
      Menu
    </button>
  )
}

const DropDownMenu = ({ children }) => {
  return (
    <div className="absolute z-10 right-0 bg-white bg-opacity-50 rounded-lg shadow-sm w-[200px] p-6">
      <ul className="flex flex-col space-y-2 items-start">
        { children }
      </ul>
    </div>
  )
}

export default NavDropDown