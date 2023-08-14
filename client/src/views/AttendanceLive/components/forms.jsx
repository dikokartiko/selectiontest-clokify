import { React, useState, useEffect } from "react";
import dateFormat from "dateformat";
import axios from "axios";
import { toast } from "react-toastify";

function FormsAttendance() {
  const [data, setData] = useState(null);
  const [userSchedule, setuserSchedule] = useState(null);

  const token = localStorage.getItem("token");
  const FormatCurrentTime = () => {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };

  const getCurrentDate = () => {
    return dateFormat(new Date(), "dddd, dS mmmm yyyy");
  };

  const getScheduleDate = () => {
    return dateFormat(new Date(), "dS mmmm yyyy");
  };

  const [currentTime, setCurrentTime] = useState(FormatCurrentTime);
  const [currentDate, setCurrentDate] = useState(getCurrentDate);
  const [scheduleDate, setScheduleDate] = useState(getScheduleDate);

  const days = currentDate.split(",")[0];

  const userData = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get("http://localhost:8000/auth/", headers);
      setData(response?.data?.user);
    } catch (error) {}
  };

  const userDataSchedule = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const getUserSchedule = await axios.get(
        `http://localhost:8000/schedule/?userId=${data?.userId}&day=${days}`,
        headers
      );

      setuserSchedule(getUserSchedule?.data?.schedules[0]);
    } catch (error) {}
  };

  const handleClockIn = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    try {
      const response = await axios.post(
        "http://localhost:8000/attendance/clock-in",
        { time },
        headers
      );
      toast.success("Clock in successful!");
      window.location.reload(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  const handleClockOut = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;
    try {
      const response = await axios.post(
        "http://localhost:8000/attendance/clock-out",
        { time },
        headers
      );
      toast.success("Clock Out successful!");
      window.location.reload(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    if (data) {
      userDataSchedule();
    }
    setInterval(() => setCurrentTime(FormatCurrentTime), 1000); //in milisecond
    setInterval(() => setCurrentDate(getCurrentDate), 10000000); //in milisecond
    setInterval(() => setScheduleDate(getScheduleDate), 10000000); //in milisecond
  }, [data]);

  return (
    <div className="custom-attendance-live">
      <div className="attendance-live-head">
        <p className="font-semibold">{currentTime}</p>
        <small className="font-medium">{currentDate}</small>
      </div>
      <div className="attendance-live-body">
        <small className="font-medium">Schedule, {scheduleDate}</small>
        <p className="font-semibold">{data?.fullname}</p>
        {userSchedule ? (
          <p className="font-semibold">
            {userSchedule?.clockIn} - {userSchedule?.clockOut}
          </p>
        ) : (
          <p className="font-semibold">no Schedule</p>
        )}

        <div className="custom-input">
          <div className="card-item-custom mt-4">
            <button className="text-sm buttonClockIn" onClick={handleClockIn}>
              Clock In
            </button>
            <button className="text-sm buttonClockOut" onClick={handleClockOut}>
              Clock Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormsAttendance;
