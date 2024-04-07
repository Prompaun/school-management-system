import React, { useState, useEffect, useRef  } from 'react';

import NewStudent_info from '../pages/NewStudent_info';
import HouseholdInfo from '../pages/HouseholdInfo';
import ParentsInfo from '../pages/ParentInfo';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Tab_enroll({ user }) {
  const apiUrl = process.env.API_URL
  const linkStyle = {
      color: 'gray',
      textDecoration: 'none',
  };

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  const [activeTab, setActiveTab] = useState('menu1');

  const handleTabChange = (tabId) => {
      setActiveTab(tabId);
  };

  const [CurrentLogin_Email, setCurrentLogin_Email] = useState('');
  // console.log("user",user);


  const [studentData, setStudentData] = useState({});
    
  const [message, setMessage] = useState('');
  const [HelloWorld, setHelloWorld] = useState('');
  const [studentNID, setStudentNID] = useState('');
  const [nameTitle, setnameTitle] = useState('');
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName] = useState('');
  const [DateOfBirth, setDateOfBirth] = useState('');
  const [Transcript_type, setTranscript_type] = useState('');
  const [StudentImageFile, setStudentImageFile] = useState('');
  const [CopyofStudentIDCardFile, setCopyofStudentIDCardFile] = useState('');
  const [PreviousSchoolEducationalRecordsFile, setPreviousSchoolEducationalRecordsFile] = useState('');

  const [HouseNumber, setHouseNumber] = useState('');
  const [Moo, setMoo] = useState('');
  const [Soi, setSoi] = useState('');
  const [Road, setRoad] = useState('');
  const [Province, setProvince] = useState('');
  const [District, setDistrict] = useState('');
  const [SubDistrict, setSubDistrict] = useState('');
  const [HouseReg_file, setHouseReg_file] = useState('');

  const [FoundFather, setFoundFather] = useState(false);
  const [FoundMother, setFoundMother] = useState(false);
  const [FoundParent, setFoundParent] = useState(false);
  const [FoundParentData, setFoundParentData] = useState('');
  const [FatherEmail, setFatherEmail] = useState('');


  const [MotherEmail, setMotherEmail] = useState('');
  const [ParentEmail, setParentEmail] = useState('');

  const [isFatherRecordData, setIsFatherRecordData] = useState(false);
  const [FatherFirstname, setFatherFirstname] = useState('');
  const [FatherLastname, setFatherLastname] = useState('');
  const [FatherDateOfBirth, setFatherDateOfBirth] = useState('');
  const [isFatherForeigner, setIsFatherForeigner] = useState(false); // State สำหรับเก็บข้อมูลว่าเป็นคนต่างชาติหรือไม่
  const [FatherNationality, setFatherNationality] = useState(''); // State สำหรับเก็บข้อมูลสัญชาติ
  const [FatherOccupation, setFatherOccupation] = useState('');
  const [FatherOffice, setFatherOffice] = useState('');
  const [FatherTel, setFatherTel] = useState('');

  const [isMotherRecordData, setIsMotherRecordData] = useState(false);
  const [MotherFirstname, setMotherFirstname] = useState('');
  const [MotherLastname, setMotherLastname] = useState('');
  const [MotherDateOfBirth, setMotherDateOfBirth] = useState('');
  const [isMotherForeigner, setIsMotherForeigner] = useState(false); // State สำหรับเก็บข้อมูลว่าเป็นคนต่างชาติหรือไม่
  const [MotherNationality, setMotherNationality] = useState(''); // State สำหรับเก็บข้อมูลสัญชาติ
  const [MotherOccupation, setMotherOccupation] = useState('');
  const [MotherOffice, setMotherOffice] = useState('');
  const [MotherTel, setMotherTel] = useState('');

  const [isParentRecordData, setIsParentRecordData] = useState(false);
  const [ParentFirstname, setParentFirstname] = useState('');
  const [ParentLastname, setParentLastname] = useState('');
  const [ParentDateOfBirth, setParentDateOfBirth] = useState('');
  const [isParentForeigner, setIsParentForeigner] = useState(false); // State สำหรับเก็บข้อมูลว่าเป็นคนต่างชาติหรือไม่
  const [ParentNationality, setParentNationality] = useState(''); // State สำหรับเก็บข้อมูลสัญชาติ
  const [ParentOccupation, setParentOccupation] = useState('');
  const [ParentOffice, setParentOffice] = useState('');
  const [ParentTel, setParentTel] = useState('');
  const [ParentRole, setParentRole] = useState('');
  const [whoAreParent, setwhoAreParent] = useState(false);


  //  ฟังก์ชันสำหรับการแปลงวันที่ให้เป็นรูปแบบ "YYYY-MM-DD"
  const formatDate = (date) => {
      if (date !== ''){
        const year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      // 
      // console.log(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
      }
      else{
        return new Date();
      }
      
  };

