import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Link ,useNavigate} from 'react-router-dom';
import DateRangePicker_period from '../components/DateRangePicker_period';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";

function OpenCourse_period() {
  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };
    const [selectedCourse, setSelectedCourse] = useState('ทั้งหมด');

    const handleSelectCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        };
        
        const handleSubmitPeriod = (event) => {
          if (CheckInputDataPeriod()) {
              console.log("DateRange",DateRange);

          //   navigate("/");
              // setShowLoadingModal(true);
              // setShowSuccessModal(true);
          }
      
          return true;
        };
        const [DateRange,setDateRange] =useState(['', '']);
        const handleDateRangeChange = ([start, end]) => {
          
          setDateRange([start, end]);

        };
        const CheckInputDataPeriod = () => {
          if (DateRange.some((date) => date === '' || date === null)) {
            alert("กรุณาเลือกช่วงการเปิดรับสมัครให้ครบถ้วน");
            return false;
          }
          return true;
        }



        const [CourseData, setCourseData] = useState([
          {id:1, course: "หลักสูตรทั่วไป", DateStart: "30/03/2024",DateEnd:"02/05/2024"},
          {id:2, course: "English Program (EP)", DateStart: "12/03/2567",DateEnd:"17/04/2567"},
      
      ]);
      // const [obj,setObj] = useState([
      //     {
      //         course: "ประกาศรับสมัครนักเรียนใหม่",
      //         content: "รับสมัครนักเรียนใหม่ แผนการเรียน English Program (EP)",
      //         link:"",
      //         DateTime : "12-10-2565"
      //     },
      //     {
      //         course: "ระเบียบการลงทะเบียนสำหรับผู้ใช้ใหม่",
      //         content: "ขั้นตอนการลงทะเบียนเข้าสู่ระบบ",
      //         link:"https://shorturl.at/xDVZ6",
      //         DateTime : "12-10-2565"
      //     }
      //   ]);
      
    
      
  return (
    <>
    <Header header="ระบบการรับสมัครนักเรียน" subhead="จัดการช่วงการเปิดรับสมัครตามหลักสูตร" /> 
    <div
        style={{
          height: "100vh",
          fontFamily: "Kanit, sans-serif",
        }}
      >
        <div className="container">
          <div className="flex-column">
            <div className="justify-content-center">
              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ margin:"10px",fontSize: "25px", fontWeight: "bold" }}>
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
                        {/* </div>
                        <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px',marginTop:"5px"}}> */}
                        <div>
                            <span style={{fontWeight:"bold",fontSize:"20px",margin:"10px"}}>เลือกช่วงในการเปิดรับสมัคร</span>
                            </div>
                            {/* </div>  
                            <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px',marginTop:"5px"}}> */}
                        {/* <DateRangePicker_period/> */}
                        
                            <div className="align-items-center">
                            <DateRangePicker_period  id="DateRange "value={DateRange} onChange={handleDateRangeChange}/>
                            </div>
                       
                        <button 
                            type="submit" 
                            className="btn btn-primary custom-font" 
                            style={{
                                color: 'white',
                                fontSize: '16px',
                                textAlign: 'center',
                                marginLeft: 'auto'
                              }}
                            onClick={handleSubmitPeriod}
                      >
                          <span>บันทึก</span>
                      </button>
                      
                        </div>
                        </div>
                        </div>
                        </div>
                        {/* <div className="d-flex align-items-center"style={{ flexWrap: "wrap" ,marginTop:"20px"}}>
                        <span style={{ margin:"10px",fontWeight: "bold", fontSize: "25px" }}>โพสต์ประกาศหน้าหลักสูตร</span>
                      </div>
                        <div className="card" style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)",marginTop:"20px" }}>
                  <div className="card-body">
                        <div className="d-flex align-items-center"style={{ flexWrap: "wrap" }}>
                        <span style={{ margin: "10px", fontWeight: "bold", fontSize: "20px" }}>เนื้อหาประกาศ</span>
                      </div>

                      <div className="d-flex align-items-center" style={{flexWrap: "wrap" }}>
                      <textarea
                            type="text"
                            className="form-control"
                            id="course"
                            name="course"
                            value={Post}
                            onChange={handlePostChange}
                            required
                            ref={PostRef}
                            style={{border: '1px solid #ccc'}}
                            />
                      </div>
                      <br />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>

                          <button 
                              type="submit" 
                              className="btn btn-primary custom-font" 
                              style={{
                              ...fontStyle, 
                              color: 'white', 
                              fontSize: '16px', 
                              textAlign: 'center', 

                              width:"100%"

                              }}
                            onClick={handleSubmitPost}
                          >
                              <span>บันทึก</span>
                          </button>
                       

                      </div>

                    </div>
                  </div> */}
                
                <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
                  ช่วงการเปิดรับสมัครตามหลักสูตร
                </h2>
              </div>
                <br />
              <div className="container align-items-center"style={{marginTop: "20px" }}>
                           
                            <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                                    <thead>
                                        <tr style={{ height: '50px',backgroundColor: '#FFFFFF', fontWeight: 'bold',fontSize:"18px"  }}>
                                            <th rowSpan="1" >หลักสูตรที่</th>
                                            <th rowSpan="1">ชื่อหลักสูตร</th>
                                            <th rowSpan="1" >ช่วงที่เปิดรับสมัคร</th>
                                            {/* <th rowSpan="1" ></th> */}
                                            

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {CourseData.map((row,index) => (
                                            <tr key={row.id} style={{ height: '50px' }}>
                                            <td >{index+1}</td>
                                            <td >
                                                {
                                                row.course
                                                }
                                            </td>
                                            <td>
                                              {row.DateStart} - {row.DateEnd}
                                            </td>
                                            {/* <td >
                                                {
                                                row.DateEnd
                                                }
                                            </td> */}
                                            
                                            
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>
                                
                                <br />
                                
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