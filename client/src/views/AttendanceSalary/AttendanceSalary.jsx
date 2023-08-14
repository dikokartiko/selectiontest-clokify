import React from "react";
import dataCards from "./getData/CardsData";
import Table from "./components/Table";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import { Link, useNavigate } from "react-router-dom";
function AttendanceSalary() {
  return (
    <div className="p-4 attendance">
      <div className="mb-4 mt-4 attendanceFilter">
        <Filter></Filter>
      </div>
      <div className="attendanceCards mb-4">
        {dataCards.map((item, key) => {
          return (
            <Cards
              key={key}
              labelCard={item?.labelCard}
              dataCardItem={item?.data}></Cards>
          );
        })}
        <div className="mb-6 items-center justify-between">
          <Link to="/attandance-live">
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              Back to home
            </button>
          </Link>
        </div>
      </div>

      <div className="attendanceTable mt-4">
        <Table></Table>
      </div>
    </div>
  );
}

export default AttendanceSalary;