//   const formatDate = (date) => {
//     if (!date || typeof date !== 'object' || !date.getFullYear) {
//         console.error('Invalid date object:', date);
//         return ''; // หรือเปลี่ยนเป็นค่าที่ถูกต้องตามสถานการณ์
//     }
//     const year = date.getFullYear();
//     let month = date.getMonth() + 1;
//     month = month < 10 ? '0' + month : month;
//     let day = date.getDate();
//     day = day < 10 ? '0' + day : day;
//     return `${year}-${month}-${day}`;
// };


  const [Enroll_Date, setEnroll_Date] = useState(formatDate(new Date()));  // สร้าง state เพื่อเก็บวันที่ปัจจุบัน
  const [Enroll_Course, setEnroll_Course] = useState("หลักสูตรทั่วไป");
  
 
  
  // สร้างฟังก์ชันสำหรับการแปลงค่าวันที่เป็นปี
  const getYearFromDate = (date) => {
      return date.getFullYear();
  };

  
  const [Enroll_Year, setEnroll_Year] = useState(getYearFromDate(new Date())); // เรียกใช้ฟังก์ชัน getYearFromDate เพื่อดึงปีจากวันที่ปัจจุบันและเก็บใน Enroll_Year
  
  // console.log('enroll year', Enroll_Year);

    const receiveStudentData = (data) => {
      setStudentData(data);
      // ไม่ควรตั้งค่า imageUploaded โดยตรงที่นี่
      // if (data.image) {
      //     setImageUploaded(true);
      // }
  };

  const [imageUploaded, setImageUploaded] = useState(false);

  const sendstudentNIDToEnroll = (studentNID) => {
    // console.log('Received studentNID:', studentNID);
    setStudentNID(studentNID);
  };

  const sendnameTitleToEnroll = (nameTitle) => {
    // console.log('Received nameTitle:', nameTitle);
    setnameTitle(nameTitle);
  };

  const sendFirstNameToEnroll = (FirstName) => {
    // console.log('Received name:', FirstName);
    setFirstName(FirstName);
  };

  const sendLastNameToEnroll = (LastName) => {
    // console.log('Received LastNamee:', LastName);
    setLastName(LastName);
  };

  const sendDateOfBirthToEnroll = (dateOfBirth) => {
    // console.log('Received dateOfBirth:', dateOfBirth);
    setDateOfBirth(dateOfBirth);
  };

  const sendTranscript_typeToEnroll = (Transcript_type) => {
    // console.log('Received Transcript_type:', Transcript_type);
    setTranscript_type(Transcript_type);
  };

  const sendCopyofStudentIDCardFileToEnroll = (fileData) => {
    // console.log('Received fileData:', fileData);
    setCopyofStudentIDCardFile(fileData);
  };

  const sendImageDataToEnroll = (fileData) => {
    // console.log('Received image data:', fileData);
    setStudentImageFile(fileData); // เก็บค่า imageData ลงใน state StudentImageFile
    setImageUploaded(true); // ตั้งค่า imageUploaded เมื่อได้รับรูปภาพ
  };

  const sendPreviousSchoolEducationalRecordsFileToEnroll = (fileData) => {
    // console.log('Received fileData:', fileData);
    setPreviousSchoolEducationalRecordsFile(fileData);
  };

  //household Info file
  const sendHouseNumberToEnroll = (HouseNumber) => {
    // console.log('Received HouseNumber:', HouseNumber);
    setHouseNumber(HouseNumber);
  };

  const sendMooToEnroll = (Moo) => {
    // console.log('Received Moo:', Moo);
    setMoo(Moo);
  };

  const sendSoiToEnroll = (Soi) => {
    // console.log('Received Soi:', Soi);
    setSoi(Soi);
  };

  const sendRoadToEnroll = (Road) => {
    // console.log('Received Road:', Road);
    setRoad(Road);
  };

  const sendProvinceToEnroll = (Province) => {
    // console.log('Received Province:', Province);
    setProvince(Province);
  };

  const sendDistrictToEnroll = (District) => {
    // console.log('Received District:', District);
    setDistrict(District);
  };

  const sendSubDistrictToEnroll = (SubDistrict) => {
    // console.log('Received SubDistrict:', SubDistrict);
    setSubDistrict(SubDistrict);
  };

  const sendHouseReg_fileToEnroll = (HouseReg_file) => {
    // console.log('Received HouseReg_file:', HouseReg_file);
    setHouseReg_file(HouseReg_file);
  };

  //Parent Info file
  const sendFatherEmailToEnroll = (FatherEmail) => {
    // console.log('Received FatherEmail:', FatherEmail);
    setFatherEmail(FatherEmail);
  };

  const sendMotherEmailToEnroll = (MotherEmail) => {
    // console.log('Received Mother_Email:', MotherEmail);
    setMotherEmail(MotherEmail);
  };

  const sendParentEmailToEnroll = (ParentEmail) => {
    // console.log('Received ParentEmail:', ParentEmail);
    setParentEmail(ParentEmail);
  };
///////////////////////////////////////////////////////////////////////////////////////////////////
  const sendisFatherRecordDataToEnroll= (isFatherRecordData) => {
    // console.log('Received isFatherRecordData:', isFatherRecordData);
    setIsFatherRecordData(isFatherRecordData);
  };

  const sendisMotherRecordDataToEnroll= (isMotherRecordData) => {
    // console.log('Received isMotherRecordData:', isMotherRecordData);
    setIsMotherRecordData(isMotherRecordData);
  };

  const sendisParentRecordDataToEnroll= (isParentRecordData) => {
    console.log('Received isParentRecordData:', isParentRecordData);
    setIsParentRecordData(isParentRecordData);
  };
///////////////////////////////////////////////////////////////////////////////////////////////////
  const sendFatherFirstnameToEnroll = (FatherFirstname) => {
    // console.log('Received FatherFirstname:', FatherFirstname);
    setFatherFirstname(FatherFirstname);
  };

  const sendFatherLastnameToEnroll = (FatherLastname) => {
    // console.log('Received FatherLastname:', FatherLastname);
    setFatherLastname(FatherLastname);
  };

  const sendFatherDateOfBirthToEnroll = (FatherDateOfBirth) => {
    // console.log('Received FatherDateOfBirth:', FatherDateOfBirth);
    setFatherDateOfBirth(FatherDateOfBirth);
  };

  const sendisFatherForeignerToEnroll = (IsFatherForeigner) => {
    console.log('Received isFatherForeigner:', IsFatherForeigner);
    setIsFatherForeigner(IsFatherForeigner);
  };

  const sendFatherNationalityToEnroll = (FatherNationality) => {
    // console.log('Received FatherNationality:', FatherNationality);
    setFatherNationality(FatherNationality);
  };

  const sendFatherOccupationToEnroll = (FatherOccupation) => {
    // console.log('Received FatherOccupation:', FatherOccupation);
    setFatherOccupation(FatherOccupation);
  };

  const sendFatherOfficeToEnroll = (FatherOffice) => {
    // console.log('Received FatherOffice:', FatherOffice);
    setFatherOffice(FatherOffice);
  };

  const sendFatherTelToEnroll = (FatherTel) => {
    // console.log('Received FatherTel:', FatherTel);
    setFatherTel(FatherTel);
  };

///////////////////////////////////////////////////////////////////////////////////////////////////

