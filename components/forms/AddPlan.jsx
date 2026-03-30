"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addHandler,
  editHandler,
  getPlans,
} from "../../redux/slices/plansSlice";

const AddPlan = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { plans, selectedPlan } = useSelector((state) => state.plans);
  const isEditMode = Boolean(id);
  const [form, setForm] = useState({
    plan_name: "",
    plan_duration: "",
    amount: "",
  });

  //Values handler
  const valuesHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.plan_name || !form.plan_duration || !form.amount) {
      alert("All fields required");
      return;
    }
    try {
      if (isEditMode) {
        await dispatch(
          editHandler({
            id,
            form,
          }),
        ).unwrap();
        alert("Plan Updated Successfully");
      } else {
        await dispatch(addHandler(form));
        alert("Plan Added Successfully");
      }

      router.push("/plans");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isEditMode && plans.length > 0) {
      const plan = plans.find((p) => p._id == id);

      if (plan) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm({
          plan_name: "",
          plan_duration: "",
          amount: "",
        });
      }
    }
  }, [id, plans, isEditMode]);

  useEffect(() => {
    if (!plans.length) {
      dispatch(getPlans());
    }
  }, []);

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 ">
          {isEditMode ? "Update Plan" : "Add Plan"}
        </h3>
        <Link
          href="/plans"
          className="px-4 py-2 text-sm font-medium text-slate-700
                     border border-slate-300 rounded-md
                     hover:bg-slate-100 transition"
        >
          Back to Plans
        </Link>
      </div>
      <form onSubmit={submitHandler}>
        {/* GRID LAYOUT */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Plan Name
            </label>
            <input
              type="text"
              name="plan_name"
              value={form.plan_name}
              onChange={valuesHandler}
              placeholder="Enter plan name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Plan Duration
            </label>
            <input
              type="text"
              name="plan_duration"
              value={form.plan_duration}
              onChange={valuesHandler}
              placeholder="Enter plan duration"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={valuesHandler}
              placeholder="Enter amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
        </div>

        {/* Button (Bottom Right) */}
        <div className="md:col-span-3 flex justify-end pt-4">
          <button
            type="submit"
            className={`px-4 py-2.5 rounded-lg font-medium text-white ${"bg-blue-600 hover:bg-blue-700"}`}
          >
            {isEditMode ? "Update Plan" : "Save Plan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPlan;
