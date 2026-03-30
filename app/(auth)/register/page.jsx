"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { register } from "../../../redux/slices/authSlice";
import { useRouter } from "next/navigation";
const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({
    gym_name: "",
    name: "",
    email: "",
    contact : "",
    password: "",
    confirmPass: "",
  });

  //Values Handler

  const valueshandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  //Submit Handler

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !form.gym_name ||
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPass
    ) {
      alert("All fields required");
      return;
    }
    if (form.password !== form.confirmPass) {
      alert("Passwords do not match");
      return;
    }
    try {
      await dispatch(register(form)).unwrap();
      alert("Register Successfully");
      router.push("/login");
    } catch (error) {
      console.error(error.message || "Registration Failed");
    }
  };

  return (
    <div>
      <div>
        <div>
          <div className="bg-gray-100 flex justify-center items-center h-screen">
            <div className="w-[90%] md:w-[30%] bg-white px-6 py-8 shadow-md rounded-md">
              <h3 className="font-bold text-2xl mb-2">Register</h3>
              <p className="text-gray-600 mb-6">
                Enter your details below to sign up{" "}
              </p>
              <form action="#" onSubmit={submitHandler}>
                <div>
                  <label className="text-md text-gray-800">Gym Name</label>
                  <input
                    type="text"
                    name="gym_name"
                    value={form.gym_name}
                    onChange={valueshandler}
                    placeholder="Enter the gym name"
                    className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-md text-gray-800">Owner Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={valueshandler}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-md text-gray-800">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={valueshandler}
                    placeholder="Enter your email id"
                    className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-md text-gray-800">Contact Number</label>
                  <input
                    type="number"
                    name="contact"
                    value={form.contact}
                    onChange={valueshandler}
                    placeholder="Enter your contact number"
                    className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-md text-gray-800">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={valueshandler}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-md text-gray-800">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPass"
                    value={form.confirmPass}
                    onChange={valueshandler}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white p-3 text-center rounded-md mt-6"
                >
                  Sign Up
                </button>
                <p className="text-center my-2 text-gray-600">Or</p>
                <p className="text-center text-gray-600">
                  Already using FitFlow?{" "}
                  <Link href="/login" className="text-blue-700">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
