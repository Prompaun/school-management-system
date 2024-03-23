import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../images/IMG_5416.png';
import Card_menu_newuser from '../components/Card_menu_newuser';
import Header from '../components/Header';
function NewUser_menu() {
    const handleGoBack = () => {
        window.history.back();
      };
    
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
      
  return (
    <>
    
    
   
  <Header header="ระบบรับสมัครนักเรียนแบบออนไลน์" subhead="เพื่อเข้าศึกษาระดับประถมศึกษาปีที่ 1"/>
  <br></br>
  <br></br>
  <div className="d-flex justify-content-center">
        <Card_menu_newuser/>
      </div>
  </>
  )
}

export default NewUser_menu