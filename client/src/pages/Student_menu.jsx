import React, { useState, useEffect } from 'react';
import Card_menu_student from '../components/Card_menu_student';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../images/IMG_5416.png';
import Header from '../components/Header';


function Student_menu() {
  const linkStyle = {
    color: 'gray',
    textDecoration: 'none'
  };

  const location = useLocation();
  const [StudentID_login, setStudentID_login] = useState("");

  useEffect(() => {
    if (location.state && location.state.studentId) {
      const studentId = location.state.studentId;
      setStudentID_login(studentId);
      // console.log('studentId',studentId);
  }
}, []);
  
      return (
        <>
        {/* <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
            
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={logoImage} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                <h5 style={{ textAlign: 'right', marginLeft: '10px', marginBottom: '0' }}>โรงเรียนฤทธิยะวรรณาลัย (ประถม)</h5>
              </div>
            </Link>
            <div className="nav navbar-nav navbar-right">
              <span className='nav-link' style={{fontFamily: 'Kanit, sans-serif'}}>
                <Link to='/Login/login_student' style={linkStyle}>หน้าแรก</Link>
              </span>
           </div>
          </div>
        </nav> */}
       
      <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับนักเรียน"/>
      <br></br>
      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <h2 className="ms-3 mb-0">บริการข้อมูลสำหรับนักเรียน</h2>
        </div>
      </div>
      <br></br>
      <br></br>
      {/* <Card_menu_student studentID_prop={StudentID_login}/>  */}
      <Card_menu_student /> 
      <br></br>
      <br></br>

      </>
      )
}

export default Student_menu