import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import printer_icon from "../images/printer_icon.png";
import search_icon from "../images/search_icon.png";
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar'
import Header from '../components/Header';
import axios from 'axios';

const Student_List_Information = () => {

    const [Data, setData] = useState([{ subjects: [] }]);

    const location = useLocation();

    useEffect(() => {
        
        if (location.state && location.state.result) {
            const result = location.state.result;
            setData([{ subjects: result }]);
        }
    }, []);

    // ตรวจสอบ Data ก่อนที่จะทำการแสดงผลหรือทำอย่างอื่น
    console.log(Data);

    // console.log("yourData",location.state.result);

    

    // async function getPersonnelStudentInfo(Student_ID) {
    //     try {
    //         const response = await axios.get('http://localhost:8080/personnel-get-student-info', {
    //             params: {
    //                 Student_ID: Student_ID
    //             }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.log('Error fetching StudentInfo From Classroom:', error);
    //         // throw error;
    //         return null;
    //     }
    // }

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
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

    
    
    // const [Data, setData] = useState([
    //     {
    //         year: 'ปีการศึกษา 2566 ภาคการศึกษาที่ 1',
    //         subjects: [
    //         { Student_ID: '6301012630095', NameTitle: 'เด็กหญิง', FirstName: 'นทณรรณ', LastName: 'ฝันดี'},
    //         { Student_ID: '6301012630133', NameTitle: 'เด็กหญิง', FirstName: 'พรหมพร', LastName: 'จุ๊บจิ๊บ'},
    //         { Student_ID: '6301012610000', NameTitle: 'เด็กหญิง', FirstName: 'ตั้งใจเรียน', LastName: 'เรียนดี'},
    //         // เพิ่มข้อมูลผลการเรียนตามต้องการ
    //         ],
    //     },
    // ]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const result = await getPersonnelStudentInfo(StudentID);
    //             // เช็คว่าถ้า result ไม่ใช่ null ให้ใช้ค่า result แต่ถ้าเป็น null ให้ใช้วัตถุที่ว่างเปล่า
    //             const StudentInfo = result !== null; 
    //             // const StudentInfo = result !== null ? result : {}; 
    //           console.log("StudentInfo",StudentInfo);
    //         //   setData({subjects: [StudentInfo]});
    //           setData([{
    //             subjects: [StudentInfo]}
    //           ]);
              
    //         } catch (error) {
    //           console.log('Error fetching StudentInfo:', error);
    //         }
    //       }
    //     fetchData();
    //   }, []);

    return (
        <>
           
            <Header header="ระบบจัดการสารสนเทศ" subhead="" />  
    
        <div className="container"style={{height:"100vh"}}> 
            <div className="flex-column"> 
                <div className="justify-content-center"> 
                    {/* <div className="card" style={{border: '1px solid white',maxWidth:"100%"}}> */}
                
                    <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                        <div className="d-flex align-items-center">
                            <h2 className="card-heading" style={{ fontSize: '25px', fontWeight: 'bold',padding:"10px"}}>ผลการค้นหา</h2>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <Link to="/Filter_student_information">
                                <button type="submit" className="btn btn-primary" style={{ ...fontStyle, color: 'white', textAlign: 'center',padding:"10px"}}><span>ค้นหาข้อมูลใหม่</span></button>
                            </Link>
                        </div>
                        </div>
                    <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>

                        <div className="card" style={{width: "100vw"}}>
                            <div className="card-body">
                                <div className="form-group col-md-0 fone">
                                    <div className="d-flex align-items-center">
                                        <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px',padding:"10px" }}>ข้อมูลรายชื่อ</h2>
                                    </div>


                                
                                <br />
                                <div className="container align-items-center">
                                        {/* <table className="table-bordered" style={{ textAlign: 'center',fontFamily: 'Kanit, sans-serif'}}> */}
                                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                                        <div className="table-responsive">
                                        <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#FFFFFF', fontWeight: 'bolder',fontSize:"18px",height: '50px'}}>
                                                    <th rowSpan="1" >เลขประจำตัวนักเรียน</th>
                                                    <th rowSpan="1" >ชื่อ-สกุล</th>
                                                    <th rowSpan="1" >ข้อมูลส่วนบุคคล</th>
                                                    <th rowSpan="1" >ข้อมูลการศึกษา</th>
                                                    <th rowSpan="1" >ข้อมูลสุขภาพ</th>
                                                </tr>

                                                {/* <tr>
                                                    <th colSpan="1" style={{ backgroundColor: '#FFFFFF', fontWeight: 'normal' }}>ดูข้อมูลส่วนบุคคล</th>
                                                    <th colSpan="1" style={{ backgroundColor: '#FFFFFF', fontWeight: 'normal' }}>พิมพ์ข้อมูล</th>
                                                    <th colSpan="1" style={{ backgroundColor: '#FFFFFF', fontWeight: 'normal' }}>ดูข้อมูลการศึกษา</th>
                                                    <th colSpan="1" style={{ backgroundColor: '#FFFFFF', fontWeight: 'normal' }}>พิมพ์ข้อมูล</th>
                                                    <th colSpan="1" style={{ backgroundColor: '#FFFFFF', fontWeight: 'normal' }}>ดูข้อมูลสุขภาพ</th>
                                                    <th colSpan="1" style={{ backgroundColor: '#FFFFFF', fontWeight: 'normal' }}>พิมพ์ข้อมูล</th>
                                                </tr> */}
                                            </thead>

                                            <tbody>
                                                {Data[0]?.subjects.map((subject,index) => (
                                                    <tr key={index} style={{ height: "50px" }}>
                                                    <td style={{ backgroundColor: "#FFFFFF" }}>{subject.Student_ID}</td>
                                                    <td style={{ backgroundColor: "#FFFFFF" }}>
                                                        {subject.NameTitle}{subject.FirstName} {subject.LastName}
                                                    </td>
                                                    <td>                                             
                                                        <Link 
                                                            to={ `/Student_info?id=${subject.Student_ID}&name=${subject.NameTitle}${subject.FirstName} ${subject.LastName}`}
                                                            className="d-flex justify-content-center" 
                                                            style={{ textDecoration: 'none', ...fontStyle }}
                                                        >
                                                            <i 
                                                                className="fs-5 bi-search" 
                                                                style={{ 
                                                                    color: "black", 
                                                                    fontSize: "20px", 
                                                                    marginRight: "5px", 
                                                                    cursor: "pointer"
                                                                     }}>
                                                            </i>
                                                            <span style={{ ...fontStyle, color: "black", fontSize: "16px" }}>
                                                                ดูข้อมูลส่วนบุคคล
                                                            </span>
                                                        </Link>
                                                    </td>

                                                    {/* <td style={{ backgroundColor: "#FFFFFF" }}>
                                                        <i
                                                        className="fs-5 bi-printer"
                                                        style={{
                                                            color: "black",
                                                            fontSize: "20px",
                                                            marginRight: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                            const printWindow = window.open(fileUrl, "_blank", "width=1000,height=800");
                                                            printWindow.print();
                                                        }}
                                                        ></i>
                                                    </td> */}

                                                <td>
                                                    <Link 
                                                        to={ `/Education_information?id=${subject.Student_ID}&name=${subject.NameTitle}${subject.FirstName} ${subject.LastName}`}
                                                        className="d-flex justify-content-center" 
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        <i
                                                            className="fs-5 bi-search"
                                                            style={{
                                                                color: "black",
                                                                fontSize: "20px",
                                                                marginRight: "5px",
                                                                cursor: "pointer",
                                                            }}
                                                        ></i>
                                                        <span style={{ ...fontStyle, color: "black", fontSize: "16px" }}>ดูข้อมูลการศึกษา</span>
                                                    </Link>
                                                </td>
                                                    {/* <td style={{ backgroundColor: "#FFFFFF" }}>
                                                        <i
                                                        className="fs-5 bi-printer"
                                                        style={{
                                                            color: "black",
                                                            fontSize: "20px",
                                                            marginRight: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                            const printWindow = window.open(fileUrl, "_blank", "width=1000,height=800");
                                                            printWindow.print();
                                                        }}
                                                        ></i>
                                                    </td> */}

                                                    <td >
                                                        {/* <Link to="/Health_info" className="d-flex justify-content-center" style={{ textDecoration: 'none' }}> */}
                                                        <Link 
                                                            to={ `/Health_info?id=${subject.Student_ID}&name=${subject.NameTitle}${subject.FirstName} ${subject.LastName}`}
                                                            className="d-flex justify-content-center" 
                                                            style={{ textDecoration: 'none' }}
                                                        >
                                                        <i
                                                            className="fs-5 bi-search"
                                                            style={{
                                                            color: "black",
                                                            fontSize: "20px",
                                                            marginRight: "5px",
                                                            cursor: "pointer",
                                                            }}
                                                        ></i>
                                                        <span style={{ ...fontStyle, color: "black", fontSize: "16px" }}>ดูข้อมูลสุขภาพ</span>
                                                        </Link>
                                                    </td>
                                                    {/* <td style={{ backgroundColor: "#FFFFFF" }}>
                                                        <i
                                                        className="fs-5 bi-printer"
                                                        style={{
                                                            color: "black",
                                                            fontSize: "20px",
                                                            marginRight: "5px",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                            const printWindow = window.open(fileUrl, "_blank", "width=1000,height=800");
                                                            printWindow.print();
                                                        }}
                                                        ></i>
                                                    </td> */}
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            <br />
                                    </div>
                                    </div>
                                    
                                    </div>
                                
                                {/* <br />
                                <Link to="/Filter_student_information">
                                    <button type="submit" className="btn btn-primary float-end" style={{ ...fontStyle, color: 'white', fontSize: '16px', textAlign: 'right'}}><span>ย้อนกลับ</span></button>
                                </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                
            </div>
         
            {/* </div> */}
        </div> 
    </div> 
        </>
    );
};

export default Student_List_Information;
