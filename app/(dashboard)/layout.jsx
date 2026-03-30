"use client"

import React from "react";
import Sidebar from "../../components/layout/Sidebar";
import AppHeader from "../../components/layout/AppHeader";

const layout = ({ children }) => {
  return (
    <div>
      <div className="flex h-screen overflow-hidden">
        
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          <AppHeader />

          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default layout;
