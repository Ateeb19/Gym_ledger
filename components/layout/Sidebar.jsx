"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const linkClass = (path) =>
    `flex items-center px-4 py-2 text-sm font-medium rounded-md text-white hover:bg-blue-600 ${
      pathname === path ? "bg-blue-700" : ""
    }`;

  return (
    <aside
      className="fixed md:static h-full inset-y-0 left-0 flex flex-col w-64 text-white z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0"
      style={{ backgroundColor: "#1E293B" }}
    >
      <div className="flex items-center justify-center h-16 px-4">
        <h2 className="text-2xl font-bold">FitFlow</h2>
      </div>

      <div className="flex flex-col px-4 py-4 overflow-y-auto">
        <nav className="flex-1 space-y-2">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link href="/members" className={linkClass("/members")}>
            Members
          </Link>

          <Link href="/plans" className={linkClass("/dashboard/plans")}>
            Membership Plans
          </Link>

          <Link href="/dashboard/payments" className={linkClass("/dashboard/payments")}>
            Payments
          </Link>

          <Link href="/dashboard/attendance" className={linkClass("/dashboard/attendance")}>
            Attendance
          </Link>

          <Link href="/dashboard/reports" className={linkClass("/dashboard/reports")}>
            Reports
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;