const sendMotherFirstnameToEnroll = (MotherFirstname) => {
  // console.log('Received MotherFirstname:', MotherFirstname);ฝ
  setMotherFirstname(MotherFirstname);
};

const sendMotherLastnameToEnroll = (MotherLastname) => {
  // console.log('Received MotherLastname:', MotherLastname);
  setMotherLastname(MotherLastname);
};

const sendMotherDateOfBirthToEnroll = (MotherDateOfBirth) => {
  // console.log('Received MotherDateOfBirth:', MotherDateOfBirth);
  setMotherDateOfBirth(MotherDateOfBirth);
};

const sendisMotherForeignerToEnroll = (IsMotherForeigner) => {
  console.log('Received IsMotherForeigner:', IsMotherForeigner);
  
  setIsMotherForeigner(IsMotherForeigner);
};

const sendMotherNationalityToEnroll = (MotherNationality) => {
  // console.log('Received MotherNationality:', MotherNationality);
  setMotherNationality(MotherNationality);
};

const sendMotherOccupationToEnroll = (MotherOccupation) => {
  // console.log('Received MotherOccupation:', MotherOccupation);
  setMotherOccupation(MotherOccupation);
};

const sendMotherOfficeToEnroll = (MotherOffice) => {
  // console.log('Received MotherOffice:', MotherOffice);
  setMotherOffice(MotherOffice);
};

const sendMotherTelToEnroll = (MotherTel) => {
  // console.log('Received MotherTel:', MotherTel);
  setMotherTel(MotherTel);
};
///////////////////////////////////////////////////////////////////////////////////////////////////
const sendParentFirstnameToEnroll = (ParentFirstname) => {
  // console.log('Received ParentFirstname:', ParentFirstname);
  setParentFirstname(ParentFirstname);
};

const sendParentLastnameToEnroll = (ParentLastname) => {
  // console.log('Received ParentLastname:', ParentLastname);
  setParentLastname(ParentLastname);
};

const sendParentDateOfBirthToEnroll = (ParentDateOfBirth) => {
  // console.log('Received ParentDateOfBirth:', ParentDateOfBirth);
  setParentDateOfBirth(ParentDateOfBirth);
};

const sendisParentForeignerToEnroll = (IsParentForeigner) => {
  // console.log('Received IsParentForeigner:', IsParentForeigner);
  setIsParentForeigner(IsParentForeigner);
};

const sendParentNationalityToEnroll = (ParentNationality) => {
  console.log('Received ParentNationality:', ParentNationality);
  setParentNationality(ParentNationality);
};

const sendParentOccupationToEnroll = (ParentOccupation) => {
  // console.log('Received ParentOccupation:', ParentOccupation);
  setParentOccupation(ParentOccupation);
};

const sendParentOfficeToEnroll = (ParentOffice) => {
  // console.log('Received ParentOffice:', ParentOffice);
  setParentOffice(ParentOffice);
};

const sendParentTelToEnroll = (ParentTel) => {
  // console.log('Received ParentTel:', ParentTel);
  setParentTel(ParentTel);
};

const sendParentRoleToEnroll = (ParentRole) => {
  // console.log('Received ParentRole:', ParentRole);
  setParentRole(ParentRole);
};

