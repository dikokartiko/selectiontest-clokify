import React, { useState } from "react";
import CreateUser from "./components/createUser";
import { Link, useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  return (
    <div className="p-4 text-center">
      <p className="text-2xl font-bold mb-4">Welcome !!</p>
      <CreateUser />
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
        Log Out
      </button>
    </div>
  );
};

export default DashboardAdmin;
