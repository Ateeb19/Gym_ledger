"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const valuesHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("All fields required");
      return;
    }
    try {
      await dispatch(login(form)).unwrap();
      setForm({
        email: "",
        password: "",
      });
      alert("Login Successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] overflow-hidden relative flex items-center justify-center px-6">

  {/* Background Glow */}
  <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-cyan-500/20 rounded-full blur-[140px]" />
  <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-blue-600/20 rounded-full blur-[140px]" />

  <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-xl overflow-hidden border border-white/10 backdrop-blur-2xl bg-white/[0.03] shadow-[0_20px_80px_rgba(0,0,0,.45)]">

    {/* Left Side Branding */}
    <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-cyan-600/20 via-blue-600/10 to-transparent border-r border-white/10">

      <div>
        <Link href= "/" >
        <Image src= "/web_logo.png" alt="FitFlow Logo" width={210} height={50} className="bg-transparent"/>
        </Link>

         <h2 className="mt-14 text-4xl text-white leading-tight font-bold">
          Run your gym smarter,
          <br />
          not harder.
        </h2>

        <p className="text-lg my-6 text-white leading-7 ">
          Manage memberships, trainers, payments,
          schedules and analytics from one powerful
          platform designed for modern fitness businesses.
        </p>
         <div className="grid grid-cols-3 gap-4">

        <div className="bg-white/15 backdrop-blur-xl rounded-xl p-3">
          <h3 className="text-2xl text-white">
            10K+
          </h3>
          <p className="text-sm text-white">
            Gyms
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-xl rounded-xl p-3">
          <h3 className="text-2xl text-white">
            500K+
          </h3>
          <p className="text-sm text-white">
            Members
          </p>
        </div>

        <div className="bg-white/15 backdrop-blur-xl rounded-xl p-3">
          <h3 className="text-2xl text-white">
            98%
          </h3>
          <p className="text-sm text-white">
            Retention
          </p>
        </div>

      </div>
      </div>

      
     
    </div>

    {/* Right Side Login */}
    <div className="p-8 md:p-14">

      <div className="mb-10">
        <h2 className="text-4xl font-black text-white">
          Welcome Back
        </h2>

        <p className="text-slate-400 mt-3">
          Sign in to continue managing your fitness business
        </p>
      </div>

      <form onSubmit={loginHandler} className="space-y-6">

        <div>
          <label className="text-sm text-slate-300 block mb-2">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={valuesHandler}
            placeholder="john@example.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm text-slate-300">
              Password
            </label>

            <button
              type="button"
              className="text-cyan-400 text-sm"
            >
              Forgot password?
            </button>
          </div>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={valuesHandler}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/20 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-bold text-white cursor-pointer transition"
        >
          Sign In
        </button>

        <p className="text-center text-slate-400">
          New to FitFlow?{" "}
          <Link
            href="/register"
            className="text-cyan-400 font-medium"
          >
            Create Account
          </Link>
        </p>

      </form>

    </div>
  </div>
</div>
  );
};

export default page;
