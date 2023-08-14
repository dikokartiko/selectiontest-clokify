import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SignIn from "./views/Auth/SignIn";
import AttendanceLog from "./views/AttendanceLog/AttendanceLog";
import AttendanceLive from "./views/AttendanceLive/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AttendanceSalary from "./views/AttendanceSalary/AttendanceSalary";
import ResetPassword from "./views/Auth/ResetPass";
import DashboardAdmin from "./views/Admindashboard/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/admin-dasboard" element={<DashboardAdmin />} />
        <Route path="/attandance-live" element={<AttendanceLive />} />
        <Route path="/attandance-log" element={<AttendanceLog />} />
        <Route path="/attandance-Salary" element={<AttendanceSalary />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
