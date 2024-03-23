import React, { useState }from 'react'
import { NavLink } from 'react-router-dom';
import Student_icon from "../images/student_icon.png"
import Parent_icon from "../images/parent_icon.png"

function Card_select_user() {
    const [obj, setObj] = useState([
        {
          text: "นักเรียน",
          imageUrl: Student_icon, // แทนที่ด้วย URL รูปภาพจริง
          path: "/Student_menu"
        },
        {
          text: "ผู้ปกครอง",
          imageUrl: Parent_icon, // แทนที่ด้วย URL รูปภาพจริง
          path: "/Parent_menu"
        }
      ]);

      function handleClick() {
        console.log('Link clicked!');
      }
    
      return (
        <div className="card-container">
          {obj.map((item, index) => (
            <div key={index} className="card-menu"style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
              <NavLink to={item.path} onClick={handleClick}>
              <img src={item.imageUrl} className="card-img-top" alt={item.text} /></NavLink>
              <div className="card-body">
                <p className="card-text"style={{ textAlign: 'center' }}>{item.text}</p>
              </div>
              {/* </NavLink> */}
            </div>
          ))}
        </div>
      );
}

export default Card_select_user