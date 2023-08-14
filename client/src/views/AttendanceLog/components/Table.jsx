import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Table() {
  const [data, setData] = useState(null);
  console.log(data);
  const token = localStorage.getItem("token");
  const nav = useNavigate();
  if (!localStorage.token) {
    nav("/");
  }
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
      //   console.log(res);
      setData(res?.data?.attendanceHistory);
    } catch (error) {}
  };
  useEffect(() => {
    userAttandance();
  }, []);

  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    clockIn
                  </th>
                  <th scope="col" className="px-6 py-4">
                    clockOut
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ontime
                  </th>
                  <th scope="col" className="px-6 py-4">
                    lateClockin
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Absent
                  </th>
                </tr>
              </thead>
              {data?.map((e, key) => {
                return (
                  <tbody key={key}>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4">{e?.date}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.clockIn}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.clockOut}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.ontime === 1 ? "Yes" : "No"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.lateClockin === 1 ? "Yes" : "No"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.lateClockin === 1 ? "Yes" : "No"}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
