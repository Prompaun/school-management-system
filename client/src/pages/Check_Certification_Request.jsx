import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";
// import Navbar from '../components/Navbar'
import Header from '../components/Header';
import axios from 'axios';
import Modal_success from '../components/Modal_success';
const Check_Certification_Request = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    // const [selectedOption, setSelectedOption] = useState('เลือกสถานะคำร้องขอใบรับรอง');
    const [selectedOption, setSelectedOption] = useState('รอดำเนินการ');

    const [data, setData] = useState([
            // { id :1,request_date: '27/11/2566', request_number: 'xx-xxxx', certificate_type: 'ปพ.1', note: 'ระบุคะแนนรายวิชา', status: 'รอดำเนินการ'},
            // { id :2,request_date: '28/11/2566', request_number: 'xx-xxxx', certificate_type: 'ปพ.7', note: '-', status: 'รอดำเนินการ'},
            // { id :3,request_date: '29/11/2566', request_number: 'xx-xxxx', certificate_type: 'ปพ.7', note: '-', status: 'ดำเนินการเสร็จสิ้น'},
            // เพิ่มข้อมูลผลการเรียนตามต้องการ
           
       
        ]);

    const filteredData = data.filter((item) => {
        if (selectedOption !== 'ทั้งหมด'){
            return item.status === selectedOption;
            }
        return true;
            
        });

    function formatDateThaiYear(dateString) {
        const dob = new Date(dateString);
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear() + 543; // เพิ่มค่า 543 เข้าไปในปีเพื่อแปลงเป็น พ.ศ.
        const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return formattedDOB;
        }

    async function getAllRequests() {
        try {
            const response = await axios.get('http://localhost:8080/get-all-requests');
            return response.data;
        } catch (error) {
            console.error('Error fetching all requests:', error);
            throw error;
        }
    }

    async function getRequestsByStatus(status) {
        try {
            const response = await axios.get(`http://localhost:8080/get-requests/${status}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching requests:', error);
            throw error;
        }
    }

    async function updateRequest(requestId, requestData) {
        try {
            const response = await axios.put(`http://localhost:8080/update-request/${requestId}`, requestData);
            return response.data;
        } catch (error) {
            console.error('Error updating request:', error);
            throw error;
        }
    }

    function convertDate(dateString) {
        // แยกส่วนของวันที่โดยใช้ '/' เป็นตัวแยก
        const parts = dateString.split('/');
        
        // กำหนดค่าวันที่ใหม่โดยใช้ส่วนของวันที่ที่แยกไว้แล้ว
        const newDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    
        // ใช้ฟังก์ชัน toLocaleDateString() เพื่อแปลงวันที่ใหม่เป็นรูปแบบวันที่ท้องถิ่น
        const formattedDate = newDate.toLocaleDateString('en-US');
        
        return formattedDate;
    }
    
    useEffect(() => {
        // ตั้งค่าค่าเริ่มต้นของ dropdown เมื่อหน้าจอถูก refresh
        // setSelectedOption('รอดำเนินการ');
        if (selectedOption === 'ทั้งหมด'){
            async function fetchRequests() {
                try {
                    const Requestsdata = await getAllRequests(selectedOption);
                    const mappedRequestsdata = Requestsdata.map(item => ({
                        id: item.Request_No,
                        request_date: formatDateThaiYear(item.Request_Date),
                        request_number: item.Request_No,
                        certificate_type: item.Request_type,
                        note: item.Request_detail,
                        status: item.Request_status
                    }));
                    setData(mappedRequestsdata);
                } catch (error) {
                    console.error('Error fetching requests:', error);
                }
            }
            fetchRequests(); 
        }
        else{
            async function fetchRequests() {
                try {
                    const Requestsdata = await getRequestsByStatus(selectedOption);
                    const mappedRequestsdata = Requestsdata.map(item => ({
                        id: item.Request_No,
                        request_date: formatDateThaiYear(item.Request_Date),
                        request_number: item.Request_No,
                        certificate_type: item.Request_type,
                        note: item.Request_detail,
                        status: item.Request_status
                    }));
                    setData(mappedRequestsdata);
                } catch (error) {
                    console.error('Error fetching requests:', error);
                }
            }
            fetchRequests(); 
        }
    }, [selectedOption]); // ใช้ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวหลังจากการ render แรก
    


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };

      const [editingId, setEditingId] = useState(null);
      
      const handleEditRow = async (id) => {
          setEditingId(id === editingId ? null : id);
          if (editingId === id) {
            setShowModalSuccess(true)
            const selectedItem = data.find((item) => item.id === id);
            console.log(selectedItem);
            const requestData = {
                Request_status: selectedItem.status
            };
            
            updateRequest(id, requestData);
        }
      };
      
      const handleChange = (id, field, value) => {
          setData(
            data.map((request) =>
            request.id === id ? { ...request, [field]: value } : request
            )
          );
        }
        const [ShowModalSuccess,setShowModalSuccess] = useState(false);
      
    return (
        <>
            
          
         {ShowModalSuccess && (
            <Modal_success
            show={ShowModalSuccess} 
            setShow={setShowModalSuccess} 
            // link="/Parent_menu" 
            text="ระบบได้ทำการบันทึกเรียบร้อยแล้ว"
            />
         )}
            <Header header="ระบบการออกใบรับรอง" subhead="ตรวจสอบคำขอใบรับรอง" />  
            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height:"100vh"}}>
                <div className="container flex-column align-items-center">
                    <div className="mb-3"><br />
                    <h2 className="align-items-center justify-content-center"style={{fontWeight:"bolder",fontSize:"25px"}}>สถานะคำร้องขอใบรับรอง</h2>
                    <br />
                    <div className="card"  style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
                            <div className="card-body">
                    <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px' }}>
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",marginRight:"10px"}}>เลือกสถานะ</span>
                            </div>
                            <div className="dropdown" style={{ maxWidth: '100%'}}>
                            <select value={selectedOption} onChange={handleSelectChange}className="custom-select w-full">
                                <option value="ทั้งหมด">ทั้งหมด</option>
                                {/* <option value="รอดำเนินการ">รอดำเนินการ</option> */}
                                <option value="ดำเนินการเสร็จสิ้น">ดำเนินการเสร็จสิ้น</option>
                                <option value="รอดำเนินการ">รอดำเนินการ</option>
                            </select>
                        </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <br />
                    {filteredData.length === 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        
                          <span style={{ color: 'gray', textAlign: 'center' }}>ไม่พบข้อมูล</span>
                        
                      </div>
                        
                            ) : (
                    <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                    <div className="table-wrapper">
                        <table className="table table-bordered table-striped table-hover" style={{borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>วันที่ทำรายการ</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF'}}>เลขที่คำร้อง</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ประเภทใบรับรอง</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>รายละเอียด</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>สถานะ</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>แก้ไข</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredData.map((request,index) => (
                                    <tr key={index} style={{ height: 'auto' }}>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.request_date}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.request_number}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.certificate_type}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{request.note}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>
                                            
                                        
                                            {editingId === request.id ? (
                                            <div className="dropdown" style={{ maxWidth: '100%'}}>
                                                <select 
                                                    value={request.status}
                                                    onChange={(e) => handleChange(request.id, 'status', e.target.value)}
                                                    className="custom-select">
                                                    <option value="ดำเนินการเสร็จสิ้น">ดำเนินการเสร็จสิ้น</option>
                                                    <option value="รอดำเนินการ">รอดำเนินการ</option>
                                                </select>
                                            </div>
                                             ) : (
                                                request.status
                                            )}
                                            
                                            </td>
                                        {/* <td style={{ backgroundColor: '#FFFFFF' }}>
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
                                                    className="fs-5 bi-check-circle-fill" 
                                                    style={{
                                                        color: '#32CD32',
                                                        fontSize: '20px',
                                                        marginRight: '5px'
                                                    }}
                                                ></i>
                                            </button>
                                        </td> */}
                                        <td >
                                                <span className="actions"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    onClick={() => handleEditRow(request.id)}
                                                >
                                                    {editingId === request.id ? <BsFillFloppy2Fill /> : <BsFillPencilFill />}
                                                </span>
                                        </td>
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
};

export default Check_Certification_Request;
