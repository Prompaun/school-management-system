import React, { useEffect, useState, createContext } from 'react';
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
import OpenCourse_period from './pages/OpenCourse_period';
import TemplateRequestStudent from './components/TemplateRequestStudent';
import AddStudentID from './pages/AddStudentID';
import ManageStudentClass from './pages/ManageStudentClass';

export const UserContext = createContext();

// Main App component
function App() {
  const apiUrl = process.env.API_URL


  // const apiUrl = "http://localhost:8080"
  console.log('apiUrl',apiUrl);
//   const ClientID = process.env.GOOGLE_CLIENT_ID;
// console.log(ClientID,"ClientID")

  const [user, setUser] = useState(null);
  const [studentUser, setstudentUser] = useState(null);
  const [Role, setRole] = useState('');
  const [login_Email, setlogin_Email] = useState('');
  
  async function addParentLogin(avatar, email, token) {
    try {
        const response = await axios.post(apiUrl + '/add-parent-login', {
            Avatar: avatar,
            Email: email,
            Token: token
        });

        console.log(response.data); // แสดงผลลัพธ์ที่ได้รับจากเซิร์ฟเวอร์
    } catch (error) {
        console.error('เคยบันทึกข้อมูลแล้ว');
    }
  }

  async function getRole(email) {
    try {
        const response = await axios.get(apiUrl + `/get-role/${email}`);
        return response.data.role; // return role from response
    } catch (error) {
        console.error('Error fetching role:', error);
        throw error;
    }
}


const [profile, setProfile] = useState(null);
const isLoggedIn = profile !== null;
const updateProfile = (newProfile) => {
  setProfile(newProfile);
  console.log("app updateProfile", newProfile)
};

  // const user = false;
  useEffect(() => {
    // if (user !== null){
      const handleGetRole = async (email) => {
        // const email = 'john.doe@example.com'; 
        try {
            const role = await getRole(email);
            console.log('Role:', role);
            setRole(role);
            // ทำสิ่งที่ต้องการด้วย role ที่ได้รับ
        } catch (error) {
            // console.error('Failed to get role:', error);
            console.log('error:', error);
        }
      // }
    }
    

    const getUser = async () => {
      try {
          if(profile){
            setUser(profile);
            handleGetRole(profile.email);
            setlogin_Email(profile.email);
            await addParentLogin(
              resObject.user.photos[0].value,
              resObject.user.emails[0].value,
              resObject.user.id
            );
          }
          
      } catch (error) {
        console.log('error',error);
      }
    };
    getUser();

  }, [profile]);
    
  //   const getUser = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/auth/login/success", {
  //         withCredentials: true,
  //       });
  //       console.log("Hiiii");
  //       if (response.status === 200) {
  //         const resObject = response.data;
  //         console.log(resObject); // ตรวจสอบข้อมูลที่ได้รับกลับมาจาก API endpoint
  //         setUser(resObject.user); // ตั้งค่าข้อมูลผู้ใช้ในตัวแปร user
  //         console.log("User ID:", resObject.user.id);
  //         console.log("User Avatar:", resObject.user.photos[0].value);

  //         handleGetRole(resObject.user.emails[0].value);
  //         // setRole("ClassTeacher");
  //         // console.log(user.emails[0].value);
  //         setlogin_Email(resObject.user.emails[0].value);
  //         // เรียกใช้ฟังก์ชัน addParentLogin ด้วยข้อมูลผู้ใช้
  //         await addParentLogin(
  //           resObject.user.photos[0].value,
  //           resObject.user.emails[0].value,
  //           resObject.user.id
  //         );
  //       } else {
  //         throw new Error("authentication has been failed!");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser();

  // }, []);

  useEffect(() => {
    console.log('appppp',Role, user)
    setUser(user);
  }, [Role, user])

  


  return (
    <>
    <BrowserRouter>
    <Navbar user={user} studentUser={studentUser} Role={Role} />
      <UserContext.Provider value={{ Role, setRole, user, setUser, studentUser, setstudentUser}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          {/* <Route path ="/Login/Login_student" /> */}
          <Route path ="/Login/Login_student" element={<Login_student />} />
          <Route
            exact
            path="/Login/Login_parent_personnel"
            element={user ? <Navigate to="/Parent_menu" /> : <Login_parent updateProfile={updateProfile}/>}
          />

          <Route path ="/Login_personnel" element={<Login_personnel />} />

        {user ? (
          <>
          
            {/* <Route path="/Parent_menu" element={<Parent_menu />} /> */}
        
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

            <Route path="/CheckEnroll_status" element={<CheckEnroll_status Email={login_Email}/>} />
            
            <Route path="/Student_menu" element={<Student_menu />} />
            <Route path="/Checkgrade_info" element={<Checkgrade_info login_Email={login_Email}/>} />

            <Route path="/Parent_menu" element={<Parent_menu Role={Role}/>} />
            <Route path="/Checkgrade" element={<Checkgrade user={user} Role={Role}/>} />
            <Route path="/Request_cert" element={<Request_cert login_Email={login_Email}/>} />
            <Route path="/History_request" element={<History_request login_Email={login_Email}/>} />
            <Route path="/Health_result" element={<Check_health_result login_Email={login_Email}/>} />

            {/* <Route path ="/Login_personnel" element={<Login_personnel />} /> */}
          
            {/* <Route path="/Login_personnel/Class_instrctor_menu" element={<Class_instructor_menu />} /> */}
            <Route path="/Personnel_menu" element={<Personnel_menu Role={Role}/>} />

            <Route path="/Education_information" element={<Education_information />} />
            <Route path="/Student_List_Information" element={<Student_List_Information />} />
            <Route path="/Filter_student_information" element={<Filter_student_information login_Email={login_Email}/>} />
            <Route path="/Personnel_page" element={<Personnel_page />} />
            {/* <Route path="/Sidebar" element={<Sidebar />} /> */}

            <Route path="/Subject_Score_Record" element={<Subject_Score_Record Role={Role} Email={login_Email}/>} />
            
            <Route path="/Check_Certification_Request" element={<Check_Certification_Request />} />
            <Route path="/Check_Applicant_Information" element={<Check_Applicant_Information />} />
            <Route path="/OpenCourse_period" element={<OpenCourse_period />} />
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


            <Route path="/AddStudentID" element={<AddStudentID />} />
            <Route path="/ManageStudentClass" element={<ManageStudentClass />} />


          </>
        ) : (
            // ส่วนเส้นทางที่ใช้เมื่อไม่มีผู้ใช้ล็อคอิน
            <Route path="/" element={<Navigate to="/Login" />} />
        )}
        {/* <Route
            path="/*"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Navigate to="/Login" />
              )
            }
          /> */}
            </Routes>
        </UserContext.Provider>

        {/* </RouterProvider> */}
      </BrowserRouter>
    </>
    
  );
}

export default App;