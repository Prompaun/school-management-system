import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
const Register_info = () => {
  
  // เพิ่ม state สำหรับเก็บข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    username: '',
    FirstName: '',
    LastName: '',
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

  return (
    <>
      {/* <Navbar/> */}
      <Header header="ระบบลงทะเบียนสำหรับเข้าใช้เว็บไซต์" subhead=""/>
      {/* เพิ่มฟอร์มการลงทะเบียน */}
      {/* <div className="container mt-5"> */}
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h2 className="ms-3 mb-0 mt-5">สร้างบัญชีผู้ใช้งาน</h2>
       
        
       {/* เพิ่มแท็ก <br /> เพื่อสร้างการเว้นบรรทัด */}
       
        <div className="card mt-5"style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)',maxWidth: '90%',Height: '100vh' }}>
  <div className="card-body">
    {/* width: '100vw', // 100vw คือ 100% ของความกว้างของ viewport
            maxHeight: '100vh', */}
    <form onSubmit={handleSubmit} className="w-100">
      <div className="mb-3">
        {/* <label htmlFor="username" className="form-label custom-font">เลขประจำตัวประชาชน (ผู้สมัครเข้าศึกษา): </label> */}
        <label htmlFor="email" className="form-label custom-font">อีเมล : </label>
        <input
          type="text"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="FirstName" className="form-label custom-font">ชื่อ : </label>
        <input
          type="FirstName"
          className="form-control"
          id="FirstName"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="LastName" className="form-label custom-font">นามสกุล : </label>
        <input
          type="LastName"
          className="form-control"
          id="LastName"
          name="LastName"
          value={formData.LastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="button" className="btn btn-primary custom-font" style={{  fontFamily: 'Kanit, sans-serif',width:"100%", justifyContent:"center"}}>
        <Link to="/NewUser_menu" style={{ color: 'white', textDecoration: 'none',justifyContent:"center" }}>
          สมัครบัญชี
        </Link>
    </button>
    </form>
  </div>
</div>
</div>
<br></br>
<br></br>

    </>
  );
}


{/* <div className="list-group">
  <h2 className="list-group-item list-group-item-action active">เข้าสู่ระบบ</h2>
  <form onSubmit={handleSubmit}>

      <label htmlFor="username" className="form-label me-3">Username: </label>
      <input
        type="text"
        className="form-control w-50"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        required
      />

      <label htmlFor="password" className="form-label me-3">Password: </label>
      <input
        type="password"
        className="form-control w-50"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        required
      />


      <button type="submit" className="btn btn-primary float-end">Log-in</button>

  </form>
</div> */}

export default Register_info;
