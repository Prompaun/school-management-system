import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Student_Information(props) {

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  async function getStudentInfoByID(Student_ID) {
    try {
            const response = await axios.get('http://localhost:8080/personnel-get-student-info-by-student-id', {
                params: {
                    Student_ID: Student_ID
                }
            });
            return response.data;
        }   catch (error) {
            console.error('Error fetching year by student ID:', error);
            throw error;
        }
    };

    function formatDateThaiYear(dateString) {
        const dob = new Date(dateString);
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear() + 543; // เพิ่มค่า 543 เข้าไปในปีเพื่อแปลงเป็น พ.ศ.
        const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return formattedDOB;
    }

  const [StudentData,setStudentData] = useState(
    [
        // {
        //     Student_NID : "1-0000-00000-11-1",
        //     Student_ID : "13333",
        //     NameTitle : "เด็กหญิง",
        //     FirstName : "ดวง",
        //     LastName : "จันทร์",
        //     Student_DOB : "01/05/2559",
        //     BirthCert_file : "", //link drive gg
        //     Transcript_type : "ปพ.1",
        //     Transcript_file : "" //link drive gg
        // }
    ]
  );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const StudentInfo = await getStudentInfoByID(props.studentID_prop);
                console.log('StudentInfo:', StudentInfo);

                setStudentData(StudentInfo);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

    fetchData();
    }, []);

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Kanit, sans-serif',
      }}>

        {StudentData.length === 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px' }}>
                <div className="container mt-5 d-flex flex-column align-items-center">
                    <span className="ms-3 mb-0" style={{ color: 'gray' }}>ไม่พบข้อมูลส่วนตัวของนักเรียนท่านนี้</span>
                </div>
            </div>
            
        ) : (
        <>

            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
            
                <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                    <label htmlFor="student_info" className="col-form-label">ข้อมูลส่วนตัวของนักเรียน</label>
                </div>
            
                <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif' }}>   
                    <div style={{ fontSize: '18px'}}> 
                        <div className="align-items-center">
                            <label htmlFor="Student_NID" className="col-form-label">เลขประจำตัวประชาชน</label>
                        </div> 
                        <div className="align-items-center"style={{maxWidth:"100%"}}>       
                            <input 
                                type="text" 
                                className="form-control"
                                id="Student_NID" 
                                name="Student_NID" 
                                value={StudentData[0].Student_NID}
                                readOnly 
                                style={{ backgroundColor: '#DCDCDC', color: 'black' }} 
                            />
                        </div>
                    </div>

                    <div style={{ fontSize: '18px'}}> 
                        <div className="align-items-center">
                            <label htmlFor="Student_ID" className="col-form-label">เลขประจำตัวนักเรียน</label>
                        </div> 

                        <div className="align-items-center"style={{maxWidth:"100%"}}>  
                            <input
                                type="text"
                                className="form-control"
                                id="Student_ID"
                                name="Student_ID"
                                value={StudentData[0].Student_ID}
                                readOnly
                                style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                            />            
                        </div>
                    </div>
                </div>
        
                <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif' }}> 
                    <div style={{ fontSize: '18px'}}> 
                        <div className="align-items-center">
                            <label htmlFor="title" className="col-form-label">คำนำหน้า</label>
                        </div> 

                        <div className="align-items-center"style={{maxWidth:"100%"}}> 
                            <input 
                                type="text" 
                                className="form-control"
                                id="title" 
                                name="title" 
                                value={StudentData[0].NameTitle} 
                                readOnly 
                                style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                                // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                            />
                        </div>
                    </div>

                    <div style={{ fontSize: '18px'}}>    
                        <div className=" align-items-center">
                            <label htmlFor="FirstName" className="col-form-label">ชื่อ</label>
                        </div> 
                        
                        <div className=" align-items-center"style={{maxWidth:"100%"}}> 
                            <input
                                type="text"
                                className="form-control"
                                id="FirstName"
                                name="FirstName"
                                value={StudentData[0].FirstName}
                                readOnly
                                style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                            />
                        </div>           
                    </div>

                    <div style={{ fontSize: '18px'}}> 
                        <div className="align-items-center">
                            <label htmlFor="LastName" className="col-form-label">นามสกุล</label>
                        </div> 

                        <div className="align-items-center"style={{maxWidth:"100%"}}> 
                            <input
                                type="text"
                                className="form-control"
                                id="LastName"
                                name="LastName"
                                value={StudentData[0].LastName}
                                readOnly
                                style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                                />
                        </div>
                    </div>

                    <div style={{fontSize: '18px' }}>
                        <div className="align-items-center"style={{ flexWrap: 'wrap' }}>
                            <label htmlFor="Date_of_Birth" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                        </div> 

                        <div className="align-items-center"style={{maxWidth:"100%"}}> 
                            <input
                                type="text"
                                className="form-control"
                                id="Date_of_Birth"
                                name="Date_of_Birth"
                                value={formatDateThaiYear(StudentData[0].Student_DOB)}
                                readOnly
                                style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                                />            
                        </div>
                    </div>
                </div>
        
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', fontFamily: 'Kanit, sans-serif', fontSize: '18px'}}>   
                    <div className="align-items-center"style={{flexWrap:"wrap", fontSize: '18px'}}>
                        <label htmlFor="Copy_of_the_birth_certificate" className="col-form-label">สำเนาสูติบัตร (ของนักเรียน)</label>
                    </div> 
                        <button 
                                type="submit" 
                                className="btn btn-custom" 
                                style={{
                                ...fontStyle, 
                                color: 'white', 
                                fontSize: '18px', 
                                textAlign: 'center', 
                            
                                backgroundColor: '#EE82EE',
                                width: 'auto', // กำหนดความกว้าง
                                height: 'auto'  // กำหนดความสูง
                                }}
                                onClick={() => window.open(StudentData[0].BirthCert_file )}
                            >
                                <span>file</span>
                        </button>
                </div>

                {/* <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <button type="submit" className="btn btn-primary">file</button>
                </div> */}

                <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                    <label htmlFor="education_data" className="col-form-label">ข้อมูลการศึกษา</label>
                </div>
            
                <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif' }}>
                    <div className="align-items-center"style={{flexWrap:"wrap", fontSize: '18px'}}>
                        <label htmlFor="Education_Document" className="col-form-label">หลักฐานการศึกษาจากโรงเรียนเดิม</label>
                    </div> 

                    <div className="align-items-center"style={{ maxWidth:"100%"}}> 
                        <input
                            type="text"
                            className="form-control"
                            id="Education_Document"
                            name="Education_Document"
                            value={StudentData[0].Transcript_type}
                            readOnly
                            style={{
                                backgroundColor: '#DCDCDC',
                                color: 'black',
                                // กำหนดความกว้างขั้นต่ำ
                                boxSizing: 'border-box',  // ตั้งค่า box-sizing
                                fontSize: '18px'
                            }} 
                        />
                    </div>

                    {/* <div className="align-items-center"> */}
                    <button 
                            type="submit" 
                            className="btn btn-custom" 
                            style={{
                            ...fontStyle, 
                            color: 'white', 
                            fontSize: '18px', 
                            textAlign: 'center', 
                            
                            backgroundColor: '#EE82EE',
                            width: 'auto', // กำหนดความกว้าง
                            height: 'auto'  // กำหนดความสูง
                            }}
                            // onClick={StudentData[0].Transcript_file}
                            onClick={() => window.open(StudentData[0].Transcript_file )}
                        >
                            <span>file</span>
                    </button>
                </div>
            </div>
        </>
        )}
    </div>
  );
}

export default Student_Information;
