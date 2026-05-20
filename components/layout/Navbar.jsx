import React from "react";
import Link from "next/link";
import Image from "next/image";
const Navbar = () => {
  return (
    <div>
      <header>
        <nav className="w-full fixed left-0 top-0 z-50 backdrop-blur-2xl border-b border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link href= "#">
          <Image src= "/web_logo.png" alt="FitFlow Logo" width={210} height={50} className="bg-transparent"/>
          </Link>
          <div className="hidden lg:flex gap-10 text-md text-slate-300">
            <Link href="#features">Features</Link>
            <Link href="#how-to-use">How To Use</Link>
            <Link href="#about">About</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="#testimonials">Testimonials</Link>
            <Link href="#contact">Contact</Link>
          </div>
          <Link href= "/login" className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 shadow-2xl">
            Login / Sign Up
          </Link>
        </div>
      </nav>
      </header>
    </div>
  );
};

export default Navbar;
