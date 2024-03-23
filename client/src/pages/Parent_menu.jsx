import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../images/IMG_5416.png';
import Header from '../components/Header';
import Card_menu_parent from '../components/Card_menu_parent';

function Parent_menu() {
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
              <Link to='/Login/login_student' style={{ ...linkStyle, fontFamily: 'Kanit, sans-serif' }}>หน้าแรก</Link>
              </span>
            </div>
            
          </div>
        </nav> */}
        
      <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับผู้ปกครอง"/>
      
      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <h2 className="ms-3 mb-0">บริการข้อมูลสำหรับผู้ปกครอง</h2>
        </div>
      </div>
      <br></br>
      <br></br>
      <Card_menu_parent  /> 
      <br></br>
      <br></br>
      </>
      )
}

export default Parent_menu