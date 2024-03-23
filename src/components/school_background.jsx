import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const school_background = () => {
  const linkStyle = {
    color: 'gray',      // สีของข้อความ
    textDecoration: 'none'  // ไม่มีเส้นใต้
  };

  const containerStyle = {
    position: 'relative', // เพื่อให้สามารถใส่คำว่า "ระบบ" ลงในภาพได้
    overflow: 'hidden', // ป้องกันข้อความเลื่อนออกนอกพื้นที่ของ container
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
    filter: 'brightness(25%)', // ปรับโทนสีของภาพให้เป็นสีดำ
  };

  return (
    <>
      <div style={containerStyle}>
        {/* <img src="src\images\school_bg.png" alt="School Background" width="1216" height="400" style={imageStyle}/> */}
        <img src="src\images\school_bg.png" alt="School Background" width="1899" height="480" style={imageStyle}/>
        <div style={textOverlayStyle}>ระบบจัดการสารสนเทศ</div>
      </div>
    </>
);
}

export default school_background