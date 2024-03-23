import React from 'react'
import School_bg from '../images/school_bg.png';

function Header({header,subhead}) {
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
        width: '100vw', // ข้อความจะไม่ขยายเกินภาพพื้นหลัง
        // whiteSpace: 'nowrap', // ข้อความจะไม่ขึ้นบรรทัดใหม่
      };
    

    const imageStyle = {
        filter: 'brightness(25%)',
    };

  return (
    <>
    <div style={containerStyle}>
    <img
        src={School_bg}
        alt="School Background"
        style={{
            ...imageStyle,
            width: '100vw', // 100vw คือ 100% ของความกว้างของ viewport
            maxHeight: '40vh',  // 40vh คือ 40% ของความสูงของ viewport
            objectFit: 'cover'  // ภาพจะทำการ crop หรือ stretch เพื่อให้เต็มพื้นที่ที่กำหนด
        }}
        />   
    <div style={{...textOverlayStyle}}>
    <h2 style={{ textAlign: 'center',fontWeight: 'bold',fontSize: '56px'}}>{header}</h2>
    <h5 style={{ textAlign: 'center',fontWeight: 'bold',fontSize: '32px' }}>{subhead}</h5>
    </div>
  </div>
  {/* <br/> */}
  </>
  )
}

export default Header