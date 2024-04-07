import React, { useState } from 'react'
import { Link,Navigate} from 'react-router-dom'

import { createBrowserHistory } from "history";
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import GoogleIMG from '../images/google.png'

const Register = () => {
  
  // เพิ่ม state สำหรับเก็บข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // รับค่า input จากฟอร์มและอัปเดต state ตามชื่อ input
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // สร้างฟังก์ชันสำหรับการ submit ฟอร์ม
  const handleSubmit = (event) => {
    event.preventDefault();
    // ทำสิ่งที่คุณต้องการเมื่อกด submit ฟอร์ม
    console.log('Submit Form', formData);
    // เช่น ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือทำการตรวจสอบข้อมูล
  };
  const history = createBrowserHistory();
  const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
    // Add a delay of 2 seconds (you can adjust this as needed)
    if (response.ok) {
      // Redirect to /Register_info page after a successful login
      window.location.href = "/Register_info";
    } else {
      // Handle the error case
      console.error("Failed to log in with Google");
    }
  };
  // const google = async () => {
  //   const response = await fetch("http://localhost:5000/auth/google", {
  //     method: "GET",
  //   });
  
  //   if (response.ok) {
  //     // Redirect to /Register_info page after a successful login
  //     window.location.href = "/Register_info";
  //   } else {
  //     // Handle the error case
  //     console.error("Failed to log in with Google");
  //   }
  // };


  return (
    <>
      {/* <Navbar/> */}
      <Header header="ระบบลงทะเบียนสำหรับเข้าใช้เว็บไซต์" subhead=""/>
      {/* เพิ่มฟอร์มการลงทะเบียน */}
      {/* <div className="container mt-5"> */}
      <div style={{height:"100vh"}}>
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h2 className="ms-3 mb-0 mt-5">สร้างบัญชีผู้ใช้งาน</h2>
       
        
       {/* เพิ่มแท็ก <br /> เพื่อสร้างการเว้นบรรทัด */}
       {/* <div style={{height:"100vh"}}> */}
        <div className="card mt-5"style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)',maxWidth: '90%'}}>
  <div className="card-body"style={{ fontFamily: 'Kanit, sans-serif' }}>
    {/* width: '100vw', // 100vw คือ 100% ของความกว้างของ viewport
            maxHeight: '100vh', */}
    <form onSubmit={handleSubmit} className="w-100">
      <div className="mb-3">
        
        <label htmlFor="email" className="form-label custom-font">อีเมลผู้ปกครอง (สำหรับใช้สร้างบัญชีผู้ใช้งาน): </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          // required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label custom-font">รหัสผ่าน: </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          // required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label custom-font">ยืนยันรหัสผ่าน: </label>
        <input
          type="password"
          className="form-control"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          // required
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button type="button" className="btn btn-primary custom-font" style={{ fontFamily: 'Kanit, sans-serif',width:"100%" }}>
          <Link to="/NewUser_menu" style={{ color: 'white', textDecoration: 'none' }}>
            สมัครบัญชี
          </Link>
        </button>
      </div>
      <br />
      {/* <br /> */}
    <div className="d-flex justify-content-center" style={{flexWrap:"wrap",fontSize:"16px",fontFamily: 'Kanit, sans-serif' }}>
            <span className="d-flex align-items-center">หรือ </span>
        
    </div>
    <div className="d-flex justify-content-center" style={{flexWrap:"wrap",fontSize:"16px",marginTop:"10px",maxWidth:"100%"}}>
    <button className="google_btn" onClick={google} >
        <img src={GoogleIMG} alt="google icon" />
        <span>ลงทะเบียนด้วย Google</span>
      </button>
        
    </div>
    </form>
  </div>
</div>
</div>
</div>

    </>
  );
}



export default Register;
