import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../images/IMG_5416.png';

import Header from '../components/Header';
import Card_menu_personnel from '../components/Card_menu_personnel'

function Personnel_menu({Role}) {
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
      console.log("Role",Role)
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
                  <Link to='/Login' style={{ ...linkStyle, fontFamily: 'Kanit, sans-serif' }}>Log out</Link>
                  </span>
                </div>
               
              </div>
            </nav> */}
            
          <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับบุคลากรภายในโรงเรียน"/>

          <br></br>
          <div style={{height: "100vh"}}>
          <div className="container mt-5">
            <div className="d-flex align-items-center justify-content-center">
              <h2 className="ms-3 mb-0">บริการข้อมูลสำหรับบุคลากร</h2>
            </div>
          </div>
          <br></br>
          <br></br>
          <Card_menu_personnel Role={Role}/> 
          </div>
          </>
          )
}

export default Personnel_menu