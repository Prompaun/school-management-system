import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import logoImage from '../images/IMG_5416.png';
import Header from '../components/Header';

function  Personnel_page() {
  
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none',
        fontFamily: 'Kanit, sans-serif',
        fontSize: '16px',
      };

    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
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
            <span className="nav-link" style={{ fontFamily: 'Kanit, sans-serif' }}>
              <Link to="/Login_personnel" style={linkStyle}>
                Log out
              </Link>
            </span>
          </div>
        </div>
      </nav> */}

      <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับบุคลากรภายในโรงเรียน" />
      {/* <Sidebar /> */}
      <div className="container-fluid">
        <div className="row flex-nowrap">
            <Sidebar />
            
    <div className="col-md-9">
            {/* <div className="d-flex align-items-center flex-column">
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px',paddingTop: '40px' }}>การจัดการสารสนเทศ</h2>
            </div> */}
                HomePage
            
            </div>
        </div>  
    </div>
    </>
  );
}

export default Personnel_page;
