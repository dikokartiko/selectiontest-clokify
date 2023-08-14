import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Table() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const payMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Agustus",
    "Seprtember",
    "October",
    "November",
    "December",
  ];
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
        `http://localhost:8000/payroll/report/${user?.userId}/2023-01-01/2023-12-12`,
        headers
      );
      console.log(res);
      setData(res?.data);
    } catch (error) {}
  };

  const userData = async () => {
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get("http://localhost:8000/auth/", headers);
      setUser(response?.data?.user);
    } catch (error) {}
  };

  useEffect(() => {
    userData();
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
                    Month
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Gross Salary
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Total Deduction
                  </th>
                  <th scope="col" className="px-6 py-4">
                    lateDeductions
                  </th>
                  <th scope="col" className="px-6 py-4">
                    earlyClockoutDeductions
                  </th>
                  <th scope="col" className="px-6 py-4">
                    netSalary
                  </th>
                </tr>
              </thead>
              {data?.map((e, key) => {
                return (
                  <tbody key={key}>
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4">
                        {payMonth[e?.month]}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.netSalary}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.deductions}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.lateDeductions}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.earlyDeductions}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {e?.netSalary}
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
