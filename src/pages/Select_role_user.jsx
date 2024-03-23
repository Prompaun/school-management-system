import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from '../images/IMG_5416.png';
import Card_select_user from '../components/Card_select_user';
import Header from '../components/Header';
function Select_role_user() {
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
            <Link to='/Login/Login_student' style={linkStyle}>Log out</Link>
          </span>
        </div>
      </div>
    </nav> */}
    
  <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับนักเรียนและผู้ปกครอง"/>
  <br></br>
  <br></br>

  <Card_select_user /> 
  </>
  )
}

export default Select_role_user