import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';

const History_request = () => {
  const linkStyle = {
    color: 'gray',
    textDecoration: 'none'
  };

  // เพิ่ม state สำหรับเก็บข้อมูลจากฟอร์ม
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  async function getStudentIdByParentEmail(email) {
    try {
        const response = await axios.get('http://localhost:8080/get-student-id-request-by-parent-email', {
            params: {
                email: email
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching student ID by parent email:', error);
        throw error;
    }
}

async function getRequestInfo(email, Student_ID, Request_status) {
  try {
      const response = await axios.get('http://localhost:8080/get-request-by-studentID-and-status', {
          params: {
              Parent_Email: email,
              Student_ID: Student_ID,
              Request_status: Request_status
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching student ID by parent email:', error);
      throw error;
  }
}

async function getAllRequestInfo(email, Student_ID) {
  try {
      const response = await axios.get('http://localhost:8080/get-all-request', {
          params: {
              Parent_Email: email,
              Student_ID: Student_ID
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching student ID by parent email:', error);
      throw error;
  }
}

async function getRequestInfoByPareantEmail(email) {
  try {
      const response = await axios.get('http://localhost:8080/get-request-by-parent-email', {
          params: {
              Parent_Email: email
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching student ID by parent email:', error);
      throw error;
  }
}


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

  // const [StudentData, setStudentData] = useState([
  //   {
  //     StudentID: "12345",
  //     nameTitle: "เด็กหญิง",
  //     Firstname: "น้ำใส",
  //     Lastname: "ใจดี"
  //   },
  //   {
  //     StudentID: "5678",
  //     nameTitle: "เด็กชาย",
  //     Firstname: "น้ำหนึ่ง",
  //     Lastname: "ใจดี"
  //   }
  // ]);
  const [StudentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudent_ID, setSelectedStudent_ID] = useState("");
  const [foundData, setfoundData] = useState('');
  const [Data, setData] = useState([]);
  const handleStudentChange = (event) => {
    const selectedStudentValue = event.target.value;
    setSelectedStudent(selectedStudentValue);
  };
  
  // const [Data, setData] = useState([
  //   {
  //     DateRequest: '1/10/2566',
  //     NoRequest: '00001',
  //     RequestType: 'ปพ.7',
  //     RequestDetail: 'เพื่อใช้ในการขอทุนการศึกษา',
  //     RequestStatus: 'รอดำเนินการ'
  //   },
  //   {
  //     DateRequest: '3/10/2566',
  //     NoRequest: '00002',
  //     RequestType: 'ปพ.7',
  //     RequestDetail: 'เพื่อใช้ในการขอทุนการศึกษา',
  //     RequestStatus: 'ดำเนินการเสร็จสิ้น'
  //   },
  //   {
  //     DateRequest: '5/10/2566',
  //     NoRequest: '00003',
  //     RequestType: 'ปพ.7',
  //     RequestDetail: 'เพื่อใช้ในการขอทุนการศึกษา',
  //     RequestStatus: 'กำลังดำเนินการ'
  //   },
  // ]);

  const [selectedStatus, setselectedStatus] = useState('เลือกสถานะคำร้องขอใบรับรอง');
  

  const handleSelectChange = (e) => {
    setselectedStatus(e.target.value);
  };

  const filteredData = Data.filter((item) => {
    if (selectedStatus === 'เลือกสถานะคำร้องขอใบรับรอง') {
      return true;
    }
    return item.RequestStatus === selectedStatus;
  });


  useEffect(() => {
    // ตั้งค่าค่าเริ่มต้นของ dropdown เมื่อหน้าจอถูก refresh
    setselectedStatus('เลือกสถานะคำร้องขอใบรับรอง');
  }, [selectedStudent]); // ใช้ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวหลังจากการ render แรก

  useEffect(() => {
    const fetchData = async () => {
      try {
          const studentDataArray = await getStudentIdByParentEmail('john.doe@example.com');
          console.log('Student data array:', studentDataArray);
        
          const formattedStudentData = studentDataArray.map(student => ({
              ...student,
              key: student.Student_ID, // ใช้ Student_ID เป็น key
              StudentID: student.Student_ID,
              nameTitle: student.NameTitle,
              Firstname: student.FirstName,
              Lastname: student.LastName
          }));
          setStudentData(formattedStudentData);
          console.log('formattedStudentData:', formattedStudentData);

          if (studentDataArray.length > 0) {
            const firstStudentId = studentDataArray[0].Student_ID;

            // const AllRequestInfo = await getRequestInfoByPareantEmail('john.doe@example.com', firstStudentId);
            const AllRequestInfo = await getRequestInfoByPareantEmail('john.doe@example.com');
            const formattedAllRequestInfo = AllRequestInfo.map(request => ({
                DateRequest: new Date(request.Request_Date).toLocaleDateString(), // กำหนดรูปแบบวันที่ตามที่ต้องการ
                NoRequest: request.Request_No,
                RequestType: request.Request_type,
                RequestDetail: request.Request_detail,
                RequestStatus: request.Request_status
            }));
            setData(formattedAllRequestInfo);
          }
      } catch (error) {
          console.error('Error fetching Data:', error);
      }
  };
  

    fetchData();
}, []);

// useEffect(() => {
  

//   fetchData(); // เรียกใช้ฟังก์ชัน fetchData เมื่อ component ถูกโหลด
// }, [selectedStudent]);

useEffect(() => {
  const fetchData = async () => {
    try {
        if (selectedStudent && selectedStatus){
          // แยกค่า StudentID โดยใช้ split เพื่อแยกสตริงด้วยช่องว่างและเลือกค่าตัวแรก
          const selectedStudent_ID = selectedStudent.split(' ')[0];
          setSelectedStudent_ID(selectedStudent_ID);
          // setSelectedYear('');
          // setSelectedSemester('');

          console.log("selectedStudent_ID:", selectedStudent_ID); // พิมพ์ค่า StudentID ที่ได้
          const RequestInfo = await getRequestInfo('john.doe@example.com', selectedStudent_ID, selectedStatus);
          const formattedRequestInfo = RequestInfo.map(request => ({
            DateRequest: new Date(request.Request_Date).toLocaleDateString(), // กำหนดรูปแบบวันที่ตามที่ต้องการ
            NoRequest: request.Request_No,
            RequestType: request.Request_type,
            RequestDetail: request.Request_detail,
            RequestStatus: request.Request_status
        }));
        setData(formattedRequestInfo);
          console.log('Request info:', formattedRequestInfo);
          // setData();
        }
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };

  fetchData(); // เรียกใช้ฟังก์ชัน fetchData เมื่อ component ถูกโหลด
}, [selectedStatus]);

  return (
    <>
      

      <Header header="ตรวจสอบประวัติการขอใบรับรอง" subhead="" />  

    
    <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height:"100vh"}}>
      <div className="container flex-column align-items-center">
        <div className="mb-3"><br />
          <h2 className="align-items-center justify-content-center"style={{fontWeight:"bolder",fontSize:"25px"}}>สถานะคำร้องขอใบรับรอง</h2>
          <div className="d-flex"style={{ flexWrap: 'wrap'}} >
          <div className="d-flex"style={{ flexWrap: 'wrap', fontSize: '18px' ,padding: "10px"}}>
          <div className="d-flex align-items-center">
              <span style={{fontWeight:"bolder",marginRight:"10px"}}>เลือกข้อมูลนักเรียน :</span>
            </div>
            <div className="dropdown" style={{ maxWidth: '100%' }}>
            <select value={selectedStudent} onChange={handleStudentChange} className="custom-select">
                <option value="">เลือกข้อมูล</option>
                {StudentData.map((student, index) => (
                  <option key={index}>
                    {student.StudentID} : {student.nameTitle} {student.Firstname} {student.Lastname}
                  </option>
                ))}
              </select>
            </div>
            </div>
        
          <div className="d-flex"style={{ flexWrap: 'wrap', fontSize: '18px' ,padding: "10px"}}>
              <div>
                  <span style={{fontWeight:"bolder",marginRight:"10px"}}>เลือกสถานะ : </span>
                </div>
          <div className="dropdown" style={{ maxWidth: '100%'}}>
              <select value={selectedStatus} onChange={handleSelectChange}className="custom-select w-full">
                <option value="เลือกสถานะคำร้องขอใบรับรอง">เลือกสถานะคำร้องขอใบรับรอง</option>
                {/* <option value="รอดำเนินการ">รอดำเนินการ</option> */}
                <option value="ดำเนินการเสร็จสิ้น">ดำเนินการเสร็จสิ้น</option>
                <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
              </select>
              </div>
          </div>
        </div>
        </div>
        
        {/* <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
          <table className="table-bordered" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
            <thead>
              <tr>
                <th>วันที่ทำรายการ</th>
                <th>เลขที่คำร้อง</th>
                <th>ประเภทใบรับรอง</th>
                <th>รายละเอียด</th>
                <th>สถานะ</th>
              </tr>
            </thead>
            <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} style={{ height: '50px' }}>
                <td>{item.DateRequest}</td>
                <td>{item.NoRequest}</td>
                <td>{item.RequestType}</td>
                <td>{item.RequestDetail}</td>
                <td>{item.RequestStatus}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div> */}
        
        {Data.length === 0 ? (
       <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px' }}>
        <div className="container mt-5 d-flex flex-column align-items-center">
          <span className="ms-3 mb-0" style={{ color: 'gray' }}>ไม่พบข้อมูลการขอใบรับรอง</span>
        </div>
      </div>
     
        ) : (
            <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
              <div className="table-wrapper">
                <table className="table table-bordered table-striped table-hover" style={{borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                  <thead>
                    <tr>
                      <th>วันที่ทำรายการ</th>
                      <th>เลขที่คำร้อง</th>
                      <th>ประเภทใบรับรอง</th>
                      <th>รายละเอียด</th>
                      <th>สถานะ</th>
                    </tr>
                  </thead>
                  <tbody>
                  {filteredData.map((item, index) => (
                      <tr key={index} style={{ height: '50px' }}>
                        <td>{item.DateRequest}</td>
                        <td>{item.NoRequest}</td>
                        <td>{item.RequestType}</td>
                        <td>{item.RequestDetail}</td>
                        <td>{item.RequestStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            )}
      </div>
      </div>

    </>
  );
}
export default History_request;