import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Link ,useNavigate} from 'react-router-dom';
import DateRangePicker_period from '../components/DateRangePicker_period';


function OpenCourse_period() {
    const [selectedCourse, setSelectedCourse] = useState('ทั้งหมด');

    const handleSelectCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        };

  return (
    <>
    <Header header="ระบบการรับสมัครนักเรียน" subhead="จัดการช่วงเวลารับสมัคร" /> 
    <div
        style={{
          height: "150vh",
          fontFamily: "Kanit, sans-serif",
        }}
      >
        <div className="container">
          <div className="flex-column">
            <div className="justify-content-center">
              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
                  การเปิดรับสมัครตามหลักสูตร
                </h2>
              </div>

              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "20px" }}>
                <div className="card" style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
                  <div className="card-body">
                    <div className="form-group col-md-0 fone" style={{ padding: "10px" }}>
                    <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px',marginTop:"5px"}}>
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",margin:"10px"}}>หลักสูตร</span>
                            </div>
                    <div className="dropdown" style={{ maxWidth: '100%'}}>
                            <select value={selectedCourse} onChange={handleSelectCourseChange}className="custom-select">
                                <option value="ทั้งหมด">ทั้งหมด</option>
                                <option value="English Program (EP)">English Program (EP)</option>
                                <option value="Regular Program">Regular Program</option>
                            </select>
                        </div>
                        <div>
                            <span style={{fontWeight:"bold",fontSize:"20px",margin:"10px"}}>เลือกช่วงเวลาในการเปิดรับสมัคร</span>
                            </div>
                            <div>
                        <DateRangePicker_period/></div>
                        <button 
                        type="submit" 
                        className="btn btn-primary custom-font" 
                        style={{
                            color: 'white',
                            fontSize: '16px',
                            textAlign: 'center',
                            marginLeft: 'auto'
                          }}
                        // onClick={handleButtonSearchData}
                    >
                        <span>บันทึก</span>
                    </button>
                        </div>
                       

                    </div>
                  </div>
                </div>
              </div>



              
              </div>
              </div>
              </div>
              </div>
              </>
  )
}

export default OpenCourse_period