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
        
        
      <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับผู้ปกครอง"/>
      <div style={{height: "100vh"}}>
      <div className="container mt-5">
        <div className="d-flex align-items-center justify-content-center">
          <h2 className="ms-3 mb-0">บริการข้อมูลสำหรับผู้ปกครอง</h2>
        </div>
        </div>
      <br></br>
      <br></br>
      <Card_menu_parent  /> 
      </div>
      </>
      )
}

export default Parent_menu