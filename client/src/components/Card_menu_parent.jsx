import React, { useState }from 'react'
import { NavLink } from 'react-router-dom';
import Checkgrade_icon from "../images/check_grade.png"
import Request_cert from "../images/request_cert.png"
import History_request_icon from "../images/history_request.png"
import health_icon from "../images/health_icon.png"
import enrollment_icon from "../images/enrollment_icon.png"
import check_status_enroll from "../images/check_status_enroll.png"

function Card_menu_parent({Role}) {
  const [ClassifyRole,setClassifyRole] = useState([
    // {Email:"NewParent@gmail.com",Role:"NewParent"},
    {Email:"Parent@gmail.com",Role:"Parent"},

  ])
    const [obj, setObj] = useState([
      {
        text: "สมัครเข้าเรียน",
        imageUrl: enrollment_icon, // แทนที่ด้วย URL รูปภาพจริง
        path: "/Open_course"
      },
      {
          text: "ตรวจสอบสถานะผู้สมัคร",
          imageUrl: check_status_enroll, // แทนที่ด้วย URL รูปภาพจริง
          path: "/CheckEnroll_status"
        },
        {
          text: "ระบบตรวจสอบผลการเรียน",
          imageUrl: Checkgrade_icon, // แทนที่ด้วย URL รูปภาพจริง
          path: "/Checkgrade_info"
        },
        {
            text: "ระบบยื่นคำร้องขอใบรับรอง",
            imageUrl: Request_cert, // แทนที่ด้วย URL รูปภาพจริง
            path: "/Request_cert"
          },
          {
            text: "ตรวจสอบการขอใบรับรอง",
            imageUrl: History_request_icon, // แทนที่ด้วย URL รูปภาพจริง
            path: "/History_request"
          },
          {
            text: "ระบบข้อมูลสุขภาพของนักเรียน",
            imageUrl: health_icon, // แทนที่ด้วย URL รูปภาพจริง
            path: "/Health_result"
          },
          
      ]);

      const filteredRole = obj.filter((item) => {
       
        // if (ClassifyRole[0].Role === 'NewParent'){
        //   return item.text === "สมัครเข้าเรียน" || item.text === "ตรวจสอบสถานะผู้สมัคร";
        //   }
        // if (ClassifyRole[0].Role === 'Parent'){
        //   return item.text;
        //   }
        console.log("Role",Role)
        if (Role === 'NewParent'){
          return item.text === "สมัครเข้าเรียน" || item.text === "ตรวจสอบสถานะผู้สมัคร";
          }
        if (Role === 'Parent'){
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
             
            <div key={index} className="card-menu" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)', alignItems: 'center' }}>
              <NavLink to={item.path} style={{ color: 'black', textDecoration: 'none' }}>
              <div className="card-body justify-content-center text-center">
                <p className="card-text mt-3"style={{ textAlign: 'center', margin: "10px", fontWeight:"bold",fontSize:"20px"}}>{item.text}</p>
                <img src={item.imageUrl} className="card-img-top mt-2" alt={item.text} style={{ width:"80%", height: 'auto', alignItems: 'center', objectFit: 'cover' }} />
              </div>
            
              
              </NavLink>
            </div>
            
          ))}
        </div>
        
      );
}

export default Card_menu_parent