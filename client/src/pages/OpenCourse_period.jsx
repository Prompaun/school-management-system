import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Link ,useNavigate} from 'react-router-dom';
import DateRangePicker_period from '../components/DateRangePicker_period';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";
import axios from 'axios';
import Modal_loading from '../components/Modal_loading';
import Modal_success from '../components/Modal_success';
import Modal_confirm from '../components/Modal_confirm';
import { Button, Modal,Spinner } from 'react-bootstrap';

function OpenCourse_period() {
  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };
    const [selectedCourse, setSelectedCourse] = useState('ทั้งหมด');
    const [DateRange,setDateRange] =useState(["", ""]);
    
    const handleDateRangeChange = ([start, end]) => {
      
      setDateRange([start, end]);

    };
    const resetDateRange = () => {
      setDateRange(["", ""]);
    };
    const handleSelectCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        };
        
        const handleSubmitPeriod = async (event) => {
          if (CheckInputDataPeriod()) {
              // setshowConfirmModal(false);
              // setShowLoadingModal(true);
              console.log("DateRange", selectedCourse, DateRange);
              const courseId = findIdByCourseName(selectedCourse);
              console.log(selectedCourse);
              console.log(courseId);
              
              if (selectedCourse === 'ทั้งหมด'){
                try {
                  const courses = [
                      { name: 'หลักสูตรทั่วไป', id: findIdByCourseName('หลักสูตรทั่วไป') },
                      { name: 'English Program (EP)', id: findIdByCourseName('English Program (EP)') }
                  ];
              
                  const updatedData = courses.map(course => ({
                      id: course.id, // เพิ่มค่า id ที่ได้จากการค้นหาไปยัง updatedData
                      course: course.name,
                      start_date: formatDateEngYear(DateRange[0]),
                      start_time: '00:00:00',
                      end_date: formatDateEngYear(DateRange[1]),
                      end_time: '00:00:00'
                  }));
              
                  await Promise.all(updatedData.map(data => updateRecruitmentPeriod(data.id, data)));
              } catch (error) {
                  console.error('Error fetching Recruitment Period:', error);
              }
                // try {
                //       const updatedRegularCourse = {
                //         course: 'หลักสูตรทั่วไป',
                //         start_date: formatDateEngYear(DateRange[0]),
                //         start_time: '00:00:00',
                //         end_date: formatDateEngYear(DateRange[1]),
                //         end_time: '00:00:00'
                //       };
                //       const updatedEPCourse = {
                //         course: 'English Program (EP)',
                //         start_date: formatDateEngYear(DateRange[0]),
                //         start_time: '00:00:00',
                //         end_date: formatDateEngYear(DateRange[1]),
                //         end_time: '00:00:00'
                //       };
                //       await updateRecruitmentPeriod(findIdByCourseName('หลักสูตรทั่วไป'), updatedRegularCourse);
                //       await updateRecruitmentPeriod(findIdByCourseName('English Program (EP)'), updatedEPCourse);
                //   } catch (error) {
                //       console.error('Error fetching Recruitment Period:', error);
                //   }
              }
              else{
                  try {
                        const updatedData = {
                          course: selectedCourse,
                          start_date: formatDateEngYear(DateRange[0]),
                          start_time: '00:00:00',
                          end_date: formatDateEngYear(DateRange[1]),
                          end_time: '00:00:00'
                        };
                      await updateRecruitmentPeriod(courseId, updatedData);
                  } catch (error) {
                      console.error('Error fetching Recruitment Period:', error);
                  }
              }
              const RecruitmentPeriod = await getRecruitmentPeriod();
              const mappedCourseData = RecruitmentPeriod.map(item => ({
                  id: item.id,
                  course: item.course,
                  DateStart: formatDateThaiYear(item.start_date),
                  DateEnd: formatDateThaiYear(item.end_date)
              }));
              setCourseData(mappedCourseData);
         
               setShowLoadingModal(false);

              setShowSuccessModal(true);
              setSelectedCourse("ทั้งหมด");
              resetDateRange();
              
          }
          
          return true;
        };
        
        const CheckInputDataPeriod = () => {
          if (DateRange.some((date) => date === '' || date === null)) {
            alert("กรุณาเลือกช่วงการเปิดรับสมัครให้ครบถ้วน");
            return false;
          }
          return true;
        }



        const [CourseData, setCourseData] = useState([
          // {id:1, course: "หลักสูตรทั่วไป", DateStart: "30/03/2024",DateEnd:"02/05/2024"},
          // {id:2, course: "English Program (EP)", DateStart: "12/03/2567",DateEnd:"17/04/2567"},
      
      ]);
    
      function formatDateThaiYear(dateString) {
        const dob = new Date(dateString);
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear() + 543; // เพิ่มค่า 543 เข้าไปในปีเพื่อแปลงเป็น พ.ศ.
        const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return formattedDOB;
      }

      function formatDateEngYear(dateString) {
        const dob = new Date(dateString);
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear(); // เพิ่มค่า 543 เข้าไปในปีเพื่อแปลงเป็น พ.ศ.
        const formattedDOB = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        return formattedDOB;
      }

      const findIdByCourseName = (courseName) => {
        const course = CourseData.find(item => item.course === courseName);
        return course ? course.id : null;
    };
    
      async function getRecruitmentPeriod() {
        try {
            const response = await axios.get('http://localhost:8080/get-recruitment-period');
            return response.data;
          } catch (error) {
              console.error('Error fetching Recruitment Period:', error);
              throw error;
          }
      };

      async function updateRecruitmentPeriod (id, updatedData) {
        try {
            const response = await axios.put(`http://localhost:8080/update-recruitment-period/${id}`, updatedData);
            console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
        } catch (error) {
            console.error('Error updating recruitment period:', error);
        }
      };

      useEffect(() => {
        const fetchData = async () => {
            try {
              const RecruitmentPeriod = await getRecruitmentPeriod();
              const mappedCourseData = RecruitmentPeriod.map(item => ({
                id: item.id,
                course: item.course,
                DateStart: formatDateThaiYear(item.start_date),
                DateEnd: formatDateThaiYear(item.end_date)
                }));
                setCourseData(mappedCourseData);
            } catch (error) {
              console.error('Error fetching Recruitment Period:', error);
            }
        };
        fetchData();
      }, []);
      // const [obj,setObj] = useState([
      //     {
      //         course: "ประกาศรับสมัครนักเรียนใหม่",
      //         content: "รับสมัครนักเรียนใหม่ แผนการเรียน English Program (EP)",
      //         link:"",
      //         DateTime : "12-10-2565"
      //     },
      //     {
      //         course: "ระเบียบการลงทะเบียนสำหรับผู้ใช้ใหม่",
      //         content: "ขั้นตอนการลงทะเบียนเข้าสู่ระบบ",
      //         link:"https://shorturl.at/xDVZ6",
      //         DateTime : "12-10-2565"
      //     }
      //   ]);
      
      const handleCloseModal = () => {
        setshowConfirmModal(false);
      }
      const handleClose = () => {
        setShowSuccessModal(false);
        window.location.reload();
      }
      const [showConfirmModal, setshowConfirmModal] = useState(false);
    
      const [showLoadingModal, setShowLoadingModal] = useState(false);
      const [showSuccessModal, setShowSuccessModal] = useState(false);
      
  return (
    <>
    {showConfirmModal && (
          
          <Modal
              show={showConfirmModal}
              onHide={handleCloseModal}
              backdrop="static"
              keyboard={false}
              size="sm"
              centered
              style={{ fontFamily: 'Kanit, sans-serif' }}
              >
              <Modal.Body className="text-center p-lg-4" >
                  
                
                  <p className="mt-3"style={{ fontSize: '22px' }}>ต้องการบันทึกช่วงการเปิดรับสมัครใช่หรือไม่</p>
             
                  <Button
                    variant="sm"
                    style={{ fontSize: "20px" }}
                    className="btn-primary btn-same-size"
                    onClick={() => {
                      handleSubmitPeriod();
                      handleCloseModal();
                    }}
                  >
                    Yes
                  </Button>
                  <br />
                  <Button
                    variant="sm"
                    style={{ fontSize: "20px",marginTop:"10px"}}
                    className="btn-secondary btn-same-size"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>

                  {/* </Link> */}
              </Modal.Body>
              </Modal>

        )}    
    {showLoadingModal && (
          <Modal_loading show={showLoadingModal} setShow={setShowLoadingModal} />
    )}
    {showSuccessModal && (
          <Modal
          show={showSuccessModal}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="sm"
          centered
          style={{ fontFamily: 'Kanit, sans-serif' }}
      >
      <Modal.Body className="text-center p-lg-4">
          <h4 className="text-success mt-3" style={{ fontSize: '30px'}}>
              COMPLETE
          </h4>
          {/* ระบบได้รับข้อมูลการสมัครของท่านแล้ว */}
          <p className="mt-3"style={{ fontSize: '22px' }}>ระบบได้ทำการบันทึกเรียบร้อยแล้ว</p>
         

          <Button variant="sm"style={{ fontSize: '20px' }} className="btn-success btn-same-size" onClick={handleClose}>
          Ok
          </Button>
      </Modal.Body>
      </Modal>
        )}
   

    <Header header="ระบบการรับสมัครนักเรียน" subhead="จัดการช่วงการเปิดรับสมัครตามหลักสูตร" /> 
    <div
        style={{
          height: "100vh",
          fontFamily: "Kanit, sans-serif",
        }}
      >
        <div className="container">
          <div className="flex-column">
            <div className="justify-content-center">
              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ margin:"10px",fontSize: "25px", fontWeight: "bold" }}>
                  การเปิดรับสมัครตามหลักสูตร
                </h2>
              </div>

              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "20px" }}>
                <div className="card" style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
                  <div className="card-body">
                    <div className="form-group col-md-0 fone" style={{ padding: "10px" }}>
                    <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px',marginTop:"5px"}}>
                        <div>
                            <span style={{fontWeight:"bolder",fontSize:"20px",margin:"10px"}}>หลักสูตร</span>
                            </div>
                    <div className="dropdown" style={{ maxWidth: '100%'}}>
                            <select value={selectedCourse} onChange={handleSelectCourseChange}className="custom-select">
                                <option value="ทั้งหมด">ทั้งหมด</option>
                                <option value="English Program (EP)">English Program (EP)</option>
                                <option value="หลักสูตรทั่วไป">หลักสูตรทั่วไป</option>
                                {/* <option value="Regular Program">Regular Program</option> */}
                            </select>
                        </div>
                        {/* </div>
                        <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px',marginTop:"5px"}}> */}
                        <div>
                            <span style={{fontWeight:"bold",fontSize:"20px",margin:"10px"}}>เลือกช่วงในการเปิดรับสมัคร</span>
                            </div>
                            {/* </div>  
                            <div className="d-flex"style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px',marginTop:"5px"}}> */}
                        {/* <DateRangePicker_period/> */}
                        
                            <div className="align-items-center">
                            <DateRangePicker_period  id="DateRange "value={DateRange} onChange={handleDateRangeChange}/>
                            </div>
                       
                        <button 
                            type="submit" 
                            className="btn btn-primary custom-font" 
                            style={{
                                color: 'white',
                                fontSize: '16px',
                                textAlign: 'center',
                                marginLeft: 'auto'
                              }}
                            onClick={() => setshowConfirmModal(true)}
                      >
                          <span>บันทึก</span>
                      </button>
                      
                        </div>
                        </div>
                        </div>
                        </div>
                        {/* <div className="d-flex align-items-center"style={{ flexWrap: "wrap" ,marginTop:"20px"}}>
                        <span style={{ margin:"10px",fontWeight: "bold", fontSize: "25px" }}>โพสต์ประกาศหน้าหลักสูตร</span>
                      </div>
                        <div className="card" style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)",marginTop:"20px" }}>
                  <div className="card-body">
                        <div className="d-flex align-items-center"style={{ flexWrap: "wrap" }}>
                        <span style={{ margin: "10px", fontWeight: "bold", fontSize: "20px" }}>เนื้อหาประกาศ</span>
                      </div>

                      <div className="d-flex align-items-center" style={{flexWrap: "wrap" }}>
                      <textarea
                            type="text"
                            className="form-control"
                            id="course"
                            name="course"
                            value={Post}
                            onChange={handlePostChange}
                            required
                            ref={PostRef}
                            style={{border: '1px solid #ccc'}}
                            />
                      </div>
                      <br />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>

                          <button 
                              type="submit" 
                              className="btn btn-primary custom-font" 
                              style={{
                              ...fontStyle, 
                              color: 'white', 
                              fontSize: '16px', 
                              textAlign: 'center', 

                              width:"100%"

                              }}
                            onClick={handleSubmitPost}
                          >
                              <span>บันทึก</span>
                          </button>
                       

                      </div>

                    </div>
                  </div> */}
                
                <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
                  ช่วงการเปิดรับสมัครตามหลักสูตร
                </h2>
              </div>
                <br />
              <div className="container align-items-center"style={{marginTop: "20px" }}>
                           
                            <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                                    <thead>
                                        <tr style={{ height: '50px',backgroundColor: '#FFFFFF', fontWeight: 'bold',fontSize:"18px"  }}>
                                            <th rowSpan="1" >หลักสูตรที่</th>
                                            <th rowSpan="1">ชื่อหลักสูตร</th>
                                            <th rowSpan="1" >ช่วงที่เปิดรับสมัคร</th>
                                            {/* <th rowSpan="1" ></th> */}
                                            

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {CourseData.map((row,index) => (
                                            <tr key={row.id} style={{ height: '50px' }}>
                                            <td >{index+1}</td>
                                            <td >
                                                {
                                                row.course
                                                }
                                            </td>
                                            <td>
                                              {row.DateStart} - {row.DateEnd}
                                            </td>
                                            {/* <td >
                                                {
                                                row.DateEnd
                                                }
                                            </td> */}
                                            
                                            
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>
                                
                                <br />
                                
                            </div>
                        </div>
                        </div>
                


              </div>



              
              </div>
              </div>
              </div>
              </div>
              </>
  )
}

export default OpenCourse_period