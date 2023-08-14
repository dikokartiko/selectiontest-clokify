import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Filter() {
  return (
    <div>
        <DatePicker
          // selected={valueStartDate}
          // onChange={(date) => reportStartDate(date)}
          selectsStart
          // startDate={valueStartDate}
          // endDate={valueEndDate}
          isClearable
          placeholderText="Please pick start date (yyyy/MM/dd)"
          dateFormat="yyyy/MM/dd"
        />
    </div>
  )
}

export default Filter