import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
const Enrollment_Status = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    //   const handleSelectYearChange = (event) => {
    //     setSelectedYear(event.target.value);
    //   };
      
    //   const yearsList = ["2566", "2565", "2564", "2563", "2562", "2561", "2560"];
    //   const [selectedYear, setSelectedYear] = useState();

    // const [selectedYear, setSelectedYear] = useState("เลือกปีการศึกษา");
    // const [selectedSemester, setSelectedSemester] = useState("เลือกภาคการศึกษา");
    // const [selectedSubject, setSelectedSubject] = useState("เลือกวิชา");
    // const [selectedRoom, setSelectedRoom] = useState("เลือกห้อง");

    const [selectedOption, setSelectedOption] = useState('เลือกหลักสูตร');
    
    // const handleSelectYearChange = (event) => {
    //   setSelectedYear(event.target.value);
    //   // ตั้งค่าให้ดรอปดาวน์ "ภาคการศึกษา" เป็นค่าเริ่มต้น
    //   setSelectedSemester("เลือกภาคการศึกษา");
    //   setSelectedSubject("เลือกวิชา");
    //   setSelectedRoom("เลือกห้อง");
    // };
    
    // const handleSelectSemesterChange = (event) => {
    //   setSelectedSemester(event.target.value);
    //   setSelectedSubject("เลือกวิชา");
    //   setSelectedRoom("เลือกห้อง");
    // };
    
    // const handleSelectSubjectChange = (event) => {
    //   setSelectedSubject(event.target.value);
    //   setSelectedRoom("เลือกห้อง");
    // };
    
    // const handleSelectRoomChange = (event) => {
    //   setSelectedRoom(event.target.value);
    // };

    useEffect(() => {
        // ตั้งค่าค่าเริ่มต้นของ dropdown เมื่อหน้าจอถูก refresh
        setSelectedOption('เลือกหลักสูตร');
    }, []); // ใช้ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวหลังจากการ render แรก

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const [data, setData] = useState([
        {
            enrollments: [
            { id: 'XX-XXXX', Applicants_first_name: 'เด็กหญิงฐิตานันนท์', Applicants_last_name: 'สดใส', status: 'มอบตัวสำเร็จ'},
            { id: 'XX-XXXX', Applicants_first_name: 'เด็กหญิงชาตรี', Applicants_last_name: 'อาทิตย์', status: 'มอบตัวสำเร็จ'},
            { id: 'XX-XXXX', Applicants_first_name: 'เด็กหญิงดวง', Applicants_last_name: 'จันทร์', status: 'ไม่มามอบตัว'},
            // เพิ่มข้อมูลผลการเรียนตามต้องการ
            ],
        },
        ]);


    return (
        <>        

            <Header header="ระบบการรับสมัครนักเรียน" subhead="อัปโหลดสถานะการมอบตัว" />  
            <div style={{height:"150vh",fontFamily:"Kanit, sans-serif"}}>
            <div className="container"> 
            <div className="flex-column"> 
                <div className="justify-content-center"> 
                       
                <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                            <h2 className="card-heading"style={{ fontSize: '25px', fontWeight: 'bold'}}>อัปโหลดสถานะการมอบตัว</h2>
                        </div>
                    
                    <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                        
                        <div className="card"  style={{width: "100vw"}}>
                            
                            <div className="card-body">
                                <div className="form-group col-md-0 fone" style={{ padding: '10px'}}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                    <div className="d-flex align-items-center">
                                    <span style={{margin:"10px"}}>หลักสูตร :</span>
                                    </div>
                                        <div className="d-flex align-items-center">
                                        <div className="dropdown" style={{ maxWidth: '100%',marginRight:"5px"}}>

                                        <select value={selectedOption} onChange={handleSelectChange} className="custom-select">
                                            <option value="หลักสูตร">เลือกหลักสูตร</option>
                                            <option value="English Program (EP)">English Program (EP)</option>
                                            <option value="Regular Program">Regular Program</option>
                                        </select>
                                    </div>

                                    </div>

                                    <div className="align-items-center">
                                            <button type="submit" class="btn btn-primary" style={{ ...fontStyle, color: 'white', fontSize: '18px', textAlign: 'right', marginTop: '1px',marginRight:"5px"}}><span>Export file</span></button>
                                            </div>
                                   
                                        <div className="align-items-center">
                                        <h2 className="card-heading" style={{ fontSize: '18px', marginTop: '10px',marginRight:"5px" }}>/ Update data</h2>
                                        </div>
                                        <div className="align-items-center">
                                        <button type="submit" class="btn btn-primary" style={{ ...fontStyle, color: 'white', fontSize: '18px', textAlign: 'right', marginTop: '1px',marginRight:"5px"}}><span>
                                        <i 
                                            class="fs-5 bi-cloud-upload" 
                                            style={{
                                            color: 'white',
                                            fontSize: '20px',
                                            marginRight: '5px',
                                            cursor: 'pointer' // เพิ่ม cursor: 'pointer' เพื่อแสดงว่าเป็นองค์ประกอบที่คลิกได้
                                            }}
                                        ></i>Upload file</span>
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <h2 className="card-heading" style={{ fontSize: '16px', marginLeft: '20px', marginTop: '2px' }}>ตัวอย่างไฟล์ที่อัปโหลด</h2>
                                </div>
                                
                                <div className="container flex-column align-items-center">
                            {/* <table className="table-bordered" style={{ textAlign: 'center',fontFamily: 'Kanit, sans-serif'}}> */}
                            <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-striped table-bordered table-hover" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif', fontSize: '18px' }}>
                                            <thead>
                                                <tr>
                                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ลำดับที่</th>
                                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ชื่อ-นามสกุล</th>
                                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>สถานะการมอบตัว</th>
                                                </tr>
                                            </thead>
                                            {/* #32CD32 */}
                                            <tbody>
                                                {data[0].enrollments.map((enrollment) => (
                                                    <tr key={enrollment.id} style={{ height: '100px' }}>
                                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{enrollment.id}</td>
                                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{enrollment.Applicants_first_name + "  " + enrollment.Applicants_last_name}</td>
                                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px'}}>{enrollment.status}</td>
                                                        {/* <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px', color: '#32CD32', fontWeight: 'bold' }}>{enrollment.status}</td> */}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                </div>
                                <br />
                                <Link to="/">
                                    <button type="Submit" class="btn btn-primary float-end" style={{ ...fontStyle, color: 'white', fontSize: '16px', textAlign: 'right'}}><span>Submit</span></button>
                                </Link>

                                </div>
                            </div>
                        </div>
                            
                        <br /><br />
                        <br /><br />
                        
                    </div>
                </div>
            </div>
        </div>
        
           
     
        </>
    );
};

export default Enrollment_Status;
