import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col gap-4 justify-center items-center h-screen w-screen">
      <div className="absolute top-0 z-50 left-0 w-full bg-[#2b3541] text-white font-bold flex justify-between items-center px-8 py-4">
        <button onClick={() => navigate("/")}>Home</button>
        <button onClick={() => navigate("/sign-in")}>Login</button>
      </div>
      <Outlet />
    </div>
  );
}