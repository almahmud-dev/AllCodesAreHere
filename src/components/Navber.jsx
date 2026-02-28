import React, { useState } from 'react';
import { FiShoppingBag, FiSearch, FiChevronDown } from "react-icons/fi";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiMenu3Fill } from "react-icons/ri"; // menu Icon
import { RxCross2 } from "react-icons/rx";    // Close Icon

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative">
      <div className="container flex items-center justify-between py-8">
        {/* Logo */}
        <div className="nav_logo max-w-48">
          <img src="" alt="Logo" />
        </div>

        {/* Desktop Navigation Menu (hidden on mobile) */}
        <ul className="nav_menu hidden lg:flex items-center gap-x-6">
          {["Home", "Courses", "Blog", "Shop", "Pages", "Events"].map((item, index) => (
            <li key={index} className="group">
              <a href="#" className={`flex items-center gap-1 ${index === 0 ? 'text-primary' : ''}`}>
                {item} <FiChevronDown className="nav_menu_icon" />
              </a>
            </li>
          ))}
        </ul>

        {/* Icons & Buttons Section (Desktop) */}
        <div className="hidden lg:flex items-center gap-x-7">
          <div className="nav_search text-2xl flex items-center gap-x-7">
            <FiShoppingBag className="icon" />
            <FaRegCircleUser className="icon" />
            <FiSearch className="icon" />
          </div>
          <div className="nav_btn capitalize font-medium font-saira text-xl flex items-center">
            <button className="login py-5 px-9 underline">login</button>
            <button className="signup py-5 px-9 font-saira bg-linear-to-br from-[#083f9b] to-[#7f56d9] text-white rounded-lg">
              signup
            </button>
          </div>
        </div>

        {/* Mobile Menu Icon (Visible on sm/md) */}
        <div className="lg:hidden text-3xl cursor-pointer" onClick={() => setIsOpen(true)}>
          <RiMenu3Fill />
        </div>
      </div>

      {/* --- Mobile Sidebar Overlay --- */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-all duration-500 ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        
        {/* Background Blur Overlay (পেছনের ঝাপসা অংশ) */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500" 
          onClick={() => setIsOpen(false)}
        ></div>

        {/* মেনু স্লাইডার ডিভ (Sidebar Content) */}
        <div className={`relative h-full w-[70%] bg-linear-to-br from-[#0f3460] via-[#5b21b6] to-[#8b5cf6] p-10 flex flex-col gap-8 font-saira shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"}`}>
          
          {/* ক্লোজ আইকন - এটি ট্যাপ করলে সামান্য ঘুরবে */}
          <div className="flex justify-end">
              <RxCross2 
                className={`text-white text-4xl cursor-pointer transition-all duration-500 ease-in-out hover:rotate-180 hover:scale-125 active:scale-90`} 
                onClick={() => setIsOpen(false)} 
              />
          </div>

          {/* Menu Links */}
          <ul className="flex flex-col gap-6">
            {["Home", "About", "Service", "Careers", "Contact"].map((link) => (
              <li key={link} className="border-b border-white/20 pb-4">
                <a 
                  href="#" 
                  className="text-white font-saira font-medium text-3xl block"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;