const sendwhoAreParentToEnroll = (whoAreParent) => {
  // console.log('Received whoAreParent:', whoAreParent);
  setwhoAreParent(whoAreParent);
};
///////////////////////////////////////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  const handleSubmit = async (StudentImageFile, CopyofStudentIDCardFile, PreviousSchoolEducationalRecordsFile, studentNID, nameTitle, FirstName, LastName, DateOfBirth, Transcript_type, HouseNumber, Moo, Soi, Road, Province, District, SubDistrict, HouseReg_file) => {
    // const confirmSubmit = window.confirm("ยืนยันที่จะส่งข้อมูลหรือไม่?");
    // if (confirmSubmit) {
      try {
          // แสดงกล่องข้อความยืนยันและตรวจสอบผลลัพธ์
          const formData = new FormData();
          formData.append('file', StudentImageFile);
          formData.append('file', CopyofStudentIDCardFile);
          formData.append('file', PreviousSchoolEducationalRecordsFile);
          
          // เพิ่มข้อมูลของนักเรียนเข้าไปใน formData
          formData.append('Student_NID', studentNID);
          formData.append('NameTitle', nameTitle);
          formData.append('FirstName', FirstName);
          formData.append('LastName', LastName);
          formData.append('Student_DOB', DateOfBirth);
          formData.append('Transcript_type', Transcript_type);
          formData.append('ParentEmail', CurrentLogin_Email);

          formData.append('HouseNumber', HouseNumber);
          formData.append('Moo', Moo || '-');
          formData.append('Soi', Soi || '-');
          formData.append('Road', Road || '-');
          formData.append('Province', Province);
          formData.append('District', District);
          formData.append('SubDistrict', SubDistrict);
          formData.append('file', HouseReg_file);
    

          await axios.post(apiUrl + '/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
    
          setMessage('Successfully uploaded to drive');
          navigate("/NewUser_menu");
        
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // setMessage('Identification number already exists. Please try with a different one.');
          // alert('Identification number already exists. Please try with a different one.');
        } else {
          setMessage('Was not uploaded' + error);
          console.error(error);
        }
      }
    // }
  };

  async function checkEnrollment(Student_NID, Enroll_Date, Enroll_Year, Enroll_Course) {
    try {
        const check_enrollment_response = await axios.get(apiUrl + `/check-student-enrollment?Student_NID=${Student_NID}&Enroll_Year=${Enroll_Year}&Enroll_Course=${Enroll_Course}`);
        const data = check_enrollment_response.data;

        if (data.length > 0) {
            // หากมีข้อมูลในฐานข้อมูล
            alert('ท่านเคยสมัครหลักสูตร ' + Enroll_Course + ' ในปีการศึกษา ' + Enroll_Year + ' แล้ว');
        } else {
            // หากไม่พบข้อมูลในฐานข้อมูล
            try {
                // ส่งข้อมูลไปยัง API ด้วย Axios
                const formData = {
                    Student_NID: Student_NID,
                    Enroll_Date: Enroll_Date,
                    Enroll_Year: Enroll_Year,
                    Enroll_Course: Enroll_Course,
                    Enroll_Status: "รอการสอบคัดเลือก"
                };
                // console.log("Enroll_Date",Enroll_Date);
                const save_enrollment_response = await axios.post(apiUrl + '/enrollment', formData);
                console.log(save_enrollment_response.data.message); // พิมพ์ข้อความตอบกลับจาก API ใน console

            } catch (error) {
                console.error('Error adding enrollment:', error);
            }
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียกใช้ API:', error);
    }
  }

  const addParentEmails = async (Student_NID, first_ParentEmail, second_ParentEmail, third_ParentEmail) => {
    try {
        // สร้างข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
        const requestData = {
            Student_NID: Student_NID,
            first_ParentEmail: first_ParentEmail,
            second_ParentEmail: second_ParentEmail,
            third_ParentEmail: third_ParentEmail
        };

        // เรียกใช้ API สำหรับเพิ่มอีเมล์ของผู้ปกครอง
        const response = await axios.post(apiUrl + '/add-parent-emails', requestData);
        
        // หากสำเร็จ
        console.log(response.data.message);
        return response.data.message;
    } catch (error) {
        // หากเกิดข้อผิดพลาด
        console.error('Error adding parent emails:', error);
        // throw error;
    }
};

  const addParentInformation = async (Avatar, Email, FirstName, LastName, DateOfBirth, Nationality, Office, Occupation, Role, Tel) => {
    try {
      const parentData = [{
        Avatar: Avatar,
        Email: Email,
        FirstName: FirstName,
        LastName: LastName,
        DateOfBirth: DateOfBirth,
        Nationality: Nationality,
        Office: Office,
        Occupation: Occupation,
        Role: Role,
        Tel: Tel
      }];
        const response = await axios.post(apiUrl + '/Parent_information', parentData);
        console.log(response.data.message);
        return response.data.message;
    } catch (error) {
        if (error.response) {
            // มีการตอบสนองจากเซิร์ฟเวอร์ แต่ค่าสถานะไม่เป็น 200
            console.error('Failed to add parent information:', error.response.data.error);
            // throw new Error(error.response.data.error);
        } else if (error.request) {
            // ไม่มีการรับข้อมูลจากเซิร์ฟเวอร์
            console.error('No response received from server:', error.request);
            // throw new Error('No response received from server');
        } else {
            // เกิดข้อผิดพลาดในการกำหนดค่าการส่งข้อมูลหรือปัญหาอื่น ๆ
            console.error('Error adding parent information:', error.message);
            // throw error;
        }
    }
  };

  
  // const handleButtonClick = async () => {

    // const parentData = [{
    //   Avatar: 'hh',
    //   FirstName: 'hh',
    //   LastName: 'hh',
    //   Age: '4',
    //   Nationality: 'hh',
    //   Office: 'h',
    //   Occupation: 'h',
    //   Role: 'h',
    //   Tel: '00',
    //   Email: 'hh'
    // }];
    
    // // ส่งข้อมูลไปยังเส้นทาง /Parent_information โดยใช้ Axios
    // axios.post(apiUrl + '/Parent_information', parentData)
    //   .then(response => {
    //     console.log(response.data);
    //     // ดำเนินการเพิ่มข้อมูลสำเร็จ
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     // เกิดข้อผิดพลาดในการเพิ่มข้อมูล
    //   });
    // เรียกใช้ฟังก์ชัน checkEmail

    const handleButtonClick = async () => {
      console.log('fatherfirstname',FatherFirstname);
      const confirmSubmit = window.confirm("ยืนยันที่จะส่งข้อมูลหรือไม่?");
      setFoundParentData('');
      
      // if (!isParentForeigner){
      //   setParentNationality("ไทย");
      //   console.log('Received setParentNationality:', ParentNationality);
      // }
      if (confirmSubmit) {
          try {
              //ทำฟังก์ชันเก็บข้อมูล applicants_parent
              //ทำฟังก์ชันเก็บข้อมูล enrollment ต้องกำหนดชื่อหลักสูตร
              await handleSubmit(
                  StudentImageFile, 
                  CopyofStudentIDCardFile,
                  PreviousSchoolEducationalRecordsFile,
                  studentNID,
                  nameTitle,
                  FirstName,
                  LastName,
                  DateOfBirth,
                  Transcript_type,
                  HouseNumber,
                  Moo,
                  Soi,
                  Road,
                  Province,
                  District,
                  SubDistrict,
                  HouseReg_file
              );

              await checkEnrollment(
                studentNID,
                Enroll_Date,
                Enroll_Year,
                Enroll_Course
              );

              await addParentEmails(
                studentNID,
                FatherEmail,
                MotherEmail,
                ParentEmail
              );
              
              if (!isFatherRecordData){
                
                const Father_Nationality = !isFatherForeigner ? "ไทย" : FatherNationality;
                await addParentInformation(
                  '',
                  FatherEmail,
                  FatherFirstname,
                  FatherLastname,
                  formatDate(FatherDateOfBirth),
                  // "",
                  Father_Nationality,
                  FatherOffice,
                  FatherOccupation,
                  "บิดา",
                  FatherTel
                );
              }

              if (!isMotherRecordData){
                const Mother_Nationality = !isMotherForeigner ? "ไทย" : MotherNationality;
                await addParentInformation(
                  '',
                  MotherEmail,
                  MotherFirstname,
                  MotherLastname,
                  formatDate(MotherDateOfBirth),
                  // "",
                  Mother_Nationality,
                  MotherOffice,
                  MotherOccupation,
                  "มารดา",
                  MotherTel
                );
              }

              if (whoAreParent === "SomeoneElseIsParent" && !isParentRecordData){
                const Parent_Nationality = !isParentForeigner ? "ไทย" : ParentNationality;
                // console.log('Received setFatherNationality  ไทย:', FatherNationality);
                await addParentInformation(
                  '',
                  ParentEmail,
                  ParentFirstname,
                  ParentLastname,
                  formatDate(ParentDateOfBirth),
                  // "",
                  Parent_Nationality,
                  ParentOffice,
                  ParentOccupation,
                  ParentRole,
                  ParentTel
                );
              }
              
            } catch (error) {
                console.error('Error handling button click:', error);
            }
          }
      };

  // const handleNewstudent_infoClick = async () => {
  //   // handleTabChange('menu1');
  //   let numMissingFields = 0;
  //   if (!StudentImageFile) {
  //     numMissingFields++;
     
  //   }
  //   if (!studentNID) {
  //     numMissingFields++;
     
      
  //   }
  //   if (!nameTitle) {
  //     numMissingFields++;
      
  //   }
  //   if (!FirstName) {
  //     numMissingFields++;
      
  //   }
  //   if (!LastName) {
  //     numMissingFields++;
     
  //   }
  //   if (!DateOfBirth) {
  //     numMissingFields++;
      
  //   }
  //   if (!Transcript_type) {
  //     numMissingFields++;
      
  //   }
    
  //   if (!CopyofStudentIDCardFile) {
  //     numMissingFields++;
      
  //   }
  //   if (!PreviousSchoolEducationalRecordsFile) {
  //     numMissingFields++;
     
  //   }

  //   if (numMissingFields > 1) {
  //     alert('กรุณากรอกข้อมูลส่วนตัวนักเรียนให้ครบถ้วน');
  //     handleTabChange('menu1');
  //     return false;
  //   }
  //   else{
  //     if (!StudentImageFile) {   
  //       alert('กรุณาเลือกไฟล์รูปภาพของนักเรียนด้วยค่ะ');
  //     }
  //     if (!studentNID) {    
  //       alert('กรุณากรอกเลขประจำตัวประชาชนของนักเรียนด้วยค่ะ');
        
  //     }
  //     if (!nameTitle) {      
  //       alert('กรุณากรอกคำนำหน้าชื่อของนักเรียนด้วยค่ะ');
        
  //     }
  //     if (!FirstName) {       
  //       alert('กรุณากรอกชื่อของนักเรียนด้วยค่ะ');
        
  //     }
  //     if (!LastName) {        
  //       alert('กรุณากรอกนามสกุลของนักเรียนด้วยค่ะ');
        
  //     }
  //     if (!DateOfBirth) {        
  //       alert('กรุณากรอก วัน/เดือน/ปีเกิด ของนักเรียนด้วยค่ะ');
       
  //     }
  //     if (!Transcript_type) {
  //       alert('กรุณากรอกประเภทของหลักฐานการศึกษาจากโรงเรียนเดิมด้วยค่ะ');
        
  //     }
      
  //     if (!CopyofStudentIDCardFile) {
  //       alert('กรุณาเลือกไฟล์สำเนาบัตรประชาชนของนักเรียนด้วยค่ะ');
        
  //     }
  //     if (!PreviousSchoolEducationalRecordsFile) {
  //       alert('กรุณาเลือกไฟล์ประกาศนียบัตรการศึกษาของโรงเรียนก่อนหน้าด้วยค่ะ');
        
  //     }
  //   }
    
  //   if (user && user.emails[0].value) {
  //     setCurrentLogin_Email(user.emails[0].value);
  //     console.log("user", user.emails[0].value);
  //   } else {
  //     console.log('User email is not available.');
  //   }
    
  //   // กรณีที่ผ่านเงื่อนไขทั้งหมด
  //   return true;

      

  // };

  const handleNewstudent_infoClick = async () => {
    // handleTabChange('menu1');
    let numMissingFields = 0;
    if (!StudentImageFile) {
      numMissingFields++;
     
    }
    if (!studentNID) {
      numMissingFields++;
     
      
    }
    if (!nameTitle) {
      numMissingFields++;
      
    }
    if (!FirstName) {
      numMissingFields++;
      
    }
    if (!LastName) {
      numMissingFields++;
     
    }
    if (!DateOfBirth) {
      numMissingFields++;
      
    }
    if (!Transcript_type) {
      numMissingFields++;
      
    }
    
    if (!CopyofStudentIDCardFile) {
      numMissingFields++;
      
    }
    if (!PreviousSchoolEducationalRecordsFile) {
      numMissingFields++;
     
    }

    if (numMissingFields > 1) {
      alert('กรุณากรอกข้อมูลส่วนตัวนักเรียนให้ครบถ้วน');
      handleTabChange('menu1');
      return false;
    }
    else{
      if (!StudentImageFile) {
        
        alert('กรุณาเลือกไฟล์รูปภาพของนักเรียนด้วยค่ะ');
      }
      if (!studentNID) {    
        alert('กรุณากรอกเลขประจำตัวประชาชนของนักเรียนด้วยค่ะ');
        
      }
      if (!nameTitle) {      
        alert('กรุณากรอกคำนำหน้าชื่อของนักเรียนด้วยค่ะ');
        
      }
      if (!FirstName) {       
        alert('กรุณากรอกชื่อของนักเรียนด้วยค่ะ');
        
      }
      if (!LastName) {        
        alert('กรุณากรอกนามสกุลของนักเรียนด้วยค่ะ');
        
      }
      if (!DateOfBirth) {        
        alert('กรุณากรอก วัน/เดือน/ปีเกิด ของนักเรียนด้วยค่ะ');
       
      }
      if (!Transcript_type) {
        alert('กรุณากรอกประเภทของหลักฐานการศึกษาจากโรงเรียนเดิมด้วยค่ะ');
        
      }
      
      if (!CopyofStudentIDCardFile) {
        alert('กรุณาเลือกไฟล์สำเนาบัตรประชาชนของนักเรียนด้วยค่ะ');
        
      }
      if (!PreviousSchoolEducationalRecordsFile) {
        alert('กรุณาเลือกไฟล์ประกาศนียบัตรการศึกษาของโรงเรียนก่อนหน้าด้วยค่ะ');
        
      }
    }
    
    // if (user && user.emails[0].value) {
    //   setCurrentLogin_Email(user.emails[0].value);
    //   console.log("user", user.emails[0].value);
    // } else {
    //   console.log('User email is not available.');
    // }
    // ตรวจสอบว่ามีอ็อบเจกต์ user และมีอีเมลในอ็อบเจกต์ user หรือไม่
    if (user && user.emails && user.emails.length > 0) {
      // กำหนดค่า currentLogin_Email ด้วยค่าอีเมลที่ได้จากอ็อบเจกต์ user
      setCurrentLogin_Email(user.emails[0].value);
      console.log("user", user.emails[0].value);

      // ตรวจสอบว่าอ็อบเจกต์ user มีค่า id หรือไม่
      if (user.id) {
          // พิมพ์ค่า id ของอ็อบเจกต์ user ที่ได้จาก API ของ Google OAuth
          console.log("User ID:", user.id);
      } else {
          console.log('User ID is not available.');
      }
    } else {
      console.log('User email is not available.');
    }
    
    // กรณีที่ผ่านเงื่อนไขทั้งหมด
    return true;

      

  };
  const handleHousehold_infoClick = async () => {
    let numMissingFields = 0;
  
    if (!HouseNumber) {
      numMissingFields++;
    }
    if (!Province) {
      numMissingFields++;
    }
    if (!District) {
      numMissingFields++;
    }
    if (!SubDistrict) {
      numMissingFields++;
    }
    if (!HouseReg_file) {
      numMissingFields++;
    }

    if (numMissingFields > 1) {
      alert('กรุณากรอกข้อมูลที่อยู่ตามทะเบียนบ้านให้ครบถ้วน');
      handleTabChange('menu2');
      return false;
    }
    else {
      if (!HouseNumber) {
        alert('กรุณากรอกบ้านเลขที่ด้วยค่ะ');
      }
      if (!Province) {
        alert('กรุณากรอกจังหวัดของที่อยู่ตามทะเบียนบ้านด้วยค่ะ');
      }
      if (!District) {
        alert('กรุณากรอกเขต/อำเภอของที่อยู่ตามทะเบียนบ้านด้วยค่ะ');
      }
      if (!SubDistrict) {
        alert('กรุณากรอกแขวง/ตำบลของที่อยู่ตามทะเบียนบ้านด้วยค่ะ');
      }
      if (!HouseReg_file) {
        alert('กรุณาอัพโหลดไฟล์สำเนาทะเบียนบ้านด้วยค่ะ');
      }
  
    }


    return true;
  };
  
  const handleMotherinfoClick = async () => {
    let numMissingFields = 0;

    if (!MotherEmail) {
      numMissingFields++;
    }
    
    if (!isMotherRecordData) {

      if (!MotherFirstname) {
        numMissingFields++;
      }
      if (!MotherLastname) {
        numMissingFields++;
      }
      if (!MotherDateOfBirth) {
        numMissingFields++;
      }
      if (isMotherForeigner) {
        if (!MotherNationality) {
          numMissingFields++;
        }
      }
      else {
        setFatherNationality("ไทย");
      }
      if (!MotherOccupation) {
        numMissingFields++;
      }
      if (!MotherOffice) {
        numMissingFields++;
      }
      if (!MotherTel) {
        numMissingFields++;
      }
    }
    
    if (numMissingFields > 1) {
      alert('กรุณากรอกข้อมูลผู้ปกครองให้ครบถ้วน');
      handleTabChange('menu3');
      return false;
    }
    else {
      
      if (!MotherEmail) {
        alert('กรุณากรอกอีเมลมารดา');
      }
      
      if (!isMotherRecordData) {
        if (!MotherFirstname) {
          alert('กรุณากรอกชื่อมารดา');
        }
        if (!MotherLastname) {
          alert('กรุณากรอกนามสกุลมารดา');
        }
        if (!MotherDateOfBirth) {
          alert('กรุณากรอกวัน/เดือน/ปีเกิดของมารดา');
        }
        if (isMotherForeigner) {
          if (!MotherNationality) {
            alert('กรุณากรอกสัญชาติของมารดา');
          }
        }
        
        if (!MotherOccupation) {
          alert('กรุณากรอกอาชีพของมารดา');
        }
        if (!MotherOffice) {
          alert('กรุณากรอกสถานที่ทำงานของมารดา');
        }
        if (!MotherTel) {
          alert('กรุณากรอกเลขเบอร์โทรศัพท์ของมารดา');
        }
    }
    
  }
    return true;
  };

  const handleFatherinfoClick = async () => {
    let numMissingFields = 0;

    if (!FatherEmail) {
      numMissingFields++;
    }
    
    if (!isFatherRecordData) {

      if (!FatherFirstname) {
        numMissingFields++;
      }
      if (!FatherLastname) {
        numMissingFields++;
      }
      if (!FatherDateOfBirth) {
        numMissingFields++;
      }
      if (isFatherForeigner) {
        if (!FatherNationality) {
          numMissingFields++;
        }
      }
      else {
        setFatherNationality("ไทย");
      }
      if (!FatherOccupation) {
        numMissingFields++;
      }
      if (!FatherOffice) {
        numMissingFields++;
      }
      if (!FatherTel) {
        numMissingFields++;
      }
    }
    if (numMissingFields > 1) {
      alert('กรุณากรอกข้อมูลผู้ปกครองให้ครบถ้วน');
      handleTabChange('menu3');
      return false;
    }
    else {
      if (!FatherEmail) {
        alert('กรุณากรอกอีเมลบิดา');
      }
      if (!isFatherRecordData) {
        if (!FatherFirstname) {
          alert('กรุณากรอกชื่อบิดา');
        }
        if (!FatherLastname) {
          alert('กรุณากรอกนามสกุลบิดา');
        }
        if (!FatherDateOfBirth) {
          alert('กรุณากรอกวัน/เดือน/ปีเกิดของบิดา');
        }
        if (isFatherForeigner) {
          if (!FatherNationality) {
            alert('กรุณากรอกสัญชาติของบิดา');
          }
        }
        
        if (!FatherOccupation) {
          alert('กรุณากรอกอาชีพของบิดา');
        }
        if (!FatherOffice) {
          alert('กรุณากรอกสถานที่ทำงานของบิดา');
        }
        if (!FatherTel) {
          alert('กรุณากรอกเลขเบอร์โทรศัพท์ของบิดา');
        }
      }
  }
    return true;
  };

  const handleParentinfoClick = async () => {
    let numMissingFields = 0;

    
    if (!isParentRecordData) {
      if (!ParentEmail){
        numMissingFields++;
      }
      if (!ParentFirstname) {
        numMissingFields++;
      }
      if (!ParentLastname) {
        numMissingFields++;
      }
      if (!ParentDateOfBirth) {
        numMissingFields++;
      }
      if (isParentForeigner) {
        if (!ParentNationality) {
          numMissingFields++;
        }
      }
      else {
        setFatherNationality("ไทย");
      }
      if (!ParentOccupation) {
        numMissingFields++;
      }
      if (!ParentOffice) {
        numMissingFields++;
      }
      if (!ParentTel) {
        numMissingFields++;
      }
    }
    if (numMissingFields > 1) {
      alert('กรุณากรอกข้อมูลผู้ปกครองให้ครบถ้วน');
      handleTabChange('menu3');
      return false;
    }
    else
    {

    if (!isParentRecordData) {
      if (!ParentEmail){
        alert('กรุณากรอกอีเมลผู้ปกครอง');
      }
      if (!ParentFirstname) {
        alert('กรุณากรอกชื่อผู้ปกครอง');
      }
      if (!ParentLastname) {
        alert('กรุณากรอกนามสกุลผู้ปกครอง');
      }
      if (!ParentDateOfBirth) {
        alert('กรุณากรอกวัน/เดือน/ปีเกิดของผู้ปกครอง');
      }
      if (isParentForeigner) {
        if (!ParentNationality) {
          alert('กรุณากรอกสัญชาติของผู้ปกครอง');
        }
      }
      
      if (!ParentOccupation) {
        alert('กรุณากรอกอาชีพของผู้ปกครอง');
      }
      if (!ParentOffice) {
        alert('กรุณากรอกสถานที่ทำงานของผู้ปกครอง');
      }
      if (!ParentTel) {
        alert('กรุณากรอกเลขเบอร์โทรศัพท์ของผู้ปกครอง');
      }
  }}
    return true;
  };

    return (
      <div className="d-flex flex-column align-items-center">
        <div class="card" style={{width: '60vw', height: 'auto'}}>
        <div class="card-header">
          <ul class="nav nav-tabs card-header-tabs">
            <li class="nav-item">
              <a
                class={`nav-link ${activeTab === 'menu1' ? 'active' : ''}`}
                data-bs-toggle="tab"
                href="#menu1"
                style={{ fontFamily: 'Kanit, sans-serif' }}
                onClick={() => handleTabChange('menu1')}
              >
                ข้อมูลนักเรียน
              </a>
            </li>
            <li class="nav-item">
              <a
                class={`nav-link ${activeTab === 'menu2' ? 'active' : ''}`}

                data-bs-toggle="tab"
                href="#menu2"
                style={{ fontFamily: 'Kanit, sans-serif' }}
                onClick={() =>  handleTabChange('menu2') }
              >
                ที่อยู่ตามทะเบียนบ้าน
              </a>
            </li>
            <li class="nav-item">
              <a
                class={`nav-link ${activeTab === 'menu3' ? 'active' : ''}`}
                data-bs-toggle="tab"
                href="#menu3"
                style={{ fontFamily: 'Kanit, sans-serif' }}
                onClick={() => handleTabChange('menu3')}
              >
                ข้อมูลผู้ปกครอง
              </a>
            </li>
          </ul>
        </div>
          <div class="card-body">
            <div class="tab-content">
              <div class={`tab-pane container ${activeTab === 'menu1' ? 'active' : ''}`} id="menu1" >
              <div>
                  <NewStudent_info
                      sendImageDataToEnroll={sendImageDataToEnroll}
                      sendCopyofStudentIDCardFileToEnroll={sendCopyofStudentIDCardFileToEnroll}
                      sendPreviousSchoolEducationalRecordsFileToEnroll={sendPreviousSchoolEducationalRecordsFileToEnroll}
                      sendstudentNIDToEnroll={sendstudentNIDToEnroll}
                      sendnameTitleToEnroll={sendnameTitleToEnroll}
                      sendDateOfBirthToEnroll={sendDateOfBirthToEnroll}
                      sendTranscript_typeToEnroll={sendTranscript_typeToEnroll}
                      sendFirstNameToEnroll={sendFirstNameToEnroll}
                      sendLastNameToEnroll={sendLastNameToEnroll}
                  />
              </div>

              {/* {imageUploaded ? (
                  <p>ไฟล์รูปถูกส่งมาแล้ว</p>
              ) : (
                  <p>โปรดเลือกไฟล์รูปเพื่ออัพโหลด</p>
              )} */}


                
                  <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => { 
                      if (studentNID && nameTitle && FirstName && LastName && DateOfBirth && Transcript_type && StudentImageFile && CopyofStudentIDCardFile && PreviousSchoolEducationalRecordsFile) 
                      {
                        handleTabChange('menu2');
                      };
                      handleNewstudent_infoClick();
                    }} 
                    
                    className="btn btn-primary" style={{ ...fontStyle, color: 'white', fontSize: '16px'}}>
                      ถัดไป
                    </button>
                  </div>
                  
              </div>
              
              
              <div class={`tab-pane container ${activeTab === 'menu2' ? 'active' : ''}`} id="menu2">
                
                <HouseholdInfo
                  sendHouseNumberToEnroll={sendHouseNumberToEnroll}
                  sendMooToEnroll={sendMooToEnroll}
                  sendSoiToEnroll={sendSoiToEnroll}
                  sendRoadToEnroll={sendRoadToEnroll}
                  sendProvinceToEnroll={sendProvinceToEnroll}
                  sendDistrictToEnroll={sendDistrictToEnroll}
                  sendSubDistrictToEnroll={sendSubDistrictToEnroll}
                  sendHouseReg_fileToEnroll={sendHouseReg_fileToEnroll}
                />
              
                <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'space-between', width: '100%' }}>

                  <div style={{ display: 'flex',justifyContent: 'flex-start' }}>
                    <button type="button" 
                    onClick={() => {
                     
                        if (HouseNumber && Province && District && SubDistrict && HouseReg_file) {
                          // ทำงานเมื่อผ่านเงื่อนไขทุกอย่าง
                          handleTabChange('menu1');
                        };
                        
                        handleHousehold_infoClick();
                       

                    }} className="btn btn-primary" style={{ ...fontStyle, color: 'white', fontSize: '16px'}}>
                      ย้อนกลับ
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="button" onClick={() => {
                     
                     if (HouseNumber && Province && District && SubDistrict && HouseReg_file) {
                      // ทำงานเมื่อผ่านเงื่อนไขทุกอย่าง
                      handleTabChange('menu3');
                      
                      // href="#menu2"
                    };

                    handleHousehold_infoClick();
                    
                    }} 
                    
                    className="btn btn-primary" style={{ ...fontStyle, color: 'white', fontSize: '16px'}}>
                      ถัดไป
                    </button>
                  </div>
                  
                </div>

              </div>
              <div class={`tab-pane container ${activeTab === 'menu3' ? 'active' : ''}`} id="menu3">
              <ParentsInfo
                sendFatherEmailToEnroll={sendFatherEmailToEnroll} 
                sendisFatherRecordDataToEnroll={sendisFatherRecordDataToEnroll}
                sendFatherFirstnameToEnroll={sendFatherFirstnameToEnroll}
                sendFatherLastnameToEnroll={sendFatherLastnameToEnroll}
                sendFatherDateOfBirthToEnroll={sendFatherDateOfBirthToEnroll}
                sendisFatherForeignerToEnroll={sendisFatherForeignerToEnroll}
                sendFatherNationalityToEnroll={sendFatherNationalityToEnroll}
                sendFatherOccupationToEnroll={sendFatherOccupationToEnroll}
                sendFatherOfficeToEnroll={sendFatherOfficeToEnroll}
                sendFatherTelToEnroll={sendFatherTelToEnroll}

                sendMotherEmailToEnroll={sendMotherEmailToEnroll} 
                sendisMotherRecordDataToEnroll={sendisMotherRecordDataToEnroll}
                sendMotherFirstnameToEnroll={sendMotherFirstnameToEnroll}
                sendMotherLastnameToEnroll={sendMotherLastnameToEnroll}
                sendMotherDateOfBirthToEnroll={sendMotherDateOfBirthToEnroll}
                sendisMotherForeignerToEnroll={sendisMotherForeignerToEnroll}
                sendMotherNationalityToEnroll={sendMotherNationalityToEnroll}
                sendMotherOccupationToEnroll={sendMotherOccupationToEnroll}
                sendMotherOfficeToEnroll={sendMotherOfficeToEnroll}
                sendMotherTelToEnroll={sendMotherTelToEnroll}

                sendParentEmailToEnroll={sendParentEmailToEnroll}
                sendisParentRecordDataToEnroll={sendisParentRecordDataToEnroll}
                sendParentFirstnameToEnroll={sendParentFirstnameToEnroll}
                sendParentLastnameToEnroll={sendParentLastnameToEnroll}
                sendParentDateOfBirthToEnroll={sendParentDateOfBirthToEnroll}
                sendisParentForeignerToEnroll={sendisParentForeignerToEnroll}
                sendParentNationalityToEnroll={sendParentNationalityToEnroll}
                sendParentOccupationToEnroll={sendParentOccupationToEnroll}
                sendParentOfficeToEnroll={sendParentOfficeToEnroll}
                sendParentTelToEnroll={sendParentTelToEnroll}
                sendParentRoleToEnroll={sendParentRoleToEnroll}
                sendwhoAreParentToEnroll={sendwhoAreParentToEnroll}
                />

                <div style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'space-between', width: '100%' }}>

                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <button type="button" onClick={() => {
                      if (FatherEmail && FatherFirstname && FatherLastname && FatherDateOfBirth && FatherNationality &&FatherOccupation && FatherOffice && FatherTel) {
                        // All required fields have been filled out
                        handleTabChange('menu2');
                      };
                      if ( MotherEmail && MotherFirstname && MotherLastname && MotherDateOfBirth && MotherNationality && MotherOccupation && MotherOffice && MotherTel ) {

                        handleTabChange('menu2');
                      
                      };
                      if ( ParentEmail && ParentFirstname && ParentLastname && ParentDateOfBirth && ParentNationality && ParentOccupation && ParentOffice && ParentTel ) {

                
                        handleTabChange('menu2');
      
                      };
                      handleFatherinfoClick();
                      handleMotherinfoClick();
                      handleParentinfoClick();
                       
                    
                    }} 
                      
                      className="btn btn-primary" style={{ ...fontStyle, color: 'white', fontSize: '16px'}}>
                      ย้อนกลับ
                    </button>
                  </div>

                  <div>
                    {/* {message && <p>{message}</p>} //แสดงข้อความแจ้งเตือนในกรณีที่มีข้อผิดพลาด */}

                    {/* {message === "Successfully uploaded to drive" ? ( */}
                      {/* <Link to="/NewUser_menu" > */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button type="button" onClick={() => { handleTabChange('menu3'); handleButtonClick(); }} className="btn btn-primary" style={{ ...fontStyle, color: 'white', fontSize: '16px' }}>
                            ส่งข้อมูล
                          </button>
                        </div>
                      {/* </Link> */}
                     {/* ) : ( */}
                       {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}> */}
                         {/* <button
                          type="button"
                          onClick={handleButtonClick}
                          className="btn btn-primary"
                          style={{ ...fontStyle, color: 'white', fontSize: '16px' }}
                        >
                          ส่งข้อมูล
                        </button>
                      </div>
                    )} */}

                    {/* </div> */}
                  </div>
                </div>
              </div>

            </div>
          </div>
          <br />
        </div>
        </div>
      );
    };

export default Tab_enroll;