"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/slices/authSlice";

const ProfileInformation= () => {
  const dispatch = useDispatch();
  const {data, loading} = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    gym_name: "",
  });

  useEffect(() => {
  if (data) {
    setForm({
      name: data.name || "",
      email: data.email || "",
      contact: data.contact || "",   
      gym_name: data.gym_name || "", 
    });
  }
}, [data]);

useEffect(() => {
  dispatch(userProfile());
}, [dispatch]);


  return (
    <>
      
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Profile Information</h1>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-10">

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-semibold">
            SA
          </div>
          <div>
            <h2 className="text-lg font-semibold">{form.name}</h2>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">

            {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gym Name
            </label>
            <input
              type="text"
              name="gym_name"
             
              placeholder="Enter gym name"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Owner Name
            </label>
            <input
              type="text"
              name="name"
              
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="contact"
           
              placeholder="Enter phone number"
              className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         

          {/* Save Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-md text-white font-medium transition bg-blue-600 "
             
            >
              Save Changes
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default ProfileInformation;