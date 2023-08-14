import React from "react";
import FormAttendance from "./components/forms";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Index() {
  const [attandance, setAttandance] = useState(null);
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  if (!localStorage.token) {
    nav("/");
  }
  const handleLogout = () => {
    localStorage.removeItem("token");
    nav("/");
  };

  const userAttandance = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await axios.get(
        `http://localhost:8000/attendance/history?sortOrder=desc&orderBy=attendanceId`,
        headers
      );
      setAttandance(res?.data?.attendanceHistory[0]);
    } catch (error) {}
  };
  useEffect(() => {
    userAttandance();
  }, []);

  return (
    <div className="attendanceLive">
      <div className="mb-6 items-center justify-between">
        <button
          onClick={handleLogout}
          type="button"
          data-te-ripple-init
          data-te-ripple-color="light"
          class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
          Back to home
        </button>
      </div>
      <div className="mb-6 items-center justify-between">
        <Link to="/attandance-Salary">
          <button
            type="button"
            data-te-ripple-init
            data-te-ripple-color="light"
            class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
            Check Salary
          </button>
        </Link>
      </div>
      <FormAttendance></FormAttendance>
      <div>
        <p className="font-semibold mb-4">Attendance Log</p>
        <div className="card-item-custom">
          {!attandance ? (
            ""
          ) : (
            <div className="card-item-custom">
              <div>
                <p className="font-semibold">{attandance?.clockIn}</p>
                <small className="font-medium">{attandance?.date}</small>
              </div>
              <div>
                <p className="font-semibold">Clock In</p>
              </div>
            </div>
          )}
          {!attandance?.clockOut ? (
            ""
          ) : (
            <div className="card-item-custom">
              <div>
                <p className="font-semibold">{attandance?.clockOut}</p>
                <small className="font-medium">{attandance?.date}</small>
              </div>
              <div>
                <p className="font-semibold">Clock Out</p>
              </div>
            </div>
          )}
          <div className="details-log">
            <Link to="/attandance-log">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
