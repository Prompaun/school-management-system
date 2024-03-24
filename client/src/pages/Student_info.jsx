import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import printer_icon from "../images/printer_icon.png";
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar'
import Header from '../components/Header';
import Parent_Information from './Parent_Information';
import Student_Address from './Student_Address'
import Student_Information from './Student_Information';
const Student_info = () => {

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

    const location = useLocation();
    const SearchParams = new URLSearchParams(location.search);
    const studentID_param = SearchParams.get("id");
    const namme_param = SearchParams.get("name");

    useEffect(() => {
        if (studentID_param && namme_param) {
            console.log("id:", studentID_param);
        }
    }, []);

    return (
        <>
           

            <Header header="ระบบจัดการข้อมูลส่วนบุคคล" subhead="" />  
             
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
                                            
            <div class="card" style={{width: 'auto', height: 'auto'}}>
                <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" href="#menu1" style={{fontFamily: 'Kanit, sans-serif' }}>ข้อมูลนักเรียน</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#menu2" style={{fontFamily: 'Kanit, sans-serif' }}>ที่อยู่ตามทะเบียนบ้าน</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" href="#menu3" style={{fontFamily: 'Kanit, sans-serif' }}>ข้อมูลผู้ปกครอง</a>
                    </li>
                </ul>
            </div>
            <div class="card-body" > 
                <div class="tab-content">
                    <div class="tab-pane container active" id="menu1" ><Student_Information studentID_prop={studentID_param} /></div>
                    <div class="tab-pane container fade" id="menu2"><Student_Address studentID_prop={studentID_param} /></div>
                    <div class="tab-pane container fade" id="menu3"><Parent_Information studentID_prop={studentID_param} /></div>
                </div>
            </div>
            </div>
                                    
                                    <br />
                                {/* <Link to="/Student_List_Information"> */}
                                    {/* <button type="submit" class="btn btn-primary float-end" style={{ ...fontStyle, fontSize: '16px', textAlign: 'right'}}><span>ย้อนกลับ</span></button> */}
                                    <button
                                        type="button"
                                        className="btn btn-primary float-end"
                                        style={{ ...fontStyle, fontSize: '16px', textAlign: 'right' }}
                                        onClick={() => {
                                            window.history.back();
                                        }}
                                        >
                                        <span>ย้อนกลับ</span>
                                    </button>
                                {/* </Link> */}
                                    
                                    </div>
                                </div>              
                                
                                
                                </div>
                                </div>
                           
                       
                    </div>
                </div>
            </div>
              

        </>
    );
};

export default Student_info;
