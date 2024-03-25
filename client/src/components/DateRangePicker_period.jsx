import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th"; // the locale you want
registerLocale("th", th); // register it with the name you want
import 'react-datepicker/dist/react-datepicker.css';

function DateRangePicker_period() {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1989 }, (_, index) => 1990 + index);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const customInputCSS = {
    width:"auto",
    border: '1px solid #ccc',
  };
  return (
    <DatePicker
      className='form-control form-control-bold w-full '
      style={{ fontFamily: 'Kanit, sans-serif'}}
      locale="th"
      dateFormat="dd/MM/yyyy"
      selectsRange
      startDate={startDate}
      endDate={endDate}
      onChange={([start, end]) => {
        setStartDate(start);
        setEndDate(end);
      }}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="h-screen flex flex-col justify-left sm:flex-row">
          <div className="sm:w-1_3 sm:pr-3">
            <div
              style={{
                margin: 10,
                display: "flex",
                justifyContent: "center",
                fontFamily: 'Kanit, sans-serif'
              }}
            >
              <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                {"<"}
              </button>
              <select
                value={date.getFullYear()}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={months[date.getMonth()]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                {">"}
              </button>
            </div>
          </div>
        </div>
      )}
      customInput={<input style={customInputCSS} />}
    />
  );
}

export default DateRangePicker_period;