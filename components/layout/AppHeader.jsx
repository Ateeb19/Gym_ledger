"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedout } from "../../redux/slices/authSlice";

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //Log out handler
  const logoutHandler = async() => {
    // Implement logout logic here (e.g., clear auth tokens, redirect to login page)
    try {
      dispatch(loggedout()).unwrap();
      alert("Logged out successfully");
      router.push("/login");
    } catch (error) {
      console.error(error.message || "Logout Failed");
    }
    
  }

  return (
    <div className="px-6 py-4 flex items-center justify-between md:justify-end">
      <nav className="flex justify-end items-center relative" ref={dropdownRef}>
        
        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 border border-gray-300">
            SA
          </div>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-48 bg-white border border-gray-300 rounded-lg shadow-md z-50">
            
            <div className="px-4 py-3 border-b border-gray-300">
              <p className="text-sm font-medium text-gray-800">Super Admin</p>
              <p className="text-xs text-gray-500">admin@gymledger.com</p>
            </div>

            <div className="py-2">
              <Link
                href="/profile"
                onClick= {() => setOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile Information
              </Link>

              <button onClick={() => logoutHandler()} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                Logout
              </button>
            </div>

          </div>
        )}
      </nav>
    </div>
  );
};

export default AppHeader;