import React, { useState }from 'react'
import { NavLink } from 'react-router-dom';
import general_course_icon from "../images/general_course_icon.png"
import EP_icon from "../images/EP_icon.png"

function Card_menu_course() {
    const [obj, setObj] = useState([
        {
          text: "English Program (EP)",
          imageUrl: EP_icon, // แทนที่ด้วย URL รูปภาพจริง
          path: "/Enrollment_info_EP"
        },
        {
            text: "หลักสูตรทั่วไป",
            imageUrl: general_course_icon, // แทนที่ด้วย URL รูปภาพจริง
            path: "/Enrollment_info"
          }
      ]);
    function handleClick() {
        console.log('Link clicked!');
      }
    
      return (
        <div className="d-flex align-items-center justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', fontFamily: 'Kanit, sans-serif'}}>
          {obj.map((item, index) => (
            
            <div key={index} className="card-menu" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)',alignItems: 'center' }}>
               <div className="card-body">
                <p className="card-text mt-3" style={{ textAlign: 'center',margin: "5px" }}>{item.text}</p>
              </div>
              <NavLink to={item.path} onClick={handleClick}>
              
              <img src={item.imageUrl} className="card-img-top" alt={item.text} style={{ width: '85%', height: 'auto', marginLeft:"20px" }} />
              
              </NavLink>
            </div>
          ))}
        </div>
       
      );
}

export default Card_menu_course