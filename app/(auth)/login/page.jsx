"use client";

import Link from "next/link";
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
    <div>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <div className="w-[90%] md:w-[30%] bg-white px-6 py-8 shadow-md rounded-md">
          <h3 className="font-bold text-2xl mb-2">Login</h3>
          <p className="text-gray-600 mb-6">
            Enter your details below to sign in{" "}
          </p>
          <form action="#" onSubmit={loginHandler}>
            <div>
              <label className="text-md text-gray-800">Email Id</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={valuesHandler}
                placeholder="Enter your email"
                className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="text-md text-gray-800">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={valuesHandler}
                placeholder="Enter your password"
                className="w-full border border-gray-300 text-md p-3 rounded-md mt-1 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer bg-blue-700 text-white p-3 text-center rounded-md mt-6"
            >
              Login
            </button>
            <p className="text-center my-2 text-gray-600">Or</p>
            <p className="text-center text-gray-600">
              New to FitFlow?{" "}
              <Link href="/register" className="text-blue-700">
                
                  Sign Up
               
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
