import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Checkgrade_icon from "../images/check_grade.png"

function Card_menu_student(props) {
    // const [StudentID_login, setStudentID_login] = useState("");
    const [obj, setObj] = useState([
        {
          text: "ระบบตรวจสอบผลการเรียน",
          imageUrl: Checkgrade_icon, // แทนที่ด้วย URL รูปภาพจริง
          // path: `/Checkgrade?id=${props.studentID_prop}`
        }
      ]);
      
    // useEffect(() => {
    //   setStudentID_login("ID1");
    //   if (props.studentID_prop) {
    //       setStudentID_login("ID1");
    //       console.log(props.studentID_prop);
    //   }
    // }, []);
    // console.log(props.studentID_prop);

    function handleClick() {
        console.log('Link clicked!');
        // navigate("/Student_menu", { state: { studentId: props.studentID_prop} });
      }
    
      return (
        <div className="d-flex align-items-center justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', fontFamily: 'Kanit, sans-serif'}}>
          {obj.map((item, index) => (
            
            <div key={index} className="card-menu" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
               <div className="card-body">
                <p className="card-text mt-3" style={{ textAlign: 'center',margin: "5px" }}>{item.text}</p>
              </div>
              {/* <NavLink to={`/Checkgrade?id=${props.studentID_prop}`} onClick={handleClick}> */}
              <NavLink to={`/Checkgrade`} onClick={handleClick}>
              
              <img src={item.imageUrl} className="card-img-top" alt={item.text} style={{ width: '100%', height: 'auto', alignSelf: 'center', objectFit: 'cover' }} />
              
              </NavLink>
              {/* <NavLink to={{ }} onClick={handleClick}>
                  <img src={item.imageUrl} className="card-img-top" alt={item.text} style={{ width: '100%', height: 'auto', alignSelf: 'center', objectFit: 'cover' }} />
              </NavLink> */}
            </div>
          ))}
        </div>
        
      );
}

export default Card_menu_student

