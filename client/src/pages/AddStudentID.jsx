import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";

function AddStudentID() {

    const [NewStudent,setNewStudent] = useState([
        {id:1,nameTitle:"เด็กชาย",FirstName:"ณรงค์",LastName:"ใจสะอาด",Course:"หลักสูตรทั่วไป",StudentNewID:"88888"},
        {id:2,nameTitle:"เด็กหญิง",FirstName:"ณภร",LastName:"ใจดี",Course:"English Program (EP)",StudentNewID:""}

    ])
    const [selectedOption,setSelectedOption] = useState("ทั้งหมด")
    
    // useEffect(() => {
    //     // ตั้งค่าค่าเริ่มต้นของ dropdown เมื่อหน้าจอถูก refresh
    //     // setSelectedOption('รอดำเนินการ');
    //     if (selectedOption === 'ทั้งหมด'){
           
    //     }
    // }, [selectedOption]); // ใช้ [] เพื่อให้ useEffect ทำงานเพียงครั้งเดียวหลังจากการ render แรก
    
    const filteredStudent = NewStudent.filter(student => {
        return student.Course === selectedOption || selectedOption === "ทั้งหมด";
      });


    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };
    const [editingId, setEditingId] = useState(null);

    const handleEditRow = async (id) => {
        setEditingId(id === editingId ? null : id);
   
    };
    
    const handleChange = (id, field, value) => {
        setNewStudent(
          NewStudent.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
          )
        );
      };


  return (
    <>
    <Header
    header="ระบบจัดการสารสนเทศ"
    subhead="บริการสำหรับบุคลากรภายในโรงเรียน"
  />
  <div
        style={{
          height: "150vh",
          fontFamily: "Kanit, sans-serif",
        }}
      >
        <div className="container">
          <div className="flex-column">
            <div className="justify-content-center">
              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
                  จัดการเลขประจำตัวนักเรียน
                </h2>
                <h2 className="card-heading" style={{ fontSize: "25px", color:"gray",marginLeft:"5px" }}>
                  (สำหรับนักเรียนใหม่ปีปัจจุบัน)
                </h2>
              </div>
                <br />
                    <div className="card"  style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
                            <div className="card-body">
                    <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px' }}>
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",marginRight:"10px"}}>เลือกหลักสูตร</span>
                            </div>
                            <div className="dropdown" style={{ maxWidth: '100%'}}>
                            <select value={selectedOption} onChange={handleSelectChange}className="custom-select w-full">
                                <option value="ทั้งหมด">ทั้งหมด</option>
                                <option value="หลักสูตรทั่วไป">หลักสูตรทั่วไป</option>
                                <option value="English Program (EP)">English Program (EP)</option>
                            </select>
                        </div>
                        </div>
                        </div>
                    </div>
                    

                    <br />

              {NewStudent.length === 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        
                          <span style={{ color: 'gray', textAlign: 'center' }}>ไม่พบข้อมูล</span>
                        
                      </div>
                        
                            ) : (
                                <>
                            <br />
                    <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                    <div className="table-wrapper">
                        <table className="table table-bordered table-striped table-hover" style={{borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ลำดับที่</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF'}}>หลักสูตร</th>
                                   
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF'}}>ชื่อ-นามสกุล</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>เลขประจำตัวนักเรียน</th>
                                   
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>แก้ไข</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudent.map((item,index) => (
                                    <tr key={index} style={{ height: 'auto' }}>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{index+1}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.Course}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.nameTitle}{item.FirstName} {item.LastName}</td>
                                       
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>
                                        {editingId === item.id? (
                                            <input
                                            type="text"
                                            value={item.StudentNewID}
                                            onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const isInteger = Number.isInteger(parseInt(inputValue, 10));
                                                if (isInteger || inputValue === '') {
                                                handleChange(item.id, 'StudentNewID', inputValue);
                                                }
                                            }}
                                            />
                                        ) : (
                                            item.StudentNewID
                                        )}
                                        </td>
                                        
                                        <td >
                                                <span className="actions"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    onClick={() => handleEditRow(item.id)}
                                                >
                                                    {editingId === item.id ? <BsFillFloppy2Fill /> : <BsFillPencilFill />}
                                                </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
                </>
                 )}
             
            </div>
          </div>
        </div>
      </div>
  </>
  )
}

export default AddStudentID