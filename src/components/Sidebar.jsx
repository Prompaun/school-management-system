import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import logoImage from '../images/IMG_5416.png';

function Sidebar() {
  const linkStyle = {
    color: 'gray',
    textDecoration: 'none',
    fontFamily: 'Kanit, sans-serif',
    fontSize: '16px',
  };
  // const [isOpen, setIsopen] = useState(false);

  // const ToggleSidebar = () => {
  //     isOpen === true ? setIsopen(false) : setIsopen(true);
  // }
  const onExpandChange = e => {
    e.preventDefault();
    setExpand(expanded => !expanded);
  };
  return (
    <>

      {/* <div className="container-fluid" style={{ fontFamily: 'Kanit, sans-serif' }}>
        <div className="row flex-nowrap"> */}
          {/* <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark" style={{ fontFamily: 'Kanit, sans-serif' }}> */}
          <div className="col-auto col-md-3 col-xl-2 bg-dark" style={{ fontFamily: 'Kanit, sans-serif' }}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-4 text-white min-vh-100">
              <br />
              
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                {/* <li className="nav-item">
                  <a href="/personnel_page" id="personnel_home-tab" className="nav-link align-middle px-0" aria-controls="personnel_home" aria-selected="true">
                    <i className="fs-5 bi-house"></i> <span className="ms-1 d-none d-sm-inline" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      หน้าหลัก
                    </span>
                  </a>
                </li> */}
                {/* <br /> */}
                <li>
                  <a href="/Filter_student_information" id="search_info-tab" className="nav-link align-middle px-0"  aria-controls="search_info" aria-selected="false">
                    <i className="fs-5 bi-search"></i> <span className="ms-1 d-none d-sm-inline" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      ระบบจัดการสารสนเทศ
                    </span>
                  </a>
                </li>
                <br />
                <li >
                  <a href="#submenu1" className="nav-link px-0 align-middle" data-bs-toggle="collapse">
                    <i className="fs-5 bi-database"></i> <span className="ms-1 d-none d-sm-inline" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      ระบบจัดการข้อมูลการศึกษา
                    </span>
                  </a>
                  <ul className="collapse nav flex-column ms-1" id="submenu1" >
                    <li className="nav-item">
                      <a href="/Subject_Score_Record" id="Grade_record-tab" className="nav-link px-0"  aria-controls="Grade_record" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          บันทึกคะแนนรายวิชา
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <br />
                <li >
                  <a href="#submenu4" className="nav-link px-0 align-middle" data-bs-toggle="collapse">
                    <i className="fs-5 bi-file-earmark-medical"></i> <span className="ms-1 d-none d-sm-inline" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      ระบบจัดการข้อมูลสุขภาพ
                    </span>
                  </a>
                  <ul className="collapse nav flex-column ms-1" id="submenu4" >
                    <li className="nav-item">
                      <a href="/Manage_health_data" id="health_data-tab" className="nav-link px-0"  aria-controls="health_data" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          อัปโหลดข้อมูลสุขภาพ
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <a href="#submenu2" className="nav-link px-0 align-middle" data-bs-toggle="collapse" >
                    <i className="fs-5 bi-inbox-fill"></i> <span className="ms-1 d-none d-sm-inline" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      ระบบการออกใบรับรอง
                    </span>
                  </a>

                  <ul className="collapse nav flex-column ms-1" id="submenu2" >
                    <li className="nav-item">
                      <a href="/Check_Certification_Request" id="Check_Certification_Request-tab" className="nav-link px-0"  aria-controls="Check_Certification_Request" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          ตรวจสอบคำขอใบรับรอง
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <a href="#submenu3" id="Enroll_student-tab" className="nav-link px-0 align-middle" data-bs-toggle="collapse">
                    <i className="fs-5 bi-file-earmark-plus"></i> <span className="ms-1 d-none d-sm-inline" style={{ fontWeight: 'bold', fontSize: '20px' }}>
                      ระบบการรับสมัครนักเรียน
                    </span>
                  </a>
                  <ul className="collapse nav flex-column ms-1" id="submenu3" >
                    <li className="nav-item">
                      <a href="/Check_Applicant_Information" id="Check_enroll_info-tab" className="nav-link px-0"  aria-controls="Check_enroll_info" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          ตรวจสอบข้อมูลผู้สมัคร
                        </span>
                      </a>
                    </li>
                    </ul>
                  <ul className="collapse nav flex-column ms-1" id="submenu3" >
                    <li className="nav-item">
                      <a href="/Upload_applicant_scores" id="Upload_Exam_result-tab" className="nav-link px-0"  aria-controls="Upload_Exam_result" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          อัปโหลดผลคะแนนการสอบ
                        </span>
                      </a>
                    </li>
                  </ul>
                  <ul className="collapse nav flex-column ms-1" id="submenu3" >
                    <li className="nav-item">
                      <a href="/Admission_Results" id="Exam_result-tab" className="nav-link px-0"  aria-controls="Exam_result" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          ผลคะแนนการสอบรายบุคคล
                        </span>
                      </a>
                    </li>
                  </ul>
                  <ul className="collapse nav flex-column ms-1" id="submenu3" >
                    <li className="nav-item">
                      <a href="/Upload_Enrollment_Status" id="Upload_Enrollment_Status-tab" className="nav-link px-0"  aria-controls="Upload_Enrollment_Status" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          อัปโหลดสถานะการมอบตัว
                        </span>
                      </a>
                    </li>
                  </ul>
                  <ul className="collapse nav flex-column ms-1" id="submenu3" >
                    <li className="nav-item">
                      <a href="/Enrollment_Status" id="Enrollment_Status-tab" className="nav-link px-0"  aria-controls="Enrollment_Status" aria-selected="false">
                        <span className="d-none d-sm-inline" style={{ fontSize: '18px', marginLeft: '25px' }}>
                          สถานะการมอบตัวรายบุคคล
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          
        {/* </div>
      </div> */}
    </>
  );
}

export default Sidebar;
