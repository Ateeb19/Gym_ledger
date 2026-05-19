"use client"

import Link from "next/link";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPayments } from "../../redux/slices/paymentSlice";
import { useEffect } from "react";

const PaymentList = () => {
const dispatch = useDispatch();
  const {payments, loading} = useSelector((state) => state.payments)

  useEffect(() => {
    dispatch(getPayments()).unwrap();
  }, [dispatch])
  
  
  return (
   <div>
      <h3 className="text-xl font-semibold mb-4">Payments History</h3>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4">
        <div className="w-full sm:max-w-sm">
          <input
            type="text"
            className="w-full border border-slate-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            name="search"
            placeholder="Search by member name..."
          />
        </div>
        <div className="w-full sm:max-w-max ml-auto">
          <Link href="/payment/add-payment"  className="px-4 py-2 text-white rounded-md hover:bg-blue-700 transition"
              style={{ backgroundColor: "#22C55E" }}>
           
              Add paymnent
          
          </Link>
        </div>
      </div>

    

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-slate-500 font-medium">
              <th className="px-6 py-3">Member</th>
              <th className="px-6 py-3">Plan</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Payment Date</th>
              <th className="px-6 py-3">Membership Expiry Date</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-6 text-center text-slate-500"
                >
                  Loading payments...
                </td>
              </tr>
            ) : payments?.length > 0 ? (
              payments?.map((payment) => (
                <tr
                  className="hover:bg-slate-50 transition cursor-pointer"
                  key={payment.payment_id}
                >
                  <td
                    
                    className="px-6 py-4 text-slate-600"
                  >
                    {payment?.full_name ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {payment?.amount ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {payment?.payment_mode ?? "-"}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {payment?.payment_date ?? "-"}
                  </td>
                 
                  <td className="px-6 py-4 text-slate-600">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        payment.status === 1
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status === 1 ? "Completed" : "Incomplete"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                    
                      className="text-slate-600 hover:text-brand-primary font-medium z-10"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 cursor-pointer font-medium z-10">
                      View
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
                  No payments to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentList;
