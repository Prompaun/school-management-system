import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, RouterProvider, Routes, Navigate, createBrowserRouter, createRoutesFromElements, Link } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Login_student from './pages/login_student';
import Login_parent from './pages/Login_parent';
import Student_menu from './pages/Student_menu';
import Checkgrade from './pages/Checkgrade';
import Parent_menu from './pages/Parent_menu';
import Request_cert from './pages/Request_cert';
import History_request from './pages/History_request';
import NewUser_menu from './pages/NewUser_menu';
import Open_course from './pages/Open_course';
import CheckEnroll_status from './pages/CheckEnroll_status';
// import Class_instructor_menu from './pages/Class_instructor_menu';
import Login_personnel from './pages/Login_personnel';
// import Subject_instructor_menu from './pages/Subject_Instructor_menu';
import Education_information from './pages/Education_information';
import Student_List_Information from './pages/Student_List_Information';
import Filter_student_information from './pages/Filter_student_information';
import Subject_Score_Record from './pages/Subject_Score_Record';
import Personnel_page from './pages/Personnel_page';
import Check_Certification_Request from './pages/Check_Certification_Request';
import Check_Applicant_Information from './pages/Check_Applicant_Information';
import Upload_Enrollment_Status from './pages/Upload_Enrollment_Status';
import Enrollment_Status from './pages/Enrollment_Status';
import Admission_Results from './pages/Admission_Results';
import Parent_Information from './pages/Parent_Information';
import Student_Information from './pages/Student_Information';
import UploadScores_According_toApplicantNames from './pages/UploadScores_According_toApplicantNames';
import Student_Address from './pages/Student_Address';
import Manage_health_data from './pages/Manage_health_data';
// import Sidebar from './components/Sidebar';
import Student_info from './pages/Student_info';
import Result_health_data from './pages/Result_health_data';
import Medical_History from './pages/Medical_History';
import Health_Checkup from './pages/Health_Checkup';
import Health_info from './pages/Health_info';
import Check_health_result from './pages/Check_health_result';
import Enrollment_info from './pages/Enrollment_info';
import Growth_nutrition from './pages/Growth_nutrition';
import Personnel_menu from './pages/Personnel_menu';
import Navbar from './components/Navbar';
import Register_info from './pages/Register_info';
// import GoogleDriveFileUploader from './pages/GoogleDriveFileUploader';
import Tab_enroll from './components/Tab_enroll';
import Checkgrade_info from './pages/Checkgrade_info';
import Enrollment_info_EP from './pages/Enrollment_info_EP';
import PostNews from './pages/PostNews';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path ="/Login/Login_student" element={<Login_student />} />
        <Route path ="/Login/Login_parent" element={<Login_parent />} />

        {/* <Route path ="/Login/login_student/Student_menu" element={<Student_menu />} />
        <Route path ="/Login/Login_parent/Parent_menu" element={<Parent_menu />} /> */}
        
        <Route path="/Register" element={<Register />} />
        <Route path="/NewUser_menu" element={<NewUser_menu />} />
        {/* <Route path="/Tab_enroll" element={<Tab_enroll />} /> */}

        <Route path="/Open_course" element={<Open_course />} />
        <Route path="/Enrollment_info" element={<Enrollment_info />} />
        <Route path="/CheckEnroll_status" element={<CheckEnroll_status/>} />
        
        <Route path="/Student_menu" element={<Student_menu />} />
        <Route path="/Parent_menu" element={<Parent_menu />} />
        <Route path="/Checkgrade" element={<Checkgrade/>} />
        <Route path="/Request_cert" element={<Request_cert/>} />
        <Route path="/History_request" element={<History_request/>} />
        <Route path="/Health_result" element={<Check_health_result/>} />

        <Route path ="/Login_personnel" element={<Login_personnel />} />
       
        {/* <Route path="/Login_personnel/Class_instrctor_menu" element={<Class_instructor_menu />} /> */}
        <Route path="/Personnel_menu" element={<Personnel_menu/>} />

        <Route path="/Education_information" element={<Education_information />} />
        <Route path="/Student_List_Information" element={<Student_List_Information />} />
        <Route path="/Filter_student_information" element={<Filter_student_information />} />
        <Route path="/Personnel_page" element={<Personnel_page />} />
        {/* <Route path="/Sidebar" element={<Sidebar />} /> */}

        <Route path="/Subject_Score_Record" element={<Subject_Score_Record />} />
        
        <Route path="/Check_Certification_Request" element={<Check_Certification_Request />} />
        <Route path="/Check_Applicant_Information" element={<Check_Applicant_Information />} />
        <Route path="/Enrollment_Status" element={<Enrollment_Status />} />
        <Route path="/Upload_Enrollment_Status" element={<Upload_Enrollment_Status />} />
        <Route path="/Upload_applicant_scores" element={<UploadScores_According_toApplicantNames />} />
        <Route path="/Admission_Results" element={<Admission_Results />} />
        <Route path="/Manage_health_data" element={<Manage_health_data />} />

        <Route path="/Student_info" element={<Student_info />} />
        <Route path="/Parent_Information" element={<Parent_Information />} />
        <Route path="/Student_Information" element={<Student_Information />} />
        <Route path="/Student_Address" element={<Student_Address />} />

        <Route path="/Health_info" element={<Health_info />} />
        <Route path="/Medical_History" element={<Medical_History />} />
        <Route path="/Result_health_data" element={<Result_health_data />} />
        <Route path="/Health_Checkup" element={<Health_Checkup />} />
        <Route path="/Growth_nutrition" element={<Growth_nutrition />} />
        {/* <Route path="/ParentsInfo" element={<ParentsInfo />} /> */}
        {/* <Route path ="/GoogleDriveFileUploader" element={<GoogleDriveFileUploader />} /> */}

    </>
  )
)

