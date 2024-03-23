import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import printer_icon from "../images/printer_icon.png";
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar'
import Header from '../components/Header';
import Tab_health from '../components/Tab_health';
const Health_info = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        color: 'white',
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [selectedSemester, setSelectedSemester] = useState('เลือกปีการศึกษา');
    const handleSelectChange = (event) => {
        setSelectedSemester(event.target.value);
      };
    
    const [data, setData] = useState([
    {
        year: 'ปีการศึกษา 2566 ภาคการศึกษาที่ 1',
        subjects: [
        { id: '001', name: 'วิชา A', grade: 'A'},
        { id: '002', name: 'วิชา B', grade: 'A'},
        { id: '003', name: 'วิชา C', grade: 'B'},
        // เพิ่มข้อมูลผลการเรียนตามต้องการ
        ],
    },
    ]);

    return (
        <>
          

            <Header header="ระบบจัดการข้อมูลสุขภาพ" subhead="" />  
             
            <div className="container"style={{height:"100vh"}}> 
            <div className="flex-column"> 
                <div className="justify-content-center"> 
           
                <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                        <div className="d-flex align-items-center">
                            <h2 className="card-heading" style={{ fontSize: '25px', fontWeight: 'bold',padding:"10px"}}>ผลการค้นหา</h2>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <Link to="/Filter_student_information">
                                <button type="submit" class="btn btn-primary" style={{ ...fontStyle, color: 'white', textAlign: 'center',padding:"10px"}}><span>ค้นหาข้อมูลใหม่</span></button>
                            </Link>
                        </div>
                        </div>
                    <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>

                        <div className="card" style={{width: "100vw"}}>
                            <div className="card-body">
                                
                                <div className="form-group col-md-0 fone">
                                <div className="d-flex align-items-center"style={{ flexWrap: 'wrap' }}>
                                    <div className="d-flex align-items-center">
                                        <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px',padding:"10px" ,flexWrap: 'wrap'}}>ข้อมูลรายชื่อ</h2>
                                        </div>   
                                        <div className="d-flex align-items-center">    
                                        <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px',padding:"10px",flexWrap: 'wrap' }}>&gt;</h2>
                                        </div>
                                        <div className="d-flex align-items-center">   
                                        <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px',padding:"10px",flexWrap: 'wrap' }}>รายละเอียด</h2>
                                    </div>
                                    </div>
                                    <div className='container d-flex justify-content-end'>
                                                <span
                                                className="btn btn-link float-end"
                                                style={{ color: 'black', textDecoration: 'none', fontFamily: 'Kanit, sans-serif', cursor: 'pointer'}}
                                                onClick={() => {
                                                    const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                    const printWindow = window.open(fileUrl, "_blank", 'width=1000,height=800');
                                                    printWindow.print();
                                                }}
                                                >
                                                พิมพ์ข้อมูล
                                                </span>

                                                <img
                                                    src={printer_icon}  // Replace with the path to your printer icon image
                                                    alt="Printer Icon"
                                                    style={{ width: '25px', height: '25px', cursor: 'pointer',marginTop:"5px" }}
                                                    // onClick={() => {
                                                    //     const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                    //     const printWindow = window.open(fileUrl, "_blank", 'width=1000,height=800');
                                                    //     printWindow.print();
                                                    // }}
                                                />
                                            </div>
          
            </div>
            
            <Tab_health/>   
                                   
                                    
                              
                              
                                <br />
                                <Link to="/Student_List_Information">
                                    <button type="submit" class="btn btn-primary float-end" style={{ ...fontStyle, fontSize: '16px', textAlign: 'right'}}><span>ย้อนกลับ</span></button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                

        </>
    );
};

export default Health_info;
