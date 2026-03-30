"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addHandler,
  editHandler,
  getMembers,
} from "../../redux/slices/membersSlice";

const AddMember = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();
  const { members, selectedMember } = useSelector((state) => state.members);
  const isEditMode = Boolean(id);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    emergency_contact: "",
    height: "",
    weight: "",
    fitness_goal: "",
    personal_training: "",
    assign_trainer: "",
    medical_condition: "",
  });
  const [open, setOpen] = useState(false);
  const [membership, setMembership] = useState({
    type: "",
    amountPaid: "",
    discount: "",
    paymentMode: "",
    startDate: "",
    endDate: "",
  });

  //Values handler
  const valuesHandler = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "personal_training" ? value === "true" : value,
    });
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.contact) {
      alert("All fields required");
      return;
    }
    setOpen(true);
  };

  
  const saveMember = async (e) => {
    e.preventDefault();
   try {
      if (isEditMode) {
        await dispatch(
          editHandler({
            id,
            form,
          }),
        ).unwrap();
        alert("Member Updated Successfully");
      } else {
        await dispatch(addHandler(form));
        setOpen(false)
        alert("Member Added Successfully");
      }
      router.push("/members");
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    if (isEditMode && members.length > 0) {
      const member = members.find((m) => m.id == id);

      if (member) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm({
          name: member.full_name || "",
          email: member.email || "",
          contact: member.contact || "",
          emergency_contact: member.emergency_contact || "",
          height: member.height || "",
          weight: member.weight || "",
          fitness_goal: member.fitness_goal || "",
          personal_training:
            member.personal_training === 1 || member.personal_training === true
              ? "true"
              : "false",
          assign_trainer: member.assign_trainer || "",
          medical_condition: member.medical_condition || "",
        });
      }
    }
  }, [id, members, isEditMode]);

  useEffect(() => {
    if (!members.length) {
      dispatch(getMembers());
    }
  }, []);

  const membershipHandler = (e) => {
    setMembership({
      ...membership,
      [e.target.name]: e.target.value,
    });
  };

  const activatemembership = async (e) => {
    e.preventDefault();

    if (
      !membership.type ||
      !membership.amountPaid ||
      !membership.startDate ||
      !membership.endDate
    ) {
      toast.warning("Please fill the fields");
      return;
    }
    try {
      const memberResponse = await dispatch(addHandler(form));
      const memberId = memberResponse.payload.id;

      dispatch(memberId, ...membership);
      toast.success("Member & Membership added successfully");
      navigate("/members");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 ">
          {isEditMode ? "Update Member" : "Add Member"}
        </h3>
        <Link
          href="/members"
          className="px-4 py-2 text-sm font-medium text-slate-700
                     border border-slate-300 rounded-md
                     hover:bg-slate-100 transition"
        >
          Back to Members
        </Link>
      </div>
      <form onSubmit={submitHandler}>
        {/* GRID LAYOUT */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={valuesHandler}
              placeholder="Enter full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={valuesHandler}
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Contact Number
            </label>
            <input
              type="number"
              name="contact"
              value={form.contact}
              onChange={valuesHandler}
              placeholder="Enter contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Emergency Contact Number
            </label>
            <input
              type="number"
              name="emergency_contact"
              value={form.emergency_contact}
              onChange={valuesHandler}
              placeholder="Enter emergency contact number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Height(cm)
            </label>
            <input
              type="number"
              name="height"
              value={form.height}
              onChange={valuesHandler}
              placeholder="Enter height"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Weight(kg)
            </label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={valuesHandler}
              placeholder="Enter weight"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Fitness Goals
            </label>
            <input
              type="text"
              name="fitness_goal"
              value={form.fitness_goal}
              onChange={valuesHandler}
              placeholder="Enter fitness goals"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Personal Training
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              value={form.personal_training}
              onChange={valuesHandler}
              name="personal_training"
            >
              <option>Please select the option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Assign Trainer
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              value={form.assign_trainer}
              onChange={valuesHandler}
              name="assign_trainer"
            >
              <option>Select the trainer</option>
              <option>James</option>
              <option>Alex</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Medical Conditions(if any)
          </label>
          <textarea
            name="medical_condition"
            value={form.medical_condition}
            onChange={valuesHandler}
            placeholder="Eg : Injury on left shoulder"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
        </div>
        {/* Button (Bottom Right) */}
        <div className="md:col-span-3 flex justify-end pt-4">
          <button
            type="submit"
            className={`px-4 py-2.5 rounded cursor-pointer lg font-medium text-white ${"bg-blue-600 hover:bg-blue-700"}`}
          >
            {isEditMode ? "Update Member" : "Save Member"}
          </button>
        </div>
      </form>

      {/* Modal Overlay */}
     
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          {/* Modal */}
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300">
              <h2 className="text-lg font-semibold text-gray-800">
                Add Membership Details
              </h2>

              <button
                onClick={() => setOpen(false)} 
                className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form className="p-6 space-y-5">
              {/* Membership Type */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Membership Type
                </label>
                <select
                  value={membership.type}
                  onChange={membershipHandler}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                >
                  <option disabled>Select the memebrship type</option>
                  <option>Gold</option>
                  <option>Diamond</option>
                  <option>Platinum</option>
                </select>
              </div>

              {/* Amount Paid */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Amount Paid
                </label>
                <input
                  value={membership.amountPaid}
                  onChange={membershipHandler}
                  type="number"
                  placeholder="Enter amount paid"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Discount Amount (if any)
                </label>
                <input
                  value={membership.discount}
                  onChange={membershipHandler}
                  type="number"
                  placeholder="Enter discount amount"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Mode of Payment
                </label>

                <select
                  value={membership.paymentMode}
                  onChange={membershipHandler}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option>Cash</option>
                  <option>UPI</option>
                  <option>Card</option>
                  <option>Bank Transfer</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Membership Start Date
                  </label>
                  <input
                    value={membership.startDate}
                    onChange={membershipHandler}
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Membership End Date
                  </label>
                  <input
                    value={membership.endDate}
                    onChange={membershipHandler}
                    type="date"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-300">
                <button
                  onClick={saveMember}
                  type="button"
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition cursor-pointer"
                >
                  Do it later
                </button>

                <button
                  onClick={activatemembership}
                  type="submit"
                  className="px-5 py-2 cursor-pointer rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-md"
                >
                  Activate Membership
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMember;
