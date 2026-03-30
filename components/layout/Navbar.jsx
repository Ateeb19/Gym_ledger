import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <div>
      <header>
        <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="logo-wrap">
            {/* <img src="#" /> */}
            <span>Fit Flow</span>
          </div>
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/login">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Login
                </button>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
