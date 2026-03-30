"use client"

import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPlans } from '../../redux/slices/plansSlice'
import { useParams, useRouter } from 'next/navigation'


const PlansList = () => {
  const params = useParams();
  const router = useRouter()
  const dispatch = useDispatch()
  const { plans, loading } = useSelector((state) => state.plans);

  useEffect(() => {
    dispatch(getPlans());
  }, [dispatch]);


  const deletehandler = async(id) => {
    const confirmDel = window.confirm("Are you sure you want to delete the plan");
    if(!confirmDel) return;
    try {
      await dispatch(deleteById(id)).unwrap();
      alert("Plan deleted successfully")
    } catch (error) {
      alert(error || "Delete failed");
    }
  };

  
 
  

  return (
     <div>
      <h3 className="text-xl font-semibold mb-4">Membership Plans List</h3>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="w-full sm:max-w-sm">
          <input
            type="text"
            className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="search"
            placeholder="Search plans..."
          />
        </div>
        <div className="w-full sm:max-w-max ml-auto">
          <Link href="/plans/add-plan"  className="px-4 py-2 text-white rounded-md hover:bg-blue-700 transition"
              style={{ backgroundColor: "#22C55E" }}>
           
              Add Plan
          
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-slate-500 font-medium">
              <th className="px-6 py-3">Plan Name</th>
              
            
             
              <th className="px-6 py-3">Plan Duration</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

           <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-6 text-center text-slate-500"
                >
                  Loading plans...
                </td>
              </tr>
            ) : plans?.length > 0 ? (
              plans?.map((plan) => (
                <tr
                  className="hover:bg-slate-50 transition cursor-pointer"
                  key={p_id}
                >
                  <td
                    
                    className="px-6 py-4 text-slate-600"
                  >
                    {plan?.plan_name ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {plan?.plan_duration ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {plan?.amount ?? "-"}
                  </td>
                 
                  
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                     onClick={() => router.push(`/members/update-member/${member.id}`)}
                      className="text-slate-600 hover:text-brand-primary font-medium z-10"
                    >
                      Edit
                    </button>
                    <button onClick = {() => deletehandler(member.id)} className="text-red-600 hover:text-red-700 cursor-pointer font-medium z-10">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-6 text-center text-slate-500"
                >
                  No plans to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlansList