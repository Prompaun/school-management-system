import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
const Check_Applicant_Information = () => {
    
    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const [selectedOption, setSelectedOption] = useState('เลือกหลักสูตร');

    const [data, setData] = useState([
        {
            check_student_data: [
            { Registration_Number: 'XXX1', Registration_Date: '12/05/2566', Applicants_first_name: 'เด็กหญิงฐิตานันนท์', Applicants_last_name: 'สดใส', Attached_Documents: 'หลักฐานการศึกษา สำเนาทะเบียนบ้าน', Educational_Program: 'English Program (EP)', a: '/Education_information'},
            { Registration_Number: 'XXX2', Registration_Date: '12/05/2566', Applicants_first_name: 'เด็กหญิงทักษพร', Applicants_last_name: 'ใจบุญ', Attached_Documents: '-', Educational_Program: 'English Program (EP)', a: '/History_request'},
            { Registration_Number: 'XXX3', Registration_Date: '13/05/2566', Applicants_first_name: 'เด็กหญิงกรกช', Applicants_last_name: 'รักดี', Attached_Documents: '-', Educational_Program: 'Regular Program', a: '/Subject_Score_Record'},
            // เพิ่มข้อมูลผลการเรียนตามต้องการ
            ],
        },
        ]);

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        };

        const filteredData = data.filter((item) => {
            if (selectedOption === 'เลือกหลักสูตร') {
                return true;
            }
            return item.check_student_data.some((check_student_data) => check_student_data.Educational_Program === selectedOption);
            });

    useEffect(() => {
        // ตั้งค่าค่าเริ่มต้นของ dropdown เมื่อหน้าจอถูก refresh
        setSelectedOption('เลือกหลักสูตร');
    }, []); // ใช้ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวหลังจากการ render แรก


    return (
        <>

            <Header header="ระบบการรับสมัครนักเรียน" subhead="ตรวจสอบข้อมูลผู้สมัคร" />  
             
            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height:"100vh"}}>
                <div className="container flex-column align-items-center">
                    <div className="mb-3"><br />
                    <h2 className="align-items-center justify-content-center"style={{fontWeight:"bolder",fontSize:"25px"}}>รายชื่อผู้สมัครเข้าศึกษาต่อชั้นประถมศึกษาปีที่ 1</h2>
                    <br />
                    <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px' }}>
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",marginRight:"10px"}}>หลักสูตร</span>
                            </div>
                    <div className="dropdown" style={{ maxWidth: '100%'}}>
                            <select value={selectedOption} onChange={handleSelectChange}className="custom-select">
                                <option value="หลักสูตร">เลือกหลักสูตร</option>
                                <option value="English Program (EP)">English Program (EP)</option>
                                <option value="Regular Program">Regular Program</option>
                            </select>
                        </div>
                        </div>
                        </div>
                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                    <div className="table-wrapper">
                        <table className="table table-bordered table-striped table-hover" style={{borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif',fontSize:"18px"}}>
                            <thead>
                                <tr>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>เลขที่สมัคร</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>วันที่สมัคร</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ชื่อผู้สมัคร</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>เอกสารแนบ</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>หลักสูตร</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>รายละเอียดเพิ่มเติม</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData[0].check_student_data.map((check_student_data) => (
                                    <tr key={check_student_data.id} style={{ height: '100px' }}>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{check_student_data.Registration_Number}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{check_student_data.Registration_Date}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{check_student_data.Applicants_first_name + "  " + check_student_data.Applicants_last_name}
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
                                        {/* <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{check_student_data.Attached_Documents}</td> */}
                                        <td style={{ backgroundColor: '#FFFFFF' }}>
                                            <a href="/Education_information" style={{ ...fontStyle}}>
                                                <i 
                                                    class="fs-5 bi-download" 
                                                    style={{
                                                        color: 'black',
                                                        fontSize: '20px',
                                                        marginRight: '5px'
                                                    }}
                                                ></i>                 
                                                    <span style={{
                                                        ...fontStyle,
                                                        color: 'black',
                                                        fontSize: '16px',
                                                        textDecoration: 'underline' // เพิ่มการขีดเส้นใต้
                                                    }}>หลักฐานการศึกษา</span>
                                                    

                                                <br />
                                                <i 
                                                    class="fs-5 bi-download" 
                                                    style={{
                                                        color: 'black',
                                                        fontSize: '20px',
                                                        marginRight: '5px'
                                                    }}
                                                ></i>                 
                                                    <span style={{
                                                        ...fontStyle,
                                                        color: 'black',
                                                        fontSize: '16px',
                                                        textDecoration: 'underline' // เพิ่มการขีดเส้นใต้
                                                    }}>สำเนาทะเบียนบ้าน</span>
                                            </a>
                                        </td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{check_student_data.Educational_Program}</td>
                                        <td style={{ backgroundColor: '#FFFFFF' }}>
                                            <a href="/Education_information" style={{ ...fontStyle}}>
                                                {/* <button type="button" class="btn btn-primary" data-mdb-ripple-init>
                                                    <i 
                                                            class="fs-5 bi-search" 
                                                            style={{
                                                                color: 'black',
                                                                fontSize: '20px',
                                                                marginRight: '5px'
                                                            }}
                                                        ></i>
                                                </button> */}
                                                {/* <button type="button" class="btn btn-primary" style={{ fontSize: '20px', backgroundColor: 'transparent', border: '1px solid black', width:'40px', height:'40px', marginRight:'5px' }} data-mdb-ripple-init>
                                                    <i 
                                                        class="fs-5 bi-search" 
                                                        style={{
                                                            color: 'black',
                                                            marginRight: '50px'
                                                        }}
                                                    ></i>
                                                </button> */}
                                                <i 
                                                    class="fs-5 bi-search" 
                                                    style={{
                                                        color: 'black',
                                                        fontSize: '20px', // ตั้งค่าขนาดตัวอักษร
                                                        marginRight: '5px'
                                                        // border: '1px solid black', // เพิ่มกรอบด้วยการตั้งค่า border
                                                        // padding: '1px', // ตั้งค่าการเพิ่มพาดิงขอบ
                                                        // borderRadius: '5px' // ตั้งค่าการเพิ่มมุมขอบสำหรับกรอบ
                                                    }}
                                                ></i> 
                                                <span style={{ ...fontStyle, color: 'black', fontSize: '16px' }}>ดูรายละเอียด</span>
                                            </a>
                                        </td>{/* Additional_Details */}
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

export default Check_Applicant_Information;
