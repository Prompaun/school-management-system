import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

const Card_role_login = () => {
    const [obj, setObj] = useState([
        {
          text: "นักเรียน",
          imageUrl: "src/images/student_icon.png", // แทนที่ด้วย URL รูปภาพจริง
          path: "/Login/Login_student"
        },
        {
          text: "ผู้ปกครองและบุคลากร",
          // imageUrl: "src/images/parent_icon.png", // แทนที่ด้วย URL รูปภาพจริง
          imageUrl: "src/images/teacher_icon.png", // แทนที่ด้วย URL รูปภาพจริง

          path: "/Login/Login_parent_personnel"
        },
        // {
        //   text: "บุคลากร",
        //   imageUrl: "src/images/teacher_icon.png", // แทนที่ด้วย URL รูปภาพจริง
        //   path: "/Login_personnel"
        // }
      ]);

      function handleClick() {
        console.log('Link clicked!');
      }
    
      return (
        <div className="d-flex align-items-center justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', fontFamily: 'Kanit, sans-serif'}}>
          {obj.map((item, index) => (
            
            <div key={index} className="card-menu" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
               <div className="card-body">
                <p className="card-text mt-3" style={{ textAlign: 'center',margin: "5px" }}>{item.text}</p>
              </div>
              <NavLink to={item.path} onClick={handleClick}>
              
              <img src={item.imageUrl} className="card-img-top" alt={item.text} style={{ width: '100%', height: 'auto', alignSelf: 'center', objectFit: 'cover' }} />
              
              </NavLink>
            </div>
          ))}
        </div>
       
      );
}

export default Card_role_login;