import React, { useState,useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import Navbar from "../components/Navbar";
import eye_open from "../images/eye-open.png";
import eye_closed from "../images/eye-closed.png";
import Header from '../components/Header';
import GoogleIMG from '../images/google.png'
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {gapi} from 'gapi-script';

// require("dotenv").config();
const Login_parent = () => {

    const containerStyle = {
        position: 'relative', // เพื่อให้สามารถใส่คำว่า "ระบบ" ลงในภาพได้
        overflow: 'hidden', // ป้องกันข้อความเลื่อนออกนอกพื้นที่ของ container
      };

      const linkStyle = {
        color: 'red',
        textDecoration: 'none',
        fontFamily: 'Kanit, sans-serif',
        fontSize: '16px'
      };
    
      const textOverlayStyle = {
        position: 'absolute',
        top: '50%',           // จัดตำแหน่งตรงกลางด้านบน
        left: '50%',          // จัดตำแหน่งตรงกลางด้านซ้าย
        transform: 'translate(-50%, -50%)', // ย้ายข้อความลงมาจากตรงกลางด้านบนและด้านซ้าย
        color: 'white',       // สีของข้อความ
        fontSize: '28px',     // ขนาดของข้อความ
        fontWeight: 'bold',   // ตัวหนา
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // เงาข้อความ
        textAlign: 'center',
        maxWidth: '100vw', // ข้อความจะไม่ขยายเกินภาพพื้นหลัง
        whiteSpace: 'nowrap', // ข้อความจะไม่ขึ้นบรรทัดใหม่
      };
    

    const imageStyle = {
        filter: 'brightness(25%)',
    };

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

    const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

//   const googleAuth = () => {
//     window.open(
//         `${process.env.REACT_APP_API_URL}/auth/google/callback`,
//         "_self"
//     );
// };
const google = () => {
    window.open("http://localhost:8080/auth/google", "_self");
};

const ClientID = process.env.GOOGLE_CLIENT_ID;
    useEffect(() => {
        const initClient = () => {
        gapi.client.init({
            cliendId: ClientID,
            scope: ''
        })
    }
    gapi.load("client:auth2", initClient)
    },[])

    const onSuccess = () => {
        navigate("/")
    };
    const onFailure = () => {
        alert("Log In failed")
    };

console.log(ClientID,"ClientID")
    return (

        <>
            {/* <Navbar/> */}
            <Header header="ระบบบริการข้อมูล" subhead="สำหรับผู้ปกครองและบุคลากรภายในโรงเรียน"/>

           
        <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height: '100vh'}}>
            <div className="container">
            <div className="card mx-auto mt-3" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' ,maxWidth: '90%'}} >
                <div className="card-body">
                <div style={{ display: 'flex', flexWrap: 'wrap',gap:"10px"}}>
                    
                    <img src={school_logo} alt="Register Image" width="100" height="100" />
                   
                
                <div className="d-flex align-items-center" >
                    <h2 className="col-sm d-flex align-items-center">โรงเรียนฤทธิยะวรรณาลัย (ประถม)</h2>
                </div>
            </div>
            <br></br>
            {/* <form onSubmit={handleSubmit}>
            
                        <div className="mb-3 d-flex" >
                            <div className="d-flex align-items-center">
                                    <label>
                                        <span htmlFor="email" className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '16px' }}>อีเมล :  </span>
                                    </label>
                                </div>
                                
                        </div>
                        <div className="align-items-center" style={{ maxWidth:"100%"}}>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                // required
                            /></div>
                           

                    <div className="mb-3 d-flex align-items-center"style={{ marginTop: '10px'}} >
                            <div className="d-flex align-items-center">
                                <label>
                                    <span htmlFor="password" className="col-form-label me-5" style={{ marginRight: '10px', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>รหัสผ่าน :</span>
                                </label>
                                </div>
                                
                                 </div>
                            <div className="d-flex align-items-center "style={{ maxWidth:"100%"}}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    // required
                                />
                                <button
                                    type="button"
                                    onClick={handleTogglePassword}
                                    style={{
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer',
                                        borderWidth: '1px', // ตั้งค่าขอบ
                                        borderStyle: 'solid', // ตั้งค่ารูปแบบของขอบ
                                        borderColor: '#dcdcdc', // ตั้งค่าสีขอบ
                                        color: 'gray',
                                        borderRadius: '5px', // เพิ่มขอบมนเม็ด
                                        padding: '5px', // ปรับขนาด padding
                                    }}
                                    
                                    >
                                    <img
                                        src={showPassword ? eye_closed : eye_open}
                                        alt={showPassword ? 'ปิดตา' : 'เปิดตา'}
                                        style={{ width: '20px', height: '12px' }} // ปรับขนาดตามที่คุณต้องการ
                                    />
                                </button>
                            </div>
                             */}
                           {/* <br /> */}
                           
                                    {/* <Link to='/Register' style={linkStyle}>ลืมรหัสผ่าน</Link> */}
                               
                                    {/* <Link to="/Parent_menu">
                                        <button type="submit" className="btn btn-primary float-end" style={{fontFamily: 'Kanit, sans-serif', fontSize: '16px'}}>Log in</button>
                                    </Link> */}
                               {/* <br />
                               <br />
                               <div className="d-flex justify-content-center" style={{flexWrap:"wrap",fontSize:"16px"}}>
                                        <span className="d-flex align-items-center">หรือ </span>
                                    
                               </div> */}
                               <div className="d-flex justify-content-center" style={{flexWrap:"wrap"}}>
                               {/* <button className="google_btn" onClick={GoogleLogin} >
                                        <img src={GoogleIMG} alt="google icon" />
                                        <span style={{fontSize:"20px"}}>เข้าสู่ระบบด้วย Google</span>
                                    </button> */}
                                    <GoogleLogin clientId={ClientID} 
                                            buttonText='เข้าสู่ระบบด้วย Google'
                                            onSuccess={onSuccess}
                                            onFailure={onFailure}
                                            cookiePolicy={'single_host_origin'}
                                            isSignedIn={true}
                                    />
                                  
                               </div>
                               
                          
                        {/* </form> */}
                    </div>
                </div>
            </div>

            </div>
        </>
    );
};

export default Login_parent;
