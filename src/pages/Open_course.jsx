import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../images/IMG_5416.png';
import Card_menu_course from '../components/Card_menu_course';
import Header from '../components/Header';
function Open_course() {
    const handleGoBack = () => {
        window.history.back();
      };
    
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
     
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
          <span className='nav-link'>
          <Link
                // onClick={handleGoBack}
                to = "/NewUser_menu"
                style={{ ...linkStyle, fontFamily: 'Kanit, sans-serif' }}>
                เลือกเมนู
              </Link>
          </span>
        </div>
      </div>
    </nav> */}
    
  <Header header="ระบบรับสมัครนักเรียนแบบออนไลน์" subhead="เพื่อเข้าศึกษาระดับประถมศึกษาปีที่ 1"/>
  {/* <br></br> */}
  <div className="container mt-5 d-flex flex-column align-items-center">
        <div className="d-flex align-items-center mb-3">
          <h2 className="ms-3 mb-0">หลักสูตรที่เปิดรับสมัคร</h2>
        </div> 
    </div>
    <br></br>
    <div className="d-flex justify-content-center">
        <Card_menu_course/>
        </div>
    <br></br>
    <br></br>

  </>
  )
}

export default Open_course