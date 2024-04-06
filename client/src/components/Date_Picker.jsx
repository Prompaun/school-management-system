import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th"; // the locale you want
registerLocale("th", th); // register it with the name you want
import 'react-datepicker/dist/react-datepicker.css';

function Date_Picker({ value, onChange }) {
    // Check if the provided value is a valid Date object
    
    // const initialValue = value instanceof Date && !isNaN(value.getTime()) ? value : new Date();

    // if (!Number.isNaN(initialValue.getDate()) && !Number.isNaN(initialValue.getMonth() + 1) && !Number.isNaN(initialValue.getFullYear())) {
    //     console.log("Initial value:", initialValue);
    // } else {
    //     console.log("Invalid date value:", value);
    // }

    let initialValue;
    if (value instanceof Date && !isNaN(value.getTime())) {
        initialValue = value; // ถ้ารูปแบบวันที่ถูกต้องแล้วให้ใช้ค่าวันที่ของ value
        // console.log("initialValue:", value);
    } else {
        initialValue = new Date(); // ถ้ารูปแบบวันที่ไม่ถูกต้อง ให้ใช้ new Date()
    }
    
    // const dateString = "29/02/2024"; // วันที่ในรูปแบบ "วัน/เดือน/ปี"

    // const parts = dateString.split("/");
    // const day = parseInt(parts[0], 10); // แปลงเป็นตัวเลขและกำหนดเป็นวัน
    // const month = parseInt(parts[1], 10) - 1; // แปลงเป็นตัวเลขและกำหนดเป็นเดือน
    // const year = parseInt(parts[2], 10); // แปลงเป็นตัวเลขและกำหนดเป็นปี
    
    // // สร้าง Date object จากส่วนของวันที่ที่แยกไว้
    // const date = new Date(year, month, day);

    
    // console.log("ABBBBB",date); // Output: "Fri Feb 29 2024 00:00:00 GMT+0700 (Indochina Time)"


    

    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        if (value !== ''){
           setStartDate(value); 
        }
        else{
            setStartDate(new Date());
        }
        
    }, [value]); // เฝ้าดูการเปลี่ยนแปลงของ value และอัพเดต startDate เมื่อ value เปลี่ยน

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1949 }, (_, index) => 1950 + index);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <DatePicker
            className='form-control form-control-solid w-full '
            style={{ fontFamily: 'Kanit, sans-serif' }}
            locale="th"
            dateFormat="dd/MM/yyyy"
            renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
            }) => (
                <div class="h-screen flex flex-col justify-left sm:flex-row">
                    <div class="sm:w-1_3 sm:pr-3">
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
            selected={startDate}
            onChange={(date) => {
                setStartDate(date);
                onChange(date);
            }}
        />
    );
}

export default Date_Picker;
