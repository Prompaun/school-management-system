import React, { useState, useEffect,useRef } from 'react';
import Header from '../components/Header';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";
import Modal_success from '../components/Modal_success';
import axios from 'axios';
import { kMaxLength } from 'buffer';

function ManageStudentClass() {
    const [StudentData,setStudentData] = useState([
        // {StudentID:1,nameTitle:"เด็กชาย",FirstName:"ณรงค์",LastName:"ใจสะอาด",Year:"",Room:""},
        // {StudentID:2,nameTitle:"เด็กหญิง",FirstName:"ณภร",LastName:"ใจดี",Year:"5",Room:"6"},
        // {StudentID:3,nameTitle:"เด็กหญิง",FirstName:"ณภรกาน",LastName:"ใจดี",Year:"5",Room:"9"},
        // {StudentID:4,nameTitle:"เด็กหญิง",FirstName:"ณภรกาน",LastName:"ใจดี",Year:"4",Room:"7"},
        // {StudentID:5,nameTitle:"เด็กหญิง",FirstName:"ณภรกาน",LastName:"ใจดี",Year:"6",Room:"9"}
    ])
    const [oldStudentData,setOldStudentData] = useState([])
   

    const [ClassYear, setClassYear] = useState([
        { Year: [1, 2, 3, 4, 5, 6] },
      
    ])
    const [ClassRoom, setClassRoom] = useState([
        { Room: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] },
    ])
   
    const [selectedYear, setSelectedYear] = useState("")
    const [SelectedRoom, setSelectedRoom] = useState("")
   
    
    const handleSelectYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const handleSelectRoomChange = (event) => {
        setSelectedRoom(event.target.value);
    };
    // const [editedYear, setEditedYear] = useState("");
    // const [editedRoom, setEditedRoom] = useState("");
    
   
    const [editingId, setEditingId] = useState(null);
    
    const filteredStudent = editingId !== null ? StudentData : StudentData.filter((student) =>
        // selectedYear
        //     ? ((SelectedRoom ? (student.Year === selectedYear && student.Room === SelectedRoom) :  student.Year === selectedYear))
        //     : student.Year === "" && student.Year === "" 
        {
            if (selectedYear === '' && SelectedRoom ===""){
                return student.Year === "" && student.Room === "";
             }
             if (selectedYear !== "" && SelectedRoom !==""){
                return student.Year === selectedYear && student.Room === SelectedRoom;
                }
            if (selectedYear !== ""){
                return student.Year === selectedYear;
            }
            // return true;
        }
            
    );
    
    const handleEditRow = async (id) => {
        setEditingId(id === editingId ? null : id);
        if (editingId === id) {
            if (StudentData[id].StudentID === null) {
                alert("ไม่สามารถแก้ไขข้อมูลของนักเรียนที่ยังไม่มีเลขประจำตัวได้")
                setStudentData(oldStudentData)
            } else if (StudentData[id].Year === "" || StudentData[id].Room === "") {
                alert("กรุณากรอกข้อมูลให้ครบ")
                setStudentData(oldStudentData)
            }  else {
                let mode = ""
                if (StudentData[id].saved) {
                    mode = "update"
                } else {
                    mode = "insert"
                }
                updateStidentInfo(mode,id)
                setOldStudentData(StudentData)
            }
            // handleSave(editingId);
            // setShowModalSuccess(true); 
        } else {
            setStudentData(oldStudentData)
        }
    };
    
    const handleChange = (id, field, value) => {
        setStudentData(
            StudentData.map((item) =>
                item.id === id ? {...item, [field]: value } : item,
            )
        );
         
    
      };
    

    // const handleSave = (StudentID) => {
    //     if (editedYear!== "" && editedRoom!== "") {
    //       setStudentData(
    //         StudentData.map((item) =>
    //           item.StudentID === StudentID
    //         ? {...item, Year: editedYear, Room: editedRoom }
    //             : item
    //         )
    //       );
    //       setShowModalSuccess(true);
    //     }
        
    //     setEditingId(null);
    //     setEditedYear("");
    //     setEditedRoom("");
    //   };

      const [ShowModalSuccess,setShowModalSuccess] = useState(false);

      //=============================api=============================
      async function getStidentInfo() {
        try {
            const response = await axios.get('http://localhost:8080/manageClass-get-student-info', {});
            const newData = response.data.results.map((item,index) => ({
                id: index,
                StudentID: item.Student_ID,
                nameTitle: item.NameTitle,
                FirstName: item.FirstName,
                LastName: item.LastName,
                Year: response.data.outcome.find(data => data.Student_ID === item.Student_ID)?.Level.toString() ?? "",
                Room: response.data.outcome.find(data => data.Student_ID === item.Student_ID)?.Room.toString() ?? "",
                saved: response.data.outcome.find(data => data.Student_ID === item.Student_ID) === undefined ? false : true
            }))
            setStudentData(newData)
            setOldStudentData(newData)
            return response.data;
        } catch (error) {
            console.error('Error fetching student class and info:', error);
            throw error;
        }
      };

      async function updateStidentInfo(mode,id) {
        try {
            const response = await axios.post('http://localhost:8080/manageClass-update-student-info', {
                mode: mode, 
                level: StudentData[id].Year, 
                room: StudentData[id].Room, 
                student: StudentData[id].StudentID
            });
            return response.data;
        } catch (error) {
            console.error('Error updating student class and info:', error);
            throw error;
        }
      };

      useState(() => {
        getStidentInfo()
      })

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
                  จัดการห้องเรียนตามชั้นปี
                </h2>
                
              </div>
              <br />
                    <div className="card"  style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
                            <div className="card-body">
                    <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px' }}>
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",marginRight:"10px"}}>เลือกชั้นปี</span>
                            </div>
                            <div className="dropdown" style={{ maxWidth: '100%'}}>
                            <select value={selectedYear} onChange={handleSelectYearChange} className="custom-select w-full">
                                <option value="" >-</option>

                                {ClassYear[0].Year.map((year, index) => ( // Access the Year property before calling map
                                    <option value={year} key={index}>
                                    {year}
                                    </option>
                                ))}
                                </select>
                        </div>
                        
                       
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",marginInline:"10px"}}>ห้อง</span>
                            </div>
                            <div className="dropdown" style={{ maxWidth: '100%'}}>
                            <select value={SelectedRoom} onChange={handleSelectRoomChange} className="custom-select w-full">
                            <option value="" >-</option>
                            {ClassRoom[0].Room.map((Room, index) => (
                                <option value={Room} key={index}>
                                {Room}
                                </option>
                            ))}
                            </select>
                        </div>
                        </div>
                        </div>
                    </div>
                    

                    <br />
                    
             
                    {filteredStudent.length === 0 ? (
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
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>เลขประจำตัวนักเรียน</th>
                                   
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF'}}>ชื่อ-นามสกุล</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ชั้นปี</th>
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ห้อง</th>
                                   
                                    <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>แก้ไข</th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredStudent.map((item,index) => (
                                    <tr key={index} style={{ height: 'auto' }}>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.StudentID}</td>
                                        <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.nameTitle}{item.FirstName} {item.LastName}</td>
                                       
                                        <td style={{ backgroundColor: "#FFFFFF", fontSize: "16px" }}>
                                        {editingId === item.id? (
                                            <input
                                                type="text"
                                                value={item.Year}
                                                onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const isInteger = Number.isInteger(parseInt(inputValue, 10));
                                                if ((isInteger && inputValue >= 1 && inputValue <= 6) || inputValue === "") {
                                                    handleChange(item.id, "Year", inputValue);
                                                    // handleChange(item.StudentID, "Year", inputValue);
                                                }
                                               
                                                }}
                                            />
                                            ) : (
                                            item.Year
                                            )}
                                        </td>
                                        <td style={{ backgroundColor: "#FFFFFF", fontSize: "16px" }}>
                                            {/* {editingId === item.StudentID? ( */}
                                            {editingId === item.id? (
                                            <input
                                                type="text"
                                                value={item.Room}
                                                onChange={(e) => {
                                                const inputValue = e.target.value;
                                                const isInteger = Number.isInteger(parseInt(inputValue, 10));
                                                if ((isInteger && inputValue >= 1 && inputValue <= 20) || inputValue === "") {
                                                    handleChange(item.id, "Room", inputValue);
                                                    // handleChange(item.StudentID, "Room", inputValue);
                                                }
                                                }}
                                            />
                                            ) : (
                                            item.Room
                                            )}
                                        </td>
                                        <td>
                                            <span
                                            className="actions"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                            onClick={() => handleEditRow(item.id)}
                                            // onClick={() => handleEditRow(item.StudentID)}
                                            >
                                            {editingId === item.id? <BsFillFloppy2Fill /> : <BsFillPencilFill />}
                                            {/* {editingId === item.StudentID? <BsFillFloppy2Fill /> : <BsFillPencilFill />} */}
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

export default ManageStudentClass