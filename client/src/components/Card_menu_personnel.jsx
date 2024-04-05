import React, { useState }from 'react'
import {Dropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import enrollment_icon from "../images/enrollment_icon.png"
import student_icon from "../images/student_icon.png"
import health_icon from "../images/health_icon.png"
import Request_cert from "../images/request_cert.png"
import analyze from "../images/analyze.png"
import Postnews from "../images/promotion.png"
import ClassRoom from "../images/ClassRoom.jpg"

// import enrollment_icon from "../images/enrollment_icon.png"
// import check_status_enroll from "../images/check_status_enroll.png"

function Card_menu_personnel({user, Role}) {

    // const [ClassifyRole,setClassifyRole] = useState([
    //   // {Email:"ClassTeacher@gmail.com",Role:"ClassTeacher"},
    //   // {Email:"SubjectTeacher@gmail.com",Role:"SubjectTeacher"},
    //   // {Email:"DepartTeacher@gmail.com",Role:"Administrative"},
    //   {Email:"AdminTeacher@gmail.com",Role:"Administrator"},

    // ])
    const [obj, setObj] = useState([
        {
          text: "ระบบจัดการสารสนเทศ",
          subtext:"ค้นหาข้อมูลนักเรียน",
          imageUrl: analyze, // แทนที่ด้วย URL รูปภาพจริง
          path: "/Filter_student_information"
        },
        {
          text: "ระบบจัดการข้อมูลการศึกษา",
          subtext:"บันทึกคะแนนรายวิชา",
          imageUrl: student_icon, // แทนที่ด้วย URL รูปภาพจริง
          path: "/Subject_Score_Record"
        },
        // {
        //   text: "ระบบจัดการข้อมูลสุขภาพ",
        //   imageUrl: health_icon, // แทนที่ด้วย URL รูปภาพจริง
        //   path: "/Manage_health_data"
        // },
        {
          text: "ระบบจัดการออกใบรับรอง",
          subtext:"ตรวจสอบคำขอใบรับรอง",
          imageUrl: Request_cert, // แทนที่ด้วย URL รูปภาพจริง
          path: "/Check_Certification_Request"
        },
        {
          text: "ข่าวประชาสัมพันธ์",
          imageUrl: Postnews, // แทนที่ด้วย URL รูปภาพจริง
          path: "/PostNews"
        },
        {
          text: "จัดการห้องเรียนของนักเรียน",
          subtext: "ตามปีการศึกษา",
          imageUrl: ClassRoom, // แทนที่ด้วย URL รูปภาพจริง
          path: "/ManageStudentClass"
        },
        {
          text: "ระบบการรับสมัครนักเรียนใหม่",
          subtext: "จัดการข้อมูลนักเรียน",
          imageUrl: enrollment_icon,
          // path: "/Enrollment_Student",
          dropdown: [
            { text: "ตรวจสอบข้อมูลผู้สมัคร", path: "/Check_Applicant_Information" },
            { text: "จัดการช่วงวันที่เปิดรับสมัคร", path: "/OpenCourse_period" },
            { text: "จัดการเลขประจำตัวนักเรียนใหม่", path: "/AddStudentID" },
            // { text: "อัปโหลดผลคะแนนการสอบ", path: "/Upload_applicant_scores" },
            // { text: "ผลคะแนนการสอบรายบุคคล", path: "/Admission_Results" },
            // { text: "อัปโหลดสถานะการมอบตัว", path: "/Upload_Enrollment_Status" },
            // { text: "สถานะการมอบตัวรายบุคคล", path: "/Enrollment_Status" },

          ],
        },
       
      ]);

      const filteredRole = obj.filter((item) => {
       
          if (Role === 'ClassTeacher'){
            return item.text === "ระบบจัดการสารสนเทศ" || item.text === "ระบบจัดการข้อมูลการศึกษา";
            }
          if (Role === 'SubjectTeacher'){
            return item.text === "ระบบจัดการข้อมูลการศึกษา";
            }
          if (Role === 'Administrative'){
            return item.text === "ระบบจัดการออกใบรับรอง" || item.text === "ข่าวประชาสัมพันธ์" || item.text === "ระบบการรับสมัครนักเรียนใหม่";
            }
          if (Role === 'Administrator'){
            return item.text;
            }
       
        return true;
            
        });
    function handleClick() {
        console.log('Link clicked!');
      }
    
      return (
      

        <div className="d-flex align-items-center justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', fontFamily: 'Kanit, sans-serif'}}>
          {filteredRole.map((item, index) => (
            <div key={index} className="card-menu" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
              <NavLink to={item.path} style={{ color: 'black', textDecoration: 'none' }}>
              <div className="card-body justify-content-center text-center">
                <p className="card-text mt-3" style={{ textAlign: 'center', margin: "5px", fontWeight:"bold",fontSize:"20px"}}>{item.text}</p>
                <p className="card-text" style={{ textAlign: 'center', marginTop: "2px",fontSize:"18px"}}>{item.subtext}</p>
                <img src={item.imageUrl} className="card-img-top mt-2" alt={item.text} style={{ width:"70%", height: 'auto', alignItems: 'center', objectFit: 'cover' }} />
              </div>
              </NavLink>
              {item.dropdown && (
                  <Dropdown>
                   <Dropdown.Toggle variant="success" id="dropdown-basic"style={{ width: "100%", padding: "10px" }}>
                     Menu
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                     {item.dropdown.map((subItem, subIndex) => (
                       <Dropdown.Item key={subIndex} as={NavLink} to={subItem.path} style={{color: "black" }}>
                         {subItem.text}
                       </Dropdown.Item>
                     ))}
                   </Dropdown.Menu>
               </Dropdown>
                )}
            </div>
          ))}
        </div>
      );
}

export default Card_menu_personnel