// Main App component
function App() {
  
  const [user, setUser] = useState(null);

  async function addParentLogin(avatar, email, token) {
    try {
        const response = await axios.post('http://localhost:8080/add-parent-login', {
            Avatar: avatar,
            Email: email,
            Token: token
        });

        console.log(response.data); // แสดงผลลัพธ์ที่ได้รับจากเซิร์ฟเวอร์
    } catch (error) {
        console.error('เคยบันทึกข้อมูลแล้ว');
    }
  }

  // const user = false;
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:5000/auth/login/success", {
          withCredentials: true,
        });
        if (response.status === 200) {
          const resObject = response.data;
          console.log(resObject); // ตรวจสอบข้อมูลที่ได้รับกลับมาจาก API endpoint
          setUser(resObject.user); // ตั้งค่าข้อมูลผู้ใช้ในตัวแปร user
          console.log("User ID:", resObject.user.id);
          console.log("User Avatar:", resObject.user.photos[0].value);
  
          // เรียกใช้ฟังก์ชัน addParentLogin ด้วยข้อมูลผู้ใช้
          await addParentLogin(
            resObject.user.photos[0].value,
            resObject.user.emails[0].value,
            resObject.user.id
          );
        } else {
          throw new Error("authentication has been failed!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  
  // if (user && user.emails[0].value) {
  //   console.log(user.emails[0].value);
  // } else {
  //   console.log('User email is not available.');
  // }
  


  return (
      <>
      <BrowserRouter>
      

      <Navbar user={user}/>
        {/* <RouterProvider router={router}> */}
          
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path ="/Login/Login_student" element={<Login_student />} />
            <Route
              exact
              path="/Login/Login_parent"
              element={user ? <Navigate to="/Parent_menu" /> : <Login_parent />}
            />
            <Route path="/Parent_menu" element={<Parent_menu />} />
        
        <Route path="/Register_info" element={<Register_info />} />
        <Route
              exact
              path="/Register"
              element={user ? <Navigate to="/Register_info" /> : <Register />}
            />
        <Route path="/NewUser_menu" element={<NewUser_menu />} />
        {/* <Route path="/Tab_enroll" element={<Tab_enroll />} /> */}
        {/* <Route path="/Tab_enroll" element={<Tab_enroll user={user} />} /> */}
        <Route path="/Tab_enroll" element={<Tab_enroll user={user} />} />

        <Route path="/Open_course" element={<Open_course />} />
        <Route path="/Enrollment_info" element={<Enrollment_info user={user} />} />
        <Route path="/Enrollment_info_EP" element={<Enrollment_info_EP user={user} />} />

        <Route path="/CheckEnroll_status" element={<CheckEnroll_status/>} />
        
        <Route path="/Student_menu" element={<Student_menu />} />
        <Route path="/Checkgrade_info" element={<Checkgrade_info />} />

        <Route path="/Parent_menu" element={<Parent_menu />} />
        <Route path="/Checkgrade" element={<Checkgrade/>} />
        <Route path="/Request_cert" element={<Request_cert/>} />
        <Route path="/History_request" element={<History_request/>} />
        <Route path="/Health_result" element={<Check_health_result/>} />

        <Route path ="/Login_personnel" element={<Login_personnel />} />
       
        {/* <Route path="/Login_personnel/Class_instrctor_menu" element={<Class_instructor_menu />} /> */}
        <Route path="/Personnel_menu" element={<Personnel_menu/>} />

        <Route path="/Education_information" element={<Education_information />} />
        <Route path="/Student_List_Information" element={<Student_List_Information />} />
        <Route path="/Filter_student_information" element={<Filter_student_information />} />
        <Route path="/Personnel_page" element={<Personnel_page />} />
        {/* <Route path="/Sidebar" element={<Sidebar />} /> */}

        <Route path="/Subject_Score_Record" element={<Subject_Score_Record />} />
        
        <Route path="/Check_Certification_Request" element={<Check_Certification_Request />} />
        <Route path="/Check_Applicant_Information" element={<Check_Applicant_Information />} />
        <Route path="/Enrollment_Status" element={<Enrollment_Status />} />
        <Route path="/Upload_Enrollment_Status" element={<Upload_Enrollment_Status />} />
        <Route path="/Upload_applicant_scores" element={<UploadScores_According_toApplicantNames />} />
        <Route path="/Admission_Results" element={<Admission_Results />} />
        <Route path="/Manage_health_data" element={<Manage_health_data />} />
        <Route path="/PostNews" element={<PostNews />} />


        <Route path="/Student_info" element={<Student_info />} />
        <Route path="/Parent_Information" element={<Parent_Information />} />
        <Route path="/Student_Information" element={<Student_Information />} />
        <Route path="/Student_Address" element={<Student_Address />} />

        <Route path="/Health_info" element={<Health_info />} />
        <Route path="/Medical_History" element={<Medical_History />} />
        <Route path="/Result_health_data" element={<Result_health_data />} />
        <Route path="/Health_Checkup" element={<Health_Checkup />} />
        <Route path="/Growth_nutrition" element={<Growth_nutrition />} />
          </Routes>
        {/* </RouterProvider> */}
        </BrowserRouter>
        </>
    
  );
}

export default App;