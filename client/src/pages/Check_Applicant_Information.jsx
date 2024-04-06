import React, { useState, useEffect } from 'react';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";
import Modal_ApplicantDetails from '../components/Modal_ApplicantDetails';
import Header from '../components/Header';
import axios from 'axios';
import Modal_success from '../components/Modal_success';
import Pagination_table from '../components/Pagination_table';

const Check_Applicant_Information = () => {
    
    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const [selectedCourse, setSelectedCourse] = useState('ทั้งหมด');
    const [SelectedExamStatus,setSelectedExamStatus] = useState('ทั้งหมด');
    const [SelectedEnrollStatus,setSelectedEnrollStatus] = useState('ทั้งหมด');
    const [ShowExamStatusCheck,setShowExamStatusCheck] = useState(false);
    const [ShowEnrollStatusCheck,setShowEnrollStatusCheck] = useState(false);

    const [oldData, setOldData] = useState([])
    const [data, setData] = useState([
            // { Enroll_ID:1, 
            // Registration_Number: 'XXX1',
            //  Registration_Date: '12/05/2566',
            //  Applicant_name_title:"เด็กหญิง" ,
            //  Applicants_first_name: 'ฐิตานันนท์', 
            //  Applicants_last_name: 'สดใส', 
            //  TranscriptFile: 'https://drive.google.com/file/d/1MQIGTa_OUEHnSHb3x7_C_jMP4dKLzMST', 
            //  HouseRegFile:"https://drive.google.com/file/d/1YNDRGmcQIqiTKhzGqbj9lz357c5bhAEU", 
            //  Educational_Program: 'English Program (EP)',
            // Exam_results:"70",
            // ExamStatus: "ผ่าน",
            // EnrollStatus:"มอบตัวสำเร็จ"
            // },
            // {  Enroll_ID:2,
            //     Registration_Number: 'XXX2',
            //  Registration_Date: '12/05/2566',
            //  Applicant_name_title:"เด็กหญิง" ,
            //  Applicants_first_name: 'ทักษพร', 
            //  Applicants_last_name: 'ใจบุญ', 
            //  TranscriptFile: 'https://drive.google.com/file/d/1MQIGTa_OUEHnSHb3x7_C_jMP4dKLzMST', 
            //  HouseRegFile:"https://drive.google.com/file/d/1YNDRGmcQIqiTKhzGqbj9lz357c5bhAEU", 
            //  Educational_Program: 'English Program (EP)',
            // Exam_results:"",
            // ExamStatus: "",
            // EnrollStatus:""
            // },
            // {  Enroll_ID:3,
            //     Registration_Number: 'XXX3',
            //  Registration_Date: '12/05/2566',
            //  Applicant_name_title:"เด็กหญิง" ,
            //  Applicants_first_name: 'กรกช', 
            //  Applicants_last_name: 'รักดี', 
            //  TranscriptFile: 'https://drive.google.com/file/d/1MQIGTa_OUEHnSHb3x7_C_jMP4dKLzMST', 
            //  HouseRegFile:"https://drive.google.com/file/d/1YNDRGmcQIqiTKhzGqbj9lz357c5bhAEU", 
            //  Educational_Program: 'Regular Program',
            // Exam_results:"",
            // ExamStatus: "",
            // EnrollStatus:""
            // },
        ]);

    const handleSelectCourseChange = (event) => {
        setSelectedCourse(event.target.value);
        };
    const handleSelectExamStatusChange = (event) => {
        // let value
        // if (event.target.value === "") {
        //     value = null
        // } else {
        //     value = event.target.value
        // }
        // setSelectedExamStatus(value);
        setSelectedExamStatus(event.target.value);
        };
    const handleSelectEnrollStatusChange = (event) => {
        setSelectedEnrollStatus(event.target.value);
        };

    const [editingId, setEditingId] = useState(null);
    const [editedData, setEditedData] = useState(data);
    const [isEditing, setIsEditing] = useState(false);

    const filteredData = data.filter((item) => {
        
        // if (isEditing && item.Enroll_ID === editingId) {
        //     return true;
        // }
        
        if (selectedCourse === 'ทั้งหมด'&& SelectedExamStatus === 'ทั้งหมด'&& SelectedEnrollStatus === 'ทั้งหมด'){
            return true;
         }
         if (selectedCourse !== 'ทั้งหมด'&& SelectedExamStatus !== 'ทั้งหมด'&& SelectedEnrollStatus === 'ทั้งหมด'){

            return item.Educational_Program === selectedCourse && item.ExamStatus === SelectedExamStatus;
         }
         if (selectedCourse === 'ทั้งหมด'&& SelectedExamStatus !== 'ทั้งหมด' && SelectedEnrollStatus === 'ทั้งหมด'){

            return item.ExamStatus === SelectedExamStatus;
         }
        if (selectedCourse !== 'ทั้งหมด'&& SelectedExamStatus === 'ทั้งหมด'&& SelectedEnrollStatus !== 'ทั้งหมด'){

            return item.Educational_Program === selectedCourse && item.EnrollStatus === SelectedEnrollStatus;
         }
         if (selectedCourse === 'ทั้งหมด'&& SelectedExamStatus === 'ทั้งหมด'&& SelectedEnrollStatus !== 'ทั้งหมด'){

            return item.EnrollStatus === SelectedEnrollStatus;
         }
        if (selectedCourse !== 'ทั้งหมด'){
            return item.Educational_Program === selectedCourse;
         }
        
          
        });

    // const selectedDropdown = oldData.filter((item) => {
        
    //     if (selectedCourse === 'ทั้งหมด'&& SelectedExamStatus === 'ทั้งหมด'&& SelectedEnrollStatus === 'ทั้งหมด'){
    //         return true;
    //         }
    //         if (selectedCourse !== 'ทั้งหมด'&& SelectedExamStatus !== 'ทั้งหมด'&& SelectedEnrollStatus === 'ทั้งหมด'){

    //         return item.Educational_Program === selectedCourse && item.ExamStatus === SelectedExamStatus;
    //         }
    //         if (selectedCourse === 'ทั้งหมด'&& SelectedExamStatus !== 'ทั้งหมด' && SelectedEnrollStatus === 'ทั้งหมด'){

    //         return item.ExamStatus === SelectedExamStatus;
    //         }
    //     if (selectedCourse !== 'ทั้งหมด'&& SelectedExamStatus === 'ทั้งหมด'&& SelectedEnrollStatus !== 'ทั้งหมด'){

    //         return item.Educational_Program === selectedCourse && item.EnrollStatus === SelectedEnrollStatus;
    //         }
    //         if (selectedCourse === 'ทั้งหมด'&& SelectedExamStatus === 'ทั้งหมด'&& SelectedEnrollStatus !== 'ทั้งหมด'){

    //         return item.EnrollStatus === SelectedEnrollStatus;
    //         }
    //     if (selectedCourse !== 'ทั้งหมด'){
    //         return item.Educational_Program === selectedCourse;
    //         }
    //     }).map((mapData) => mapData.Enroll_ID);
    
    // const filteredData = data.map((item) => 
    //     selectedDropdown.includes(item.Enroll_ID) ? item : null
    // ).filter((item) => item !== null)

    const handleEditRow = (Enroll_ID) => {
        setIsEditing(true);
        setEditingId(Enroll_ID === editingId ? null : Enroll_ID);
        if (editingId===Enroll_ID){
            // setShowModalSuccess(true)
            // // console.log("item.Enroll_ID",Enroll_ID)
            console.log("datadatadatadatadata",data)
            console.log("Enroll_IDEnroll_IDEnroll_IDa",Enroll_ID)
            console.log("get data change",data.find((item) => item.Enroll_ID === Enroll_ID))
            const changeData = data.find(element => element.Enroll_ID === Enroll_ID)
            updateApplicantInfo(changeData);
            setIsEditing(false);
            if (changeData.ExamStatus === "ผ่าน") {
                insertApplicanttoStudentInfo(changeData)
            }
            
            // setOldData(data)
        } else {
            // setData(oldData)
        }
      //  getApplicantInfo()
    };


    const handleChange = (Enroll_ID, field, value) => {
        // if (value === "") {
        //     value = null
        // }
        // && data.find(element => element.Enroll_ID === Enroll_ID).EnrollStatus === "มอบตัวสำเร็จ"
 
        setData(
          data.map((item) =>
            item.Enroll_ID === Enroll_ID ? { ...item, [field]: value } : item
          )
        );
        
      } 
    

    const [SearchData,setSearchData] = useState("");
    const handleCheckChange = (e) => {
        setSearchData(e.target.value)
      };
   
    

    useEffect(() => {
       
        if (SearchData==="สถานะการสอบ") {
            setShowExamStatusCheck(true); 
            setShowEnrollStatusCheck(false); 
            setSelectedEnrollStatus("ทั้งหมด");
        }
        if (SearchData==="สถานะการมอบตัว") {
            setShowEnrollStatusCheck(true); 
            setShowExamStatusCheck(false); 
            setSelectedExamStatus("ทั้งหมด");
        }
        }, [SearchData]);
        
        const [showModalDetail, setShowModalDetail] = useState(false);
        const handleShowDetail = (id) => {
            setShowModalDetail(true);
            setsendApplicantID(id)
          };

        const [sendApplicantID, setsendApplicantID] = useState("");

    //=============================api=============================
    function formatDateThaiYear(dateString) {
        const dob = new Date(dateString);
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear() + 543; // Add 543 to convert to พ.ศ.
        const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return formattedDOB;
    }    
    
    async function getApplicantInfo() {
        try {
            const response = await axios.post('http://localhost:8080/get-applicant-info', {});
            response.data.results.forEach((element,index) => {
                element.Registration_Date = formatDateThaiYear(element.Registration_Date)
                element.ExamStatus = element.ExamStatus === null ? "" : element.ExamStatus
                element.Exam_results = element.Exam_results === null ? "" : element.Exam_results
            })
            setData(response.data.results)
            // setOldData(response.data.results)
            console.log('getApplicantInfo');
            return response.data;
        } catch (error) {
            console.error('Error fetching classRoom dropdown:', error);
            throw error;
        }
    };

    async function updateApplicantInfo(changeData) {
        try {
            const response = await axios.post('http://localhost:8080/update-applicant-info', {
                score: changeData.Exam_results || null,
                exam_status: changeData.ExamStatus === "" ? null : changeData.ExamStatus,
                enroll_status: changeData.EnrollStatus === "" ? null : changeData.EnrollStatus,
                // enroll_no: changeData.Registration_Number
                enroll_no: changeData.Enroll_No
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching classRoom dropdown:', error);
            throw error;
        }
    };

    async function insertApplicanttoStudentInfo(changeData) {
        try {
            const response = await axios.post('http://localhost:8080/insert-applicant-to-student-info', {
                // Enroll_ID: changeData.Registration_Number
                Enroll_ID: changeData.Enroll_No
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching classRoom dropdown:', error);
            throw error;
        }
    };

    async function getApplicantInfoByEnrollCourse(enrollCourse) {
      try {
          const response = await axios.post('http://localhost:8080/get-applicant-Enroll-Course', {
              enrollCourse: enrollCourse
          });
          console.log('Retrieve applicant info successfully:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error retrieving applicant info:', error);
          throw error;
      }
    };

    async function getApplicantInfoByAdmissionStatus(enrollCourse, admissionStatus) {
      try {
          const response = await axios.post('http://localhost:8080/get-applicant-Admission-Status', {
              enrollCourse: enrollCourse,
              admissionStatus: admissionStatus
          });
  
          const data = response.data;
          if (data && data.results && data.results.length > 0) {
              // ข้อมูลพบ
              console.log('Applicant info:', data.results);
              return data;
          } else {
              // ไม่พบข้อมูล
              console.log('Info not found');
          }
      } catch (error) {
          console.error('Failed to retrieve applicant info:', error);
      }
    }
  

    async function getApplicantInfoByAllCourseAdmissionStatus(admissionStatus) {
      try {
          const response = await axios.post('http://localhost:8080/get-applicant-AllCourse-AdmissionStatus', {
              admissionStatus: admissionStatus
          });
  
          const data = response.data;
          if (data.results.length > 0) {
              // ข้อมูลพบ
              console.log('Applicant info:', data.results);
              return data;
          } else {
              // ไม่พบข้อมูล
              console.log('Info not found');
          }
      } catch (error) {
          console.log('Failed to retrieve getApplicantInfoByAllCourseAdmissionStatus:', error);
      }
    }

    async function getApplicantInfoByEnrollStatus(enrollCourse, enrollStatus) {
      try {
          const response = await axios.post('http://localhost:8080/get-applicant-Enroll-Status', {
              enrollCourse: enrollCourse,
              enrollStatus: enrollStatus
          });
  
          const data = response.data;
          if (data && data.results && data.results.length > 0) {
              // ข้อมูลพบ
              console.log('Applicant info:', data.results);
              return data;
          } else {
              // ไม่พบข้อมูล
              console.log('Info not found');
          }
      } catch (error) {
          console.error('Failed to retrieve applicant info:', error);
      }
    }
    
    async function getApplicantInfoByAllCourseEnrollStatus(enrollStatus) {
      try {
          const response = await axios.post('http://localhost:8080/get-applicant-AllCourse-EnrollStatus', {
            enrollStatus: enrollStatus
          });
  
          const data = response.data;
          if (data.results.length > 0) {
              // ข้อมูลพบ
              console.log('Applicant info:', data.results);
              return data;
          } else {
              // ไม่พบข้อมูล
              console.log('Info not found');
          }
      } catch (error) {
          console.log('Failed to retrieve getApplicantInfoByAllCourseEnrollStatus:', error);
      }
    }
  
  

    // useEffect(() => {
    //     getApplicantInfo();
    // }, [])

    useEffect(() => {
      if(selectedCourse !== 'ทั้งหมด'){
        async function fetchApplicantInfo() {
          try {
              const Applicantdata = await getApplicantInfoByEnrollCourse(selectedCourse);
      
              // ตรวจสอบว่า Applicantdata เป็น array หรือไม่
              if (Array.isArray(Applicantdata.results)) {
                  const mappedApplicantdata = Applicantdata.results.map(item => ({ 
                      Enroll_No: Enroll_No,
                      Enroll_ID: item.Enroll_ID, 
                      Registration_Number: item.Registration_Number,
                      Registration_Date: formatDateThaiYear(item.Registration_Date),
                      Applicant_name_title: item.Applicant_name_title,
                      Applicants_first_name: item.Applicants_first_name, 
                      Applicants_last_name: item.Applicants_last_name, 
                      TranscriptFile: item.TranscriptFile, 
                      HouseRegFile: item.HouseRegFile, 
                      Educational_Program: item.Educational_Program,
                      Exam_results: item.Exam_results === null ? "" : item.Exam_results,
                      ExamStatus: item.ExamStatus === null ? "" : item.ExamStatus,
                      EnrollStatus: item.EnrollStatus
                  }));
                  console.log('fetchApplicantInfo');
                  setData(mappedApplicantdata);
              } else {
                  console.error('Results is not an array:', Applicantdata.results);
              }
          } catch (error) {
              console.log('Failed to retrieve applicant info:', error);
          }
      }
      fetchApplicantInfo(); 
    }
    else{
      getApplicantInfo();
    }

    setSelectedExamStatus('ทั้งหมด');
    setSelectedEnrollStatus('ทั้งหมด');
  }, [selectedCourse])

  useEffect(() => {
    console.log('SelectedExamStatus',SelectedExamStatus);
    console.log('selectedCourse',selectedCourse);
    if(SelectedExamStatus !== 'ทั้งหมด'){
      if(selectedCourse === 'ทั้งหมด'){
        async function fetchApplicantInfo() {
          try {
              const Applicantdata = await getApplicantInfoByAllCourseAdmissionStatus(SelectedExamStatus);
              
              // ตรวจสอบว่า Applicantdata ไม่เป็น null และไม่เป็น undefined
              if (Applicantdata && Applicantdata.results) {
                  // ตรวจสอบว่า Applicantdata.results เป็น array หรือไม่
                  if (Array.isArray(Applicantdata.results)) {
                      const mappedApplicantdata = Applicantdata.results.map(item => ({ 
                          Enroll_No: Enroll_No,
                          Enroll_ID: item.Enroll_ID, 
                          Registration_Number: item.Registration_Number,
                          Registration_Date: formatDateThaiYear(item.Registration_Date),
                          Applicant_name_title: item.Applicant_name_title,
                          Applicants_first_name: item.Applicants_first_name, 
                          Applicants_last_name: item.Applicants_last_name, 
                          TranscriptFile: item.TranscriptFile, 
                          HouseRegFile: item.HouseRegFile, 
                          Educational_Program: item.Educational_Program,
                          Exam_results: item.Exam_results === null ? "" : item.Exam_results,
                          ExamStatus: item.ExamStatus === null ? "" : item.ExamStatus,
                          EnrollStatus: item.EnrollStatus
                      }));
                      console.log('fetchApplicantInfo');
                      setData(mappedApplicantdata);
                  } else {
                      console.log('Results is not an array:', Applicantdata.results);
                  }
              } else {
                  console.log('Applicantdata or Applicantdata.results is null or undefined');
              }
          } catch (error) {
              console.log('Failed to retrieve applicant info:', error);
          }
      }
      fetchApplicantInfo();
      
      }
      else{
        async function fetchApplicantInfo() {
          try {
              const Applicantdata = await getApplicantInfoByAdmissionStatus(selectedCourse, SelectedExamStatus);
      
              // ตรวจสอบว่า Applicantdata เป็น array หรือไม่
              if (Array.isArray(Applicantdata.results)) {
                  const mappedApplicantdata = Applicantdata.results.map(item => ({ 
                      Enroll_No: Enroll_No,
                      Enroll_ID: item.Enroll_ID, 
                      Registration_Number: item.Registration_Number,
                      Registration_Date: formatDateThaiYear(item.Registration_Date),
                      Applicant_name_title: item.Applicant_name_title,
                      Applicants_first_name: item.Applicants_first_name, 
                      Applicants_last_name: item.Applicants_last_name, 
                      TranscriptFile: item.TranscriptFile, 
                      HouseRegFile: item.HouseRegFile, 
                      Educational_Program: item.Educational_Program,
                      Exam_results: item.Exam_results === null ? "" : item.Exam_results,
                      ExamStatus: item.ExamStatus === null ? "" : item.ExamStatus,
                      EnrollStatus: item.EnrollStatus
                  }));
                  console.log('fetchApplicantInfo');
                  setData(mappedApplicantdata);
              } else {
                  console.error('Results is not an array:', Applicantdata.results);
              }
          } catch (error) {
              console.log('Failed to retrieve applicant info:', error);
          }
        }
        fetchApplicantInfo(); 
      }
  }
    else{
      if(selectedCourse !== 'ทั้งหมด'){
        async function fetchApplicantInfo() {
          try {
              const Applicantdata = await getApplicantInfoByEnrollCourse(selectedCourse);
      
              // ตรวจสอบว่า Applicantdata เป็น array หรือไม่
              if (Array.isArray(Applicantdata.results)) {
                  const mappedApplicantdata = Applicantdata.results.map(item => ({ 
                      Enroll_No: Enroll_No,
                      Enroll_ID: item.Enroll_ID, 
                      Registration_Number: item.Registration_Number,
                      Registration_Date: formatDateThaiYear(item.Registration_Date),
                      Applicant_name_title: item.Applicant_name_title,
                      Applicants_first_name: item.Applicants_first_name, 
                      Applicants_last_name: item.Applicants_last_name, 
                      TranscriptFile: item.TranscriptFile, 
                      HouseRegFile: item.HouseRegFile, 
                      Educational_Program: item.Educational_Program,
                      Exam_results: item.Exam_results,
                      ExamStatus: item.ExamStatus,
                      EnrollStatus: item.EnrollStatus
                  }));
                  console.log('fetchApplicantInfo');
                  setData(mappedApplicantdata);
              } else {
                  console.error('Results is not an array:', Applicantdata.results);
              }
          } catch (error) {
              console.log('Failed to retrieve applicant info:', error);
          }
      }
      fetchApplicantInfo(); 
    }
    else{
      getApplicantInfo();
    }
  }
}, [SelectedExamStatus])

useEffect(() => {
  console.log('SelectedEnrollStatus',SelectedEnrollStatus);
  console.log('selectedCourse',selectedCourse);
  if(SelectedEnrollStatus !== 'ทั้งหมด'){
    if(selectedCourse === 'ทั้งหมด'){
      async function fetchApplicantInfo() {
        try {
            const Applicantdata = await getApplicantInfoByAllCourseEnrollStatus(SelectedEnrollStatus);

            // ตรวจสอบว่า Applicantdata ไม่เป็น null และไม่เป็น undefined
            if (Applicantdata && Applicantdata.results) {
                // ตรวจสอบว่า Applicantdata.results เป็น array หรือไม่
                if (Array.isArray(Applicantdata.results)) {
                    const mappedApplicantdata = Applicantdata.results.map(item => ({ 
                        Enroll_No: Enroll_No,
                        Enroll_ID: item.Enroll_ID, 
                        Registration_Number: item.Registration_Number,
                        Registration_Date: formatDateThaiYear(item.Registration_Date),
                        Applicant_name_title: item.Applicant_name_title,
                        Applicants_first_name: item.Applicants_first_name, 
                        Applicants_last_name: item.Applicants_last_name, 
                        TranscriptFile: item.TranscriptFile, 
                        HouseRegFile: item.HouseRegFile, 
                        Educational_Program: item.Educational_Program,
                        Exam_results: item.Exam_results === null ? "" : item.Exam_results,
                        ExamStatus: item.ExamStatus === null ? "" : item.ExamStatus,
                        EnrollStatus: item.EnrollStatus
                    }));
                    console.log('fetchApplicantInfo');
                    setData(mappedApplicantdata);
                } else {
                    console.log('Results is not an array:', Applicantdata.results);
                }
            } else {
                console.log('Applicantdata or Applicantdata.results is null or undefined',Applicantdata);
            }
        } catch (error) {
            console.log('Failed to retrieve applicant info:', error);
        }
    }
    fetchApplicantInfo();
    
    }
    else{
      async function fetchApplicantInfo() {
        try {
            const Applicantdata = await getApplicantInfoByEnrollStatus(selectedCourse, SelectedEnrollStatus);
            
            // ตรวจสอบว่า Applicantdata เป็น array หรือไม่
            if (Array.isArray(Applicantdata.results)) {
                const mappedApplicantdata = Applicantdata.results.map(item => ({ 
                    Enroll_No: Enroll_No,
                    Enroll_ID: item.Enroll_ID, 
                    Registration_Number: item.Registration_Number,
                    Registration_Date: formatDateThaiYear(item.Registration_Date),
                    Applicant_name_title: item.Applicant_name_title,
                    Applicants_first_name: item.Applicants_first_name, 
                    Applicants_last_name: item.Applicants_last_name, 
                    TranscriptFile: item.TranscriptFile, 
                    HouseRegFile: item.HouseRegFile, 
                    Educational_Program: item.Educational_Program,
                    Exam_results: item.Exam_results === null ? "" : item.Exam_results,
                    ExamStatus: item.ExamStatus === null ? "" : item.ExamStatus,
                    EnrollStatus: item.EnrollStatus
                }));
                console.log('fetchApplicantInfo');
                setData(mappedApplicantdata);
            } else {
                console.error('Results is not an array:', Applicantdata.results);
            }
        } catch (error) {
            console.log('Failed to retrieve applicant info:', error);
        }
      }
      fetchApplicantInfo(); 
    }
  }
    else{
      if(selectedCourse !== 'ทั้งหมด'){
        async function fetchApplicantInfo() {
          try {
              const Applicantdata = await getApplicantInfoByEnrollCourse(selectedCourse);
      
              // ตรวจสอบว่า Applicantdata เป็น array หรือไม่
              if (Array.isArray(Applicantdata.results)) {
                  const mappedApplicantdata = Applicantdata.results.map(item => ({ 
                      Enroll_No: Enroll_No,
                      Enroll_ID: item.Enroll_ID, 
                      Registration_Number: item.Registration_Number,
                      Registration_Date: formatDateThaiYear(item.Registration_Date),
                      Applicant_name_title: item.Applicant_name_title,
                      Applicants_first_name: item.Applicants_first_name, 
                      Applicants_last_name: item.Applicants_last_name, 
                      TranscriptFile: item.TranscriptFile, 
                      HouseRegFile: item.HouseRegFile, 
                      Educational_Program: item.Educational_Program,
                      Exam_results: item.Exam_results,
                      ExamStatus: item.ExamStatus,
                      EnrollStatus: item.EnrollStatus
                  }));
                  console.log('fetchApplicantInfo');
                  setData(mappedApplicantdata);
              } else {
                  console.error('Results is not an array:', Applicantdata.results);
              }
          } catch (error) {
              console.log('Failed to retrieve applicant info:', error);
          }
      }
      fetchApplicantInfo(); 
    }
    else{
      getApplicantInfo();
    }
  }
}, [SelectedEnrollStatus])


// SelectedEnrollStatus

    // useEffect(() => {
    //     console.log('dataka',data)
    // }, [data])

    // useEffect(() => {
    //     console.log('olddataka',oldData)
    // }, [oldData])

    // useEffect(() => {
    //     console.log('change',selectedDropdown)
    // }, [selectedDropdown])

    // useEffect(() => {
    //     console.log('fil;te',filteredData)
    // }, [filteredData])
       
    const [ShowModalSuccess,setShowModalSuccess] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


    return (
       <>
      {ShowModalSuccess && (
        <Modal_success
          show={ShowModalSuccess} 
          setShow={setShowModalSuccess} 
          text="ระบบได้ทำการบันทึกเรียบร้อยแล้ว"
        />
      )}
      {showModalDetail && (<Modal_ApplicantDetails show={showModalDetail} setShow={setShowModalDetail} applicant_id={sendApplicantID} />)} 
      <Header header="ระบบการรับสมัครนักเรียน" subhead="ตรวจสอบข้อมูลผู้สมัคร" />  
      <div className="d-flex flex-column" style={{ fontFamily: 'Kanit, sans-serif', height: "100vh" }}>
        <div className="container flex-column align-items-center">
          <div className="mb-3">
            <br /><br />
            <h2 className="align-items-center justify-content-center" style={{ fontWeight: "bolder", fontSize: "25px" }}>รายชื่อผู้สมัครเข้าศึกษาต่อชั้นประถมศึกษาปีที่ 1</h2>
            <br />
            <div className="card" style={{ width: "100%", boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
              <div className="card-body">
                <div className="d-flex" style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px', marginTop: "5px" }}>
                  <div>
                    <span style={{ fontWeight: "bolder", fontSize: "20px", margin: "10px" }}>หลักสูตร</span>
                  </div>
                  <div className="dropdown" style={{ maxWidth: '100%' }}>
                    <select value={selectedCourse} onChange={handleSelectCourseChange} className="custom-select">
                      <option value="ทั้งหมด">ทั้งหมด</option>
                      <option value="English Program (EP)">English Program (EP)</option>
                      <option value="หลักสูตรทั่วไป">Regular Program</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex" style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px', marginTop: "10px" }}>
                  <div>
                    <input className="form-check-input" type="checkbox" name="ExamStatus" id="ExamStatus" value="สถานะการสอบ"
                      checked={SearchData === 'สถานะการสอบ'}
                      onChange={handleCheckChange}
                      style={{ border: "1px solid #a7a7a7", marginLeft: "10px" }}
                    />
                   <span style={{ fontWeight: "bolder", fontSize: "20px", margin: "5px" }}>สถานะการสอบ</span>
                  </div>
                  {ShowExamStatusCheck &&
                    <div className="dropdown" style={{ maxWidth: '100%' }}>
                      <select value={SelectedExamStatus} onChange={handleSelectExamStatusChange} className="custom-select">
                        <option value="ทั้งหมด">ทั้งหมด</option>
                        <option value="">-</option>
                        <option value="ผ่าน">ผ่าน</option>
                        <option value="ไม่ผ่าน">ไม่ผ่าน</option>
                        <option value="ขาดสอบ">ขาดสอบ</option>
                      </select>
                    </div>
                  }
                </div>
                <div className="d-flex" style={{ flexWrap: 'wrap', margin: 'auto', fontSize: '18px', marginTop: "10px" }}>
                  <div>
                    <input className="form-check-input" type="checkbox" name="EnrollStatus" id="EnrollStatus" value='สถานะการมอบตัว'
                      checked={SearchData === 'สถานะการมอบตัว'}
                      onChange={handleCheckChange}
                      style={{ border: "1px solid #a7a7a7", marginLeft: "10px" }}
                    />
                    <span style={{ fontWeight: "bolder", fontSize: "20px", margin: "5px" }}>สถานะการมอบตัว</span>
                  </div>
                  {ShowEnrollStatusCheck &&
                    <div className="dropdown" style={{ maxWidth: '100%' }}>
                      <select value={SelectedEnrollStatus} onChange={handleSelectEnrollStatusChange} className="custom-select">
                        <option value="ทั้งหมด">ทั้งหมด</option>
                        <option value="รอการสอบคัดเลือก">รอการสอบคัดเลือก</option>
                        <option value="มอบตัวสำเร็จ">มอบตัวสำเร็จ</option>
                        <option value="มอบตัวไม่สำเร็จ">มอบตัวไม่สำเร็จ</option>
                      </select>
                    </div>
                  }

                </div>
              </div>
            </div>
            <br />
            {filteredData.length === 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                
                <span style={{ color: 'gray', textAlign: 'center' }}>ไม่พบข้อมูลผู้สมัคร</span>
              </div>
            ) : (
              <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                <div className="table-wrapper">
                  <table className="table table-bordered table-striped table-hover" style={{ borderCollapse: 'collapse', textAlign: 'center', fontFamily: 'Kanit, sans-serif', fontSize: "18px" }}>
                    <thead>
                      <tr>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>เลขที่สมัคร</th>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>วันที่สมัคร</th>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>ชื่อผู้สมัคร</th>
                        {/*<th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>เอกสารแนบ</th> */}
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>หลักสูตร</th>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>รายละเอียดเพิ่มเติม</th>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>คะแนนสอบที่ได้</th>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>สถานะการสอบ</th>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>สถานะการมอบตัว</th>
                        <th rowSpan="1" style={{ backgroundColor: '#FFFFFF' }}>แก้ไข</th>


                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.Enroll_ID} style={{ height: '50px' }}>
                          <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.Registration_Number}</td>
                          <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.Registration_Date}</td>
                          <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.Applicant_name_title + item.Applicants_first_name + "  " + item.Applicants_last_name}
                          </td>
                          {/* <td style={{ backgroundColor: '#FFFFFF' }}>
                            <i 
                              className="fs-5 bi-download" 
                              style={{
                                color: 'black',
                                fontSize: '20px',
                                marginRight: '5px'
                              }}
                            ></i>                 
                              <button style={{
                                ...fontStyle,
                                color: 'black',
                                fontSize: '16px',
                                textDecoration: 'underline', // เพิ่มการขีดเส้นใต้
                                border: "none",
                                background: "none"
                              }}
                              onClick={() => window.open(item.TranscriptFile)}
                            >หลักฐานการศึกษา</button>
                            <br />
                            <i 
                              className="fs-5 bi-download" 
                              style={{
                                color: 'black',
                                fontSize: '20px',
                                marginRight: '5px'
                              }}
                            ></i>                 
                              <button style={{
                                ...fontStyle,
                                color: 'black',
                                fontSize: '16px',
                                textDecoration: 'underline', // เพิ่มการขีดเส้นใต้
                                border: "none",
                                background: "none"
                              }}
                              onClick={() => window.open(item.HouseRegFile)}
                            >สำเนาทะเบียนบ้าน</button>
                          </td> */}
                          <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>{item.Educational_Program}</td>
                          <td style={{ backgroundColor: '#FFFFFF' }}>
                            <i 
                              className="fs-5 bi-search" 
                              style={{
                                color: 'black',
                                fontSize: '20px', // ตั้งค่าขนาดตัวอักษร
                                marginRight: '5px'
                              }}
                            ></i>
                            <button style={{
                              // ...fontStyle,
                              color: 'black',
                              fontSize: '16px',
                              textDecoration: 'underline', // เพิ่มการขีดเส้นใต้
                              border: "none",
                              background: "none"
                            }}
                              onClick={(e) => handleShowDetail(item.Registration_Number)}>
                              ดูรายละเอียด
                            </button>
                          </td> {/* Additional_Details */}
                          <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>
                            {editingId === item.Enroll_ID ? (
                              <input
                                type="text"
                                value={item.Exam_results}
                                onChange={(e) => handleChange(item.Enroll_ID, 'Exam_results', e.target.value)}
                              />
                            ) : (
                              item.Exam_results || "-"
                            )}
                          </td>
                          <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>
                            {editingId === item.Enroll_ID ? (
                              <div className="dropdown" style={{ maxWidth: '100%' }}>
                                <select
                                  value={item.ExamStatus}
                                  onChange={(e) => handleChange(item.Enroll_ID, 'ExamStatus', e.target.value)}
                                  className="custom-select">
                                  <option value="-">-</option>
                                  <option value="ผ่าน">ผ่าน</option>
                                  <option value="ไม่ผ่าน">ไม่ผ่าน</option>
                                  <option value="ขาดสอบ">ขาดสอบ</option>
                                </select>
                              </div>
                            ) : (
                              item.ExamStatus || "-"
                            )}
                          </td>
                          <td style={{ backgroundColor: '#FFFFFF', fontSize: '16px' }}>
                            {/* {item.EnrollStatus} */}
                            {editingId === item.Enroll_ID ? (
                              <div className="dropdown" style={{ maxWidth: '100%' }}>
                                <select
                                  value={item.EnrollStatus}
                                  onChange={(e) => handleChange(item.Enroll_ID, 'EnrollStatus', e.target.value)}
                                  className="custom-select">
                                  <option value="รอการสอบคัดเลือก">รอการสอบคัดเลือก</option>
                                  <option value="มอบตัวสำเร็จ">มอบตัวสำเร็จ</option>
                                  <option value="มอบตัวไม่สำเร็จ">มอบตัวไม่สำเร็จ</option>
                                </select>
                              </div>
                            ) : (
                              item.EnrollStatus || "-"
                            )}
                          </td>
                          <td >
                            <span className="actions"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              onClick={() => handleEditRow(item.Enroll_ID)}
                            >
                              {editingId === item.Enroll_ID ? <BsFillFloppy2Fill /> : <BsFillPencilFill />}
                            </span>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <br />
            <div className="d-flex justify-content-center">
            <Pagination_table
              itemsPerPage={itemsPerPage}
              totalItems={filteredData.length}
              paginate={handlePageChange}
              currentPage={currentPage}
            />
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
    );
};

export default Check_Applicant_Information;