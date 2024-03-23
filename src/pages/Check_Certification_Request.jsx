import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar'
import Header from '../components/Header';
const Check_Certification_Request = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const [selectedOption, setSelectedOption] = useState('เลือกสถานะคำร้องขอใบรับรอง');

    const [data, setData] = useState([
        {
            requests: [
            { request_date: '27/11/2566', request_number: 'xx-xxxx', certificate_type: 'ปพ.1', note: 'ระบุคะแนนรายวิชา', status: 'พิมพ์แล้ว', a: '/Education_information'},
            { request_date: '28/11/2566', request_number: 'xx-xxxx', certificate_type: 'ปพ.7', note: '-', status: 'ยังไม่พิมพ์', a: '/History_request'},
            { request_date: '29/11/2566', request_number: 'xx-xxxx', certificate_type: 'ปพ.7', note: '-', status: 'ยังไม่พิมพ์', a: '/Subject_Score_Record'},
            // เพิ่มข้อมูลผลการเรียนตามต้องการ
            ],
        },
        ]);

    useEffect(() => {
        // ตั้งค่าค่าเริ่มต้นของ dropdown เมื่อหน้าจอถูก refresh
        setSelectedOption('เลือกสถานะคำร้องขอใบรับรอง');
    }, []); // ใช้ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวหลังจากการ render แรก


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };


    return (
        <>
            

            <Header header="ระบบการออกใบรับรอง" subhead="ตรวจสอบคำขอใบรับรอง" />  
            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height:"100vh"}}>
                <div className="container flex-column align-items-center">
                    <div className="mb-3"><br />
                    <h2 className="align-items-center justify-content-center"style={{fontWeight:"bolder",fontSize:"25px"}}>สถานะคำร้องขอใบรับรอง</h2>
                    <br />
                    <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px' }}>
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",marginRight:"10px"}}>เลือกสถานะ</span>
                            </div>
                    <div className="dropdown" style={{ maxWidth: '100%'}}>
                    <select value={selectedOption} onChange={handleSelectChange}className="custom-select w-full">
                        <option value="เลือกสถานะคำร้องขอใบรับรอง">เลือกสถานะคำร้องขอใบรับรอง</option>
                        <option value="รอดำเนินการ">รอดำเนินการ</option>
                        <option value="ดำเนินการเสร็จสิ้น">ดำเนินการเสร็จสิ้น</option>
                        <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
                    </select>
                    </div>
                    </div>
                    </div>
                    <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                    <div className="table-wrapper">
                        <table className="table table-bordered table-striped table-hover" style={{borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>วันที่ทำรายการ</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF'}}>เลขที่คำร้อง</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ประเภทใบรับรอง</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>รายละเอียด</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>พิมพ์ใบรับรอง</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>อัพเดตสถานะ</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data[0].requests.map((request) => (
                                    <tr key={request.id} style={{ height: 'auto' }}>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.request_date}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.request_number}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.certificate_type}
                                            {/* <a href = {request.a} style={{ ...fontStyle}}>
                                               <i 
                                                    class="fs-5 bi-search" 
                                                    style={{
                                                        color: 'black',
                                                        fontSize: '20px',
                                                        marginRight: '5px'
                                                    }}
                                                ></i>                 
                                                <span style={{ ...fontStyle, color: 'black', fontSize: '16px' }}>ดูรายละเอียด</span>         
                                            </a> */}
                                        </td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.note}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.status}</td>
                                        <td style={{ backgroundColor: '#FFFFFF' }}>
                                            <button
                                                style={{
                                                    backgroundColor: 'transparent', // ตั้งค่าสีพื้นหลังเป็นโปร่ง
                                                    border: 'none', // ลบเส้นขอบ
                                                    padding: '0', // ลบ Padding
                                                    cursor: 'pointer' // เพิ่ม cursor: 'pointer' เพื่อแสดงว่าเป็นองค์ประกอบที่คลิกได้
                                                }}
                                                onClick={() => {
                                                    // กระทำตามที่คุณต้องการทำเมื่อปุ่มถูกคลิก
                                                }}
                                            >
                                                <i 
                                                    class="fs-5 bi-check-circle-fill" 
                                                    style={{
                                                        color: '#32CD32',
                                                        fontSize: '20px',
                                                        marginRight: '5px'
                                                    }}
                                                ></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                </div>
      </div>
        </>
    );
};

export default Check_Certification_Request;
