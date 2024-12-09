import React, { useState } from "react";
import LogoImg from "../assets/images/logo-black.png";
import { LinkData } from "../assets/data/dummydata";
import { NavLink, Link } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { HiOutlineMenuAlt1, HiViewGrid } from "react-icons/hi";
import DropdownButton from './Button';

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [userDropdownVisible, setUserDropdownVisible] = useState(false);

  return (
    <header className='bg-white py-4 text-black sticky z-50 shadow-md top-0 left-0 w-full'>
      <div className='container flex justify-between items-center'>
        <div className='logo flex items-center gap-6'>
          <img src={LogoImg} alt='logo' className='h-9' />
          <div className='category flex items-center text-sm gap-3'>
            <HiViewGrid size={20} />
            <span>Lycee St. Alexandre Sauli</span>
          </div>
        </div>
        <nav className={open ? "mobile-view" : "desktop-view"}>
          <ul className='flex items-center gap-6'>
            {LinkData.map((link, index) => (
              <li key={`nav-link-${link.id}-${index}`} onClick={() => setOpen(false)}>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-primary text-sm" : "text-[15px]"
                  }
                  to={link.url}
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className='account flex items-center gap-5'>
          <div
            className="relative"
            onMouseEnter={() => setUserDropdownVisible(true)}
            onMouseLeave={() => setUserDropdownVisible(false)}
          >
            <Link to="/LoginAuth">
              <button>
                <BiUser size={22} color="#0b1dcc" />
              </button>
            </Link>

            {userDropdownVisible && (
              <div className="absolute top-8 left-0 bg-white border shadow-lg py-2 px-4 rounded-lg z-10" style={{ width: 'auto', minWidth: '100px' }}>
                <Link to="/SignupAuth" className="block text-blue-500 hover:underline">
                  Sign in
                </Link>
              </div>
            )}
          </div>

          <Link to="/LoginAuth">
            <DropdownButton />
          </Link>

          <button className='open-menu' onClick={() => setOpen(!open)}>
            <HiOutlineMenuAlt1 size={25} />
          </button>
        </div>
      </div>
    </header>
  );
};