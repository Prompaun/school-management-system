import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'
import Header from '../components/Header';
import axios from 'axios';

const Checkgrade_info = ({login_Email}) => {
  const apiUrl = process.env.API_URL
  const handleGoBack = () => {
    window.history.back();
  };

  // ฟังก์ชันสำหรับเรียกใช้ API เพื่อดึงข้อมูล Student_ID จาก email ของผู้ปกครอง
  async function getStudentIdByParentEmail(email) {
    try {
        const response = await axios.get(apiUrl + '/get-student-id-grade-by-parent-email', {
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

  async function getYearSemestersByStudentId(studentId) {
    try {
        const response = await axios.get(apiUrl + '/get-year-semesters-by-student-id', {
            params: {
                studentId: studentId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching year and semesters by student ID:', error);
        throw error;
    }
  };

  async function getYearByStudentId(studentId) {
    try {
        const response = await axios.get(apiUrl + '/get-years-by-student-id', {
            params: {
                studentId: studentId
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching year by student ID:', error);
        throw error;
    }
  };

  async function getSemesterByStudentId(selectedStudent_ID, selectedYear) {
    try {
        const response = await axios.get(apiUrl + '/get-semesters-by-student-id', {
            params: {
                studentId: selectedStudent_ID,
                Year: selectedYear
            }
        })
        return response.data;
    } catch (error) {
        console.error('Error fetching Semester by student ID:', error);
        throw error;
    }
  };

  async function getGradeInfo(selectedStudent_ID, selectedYear, Semesters) {
    try {
        const response = await axios.get(apiUrl + '/get-grade-info', {
            params: {
                studentId: selectedStudent_ID,
                year: selectedYear,
                semester: Semesters
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Grade by student ID:', error);
        throw error;
    }
  };
  // ตัวอย่างการใช้งานฟังก์ชัน
  // const parentEmail = login_Email; // เปลี่ยนเป็นอีเมลของผู้ปกครองที่ต้องการค้นหา
  // getStudentIdByParentEmail(parentEmail)
  //   .then(data => {
  //       console.log('Student IDs:', data);
  //   })
  //   .catch(error => {
  //       console.error('Error:', error);
  //   });
  
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
  // ]);getStudentIdByParentEmail(login_Email)
  const [StudentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedStudent_ID, setSelectedStudent_ID] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  // const [Semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [tableHeader, setTableHeader] = useState("");
  const [subjectObject, setSubjectObject] = useState([]);

  const [useEffect_state, setuseEffect_state] = useState(
      {
        no1 : 0,
        no2 : 0,
        no3 : 0,
        no4 : 0
      }
  )
  // const selectedStudent = "ID3 : Mr. Bob Smith";

useEffect(() => {
    const fetchData = async () => {
        try {
              console.log('useEffect No.1');
              const studentDataArray = await getStudentIdByParentEmail(login_Email);
              const formattedStudentData = studentDataArray.map(student => ({
                  ...student,
                  key: student.Student_ID, // ใช้ Student_ID เป็น key
                  StudentID: student.Student_ID,
                  nameTitle: student.NameTitle,
                  Firstname: student.FirstName,
                  Lastname: student.LastName
              }));
              // console.log('formattedStudentData:', formattedStudentData);
              setStudentData(formattedStudentData);

              // หา Student_ID ค่าแรกที่พบ
              if (studentDataArray.length > 0) {
                const firstStudentId = studentDataArray[0].Student_ID;
                // const getstudentData = studentDataArray[0];
                setSelectedStudent(studentDataArray[0].Student_ID + " : " + studentDataArray[0].NameTitle + studentDataArray[0].FirstName + " " + studentDataArray[0].LastName);
                // setSelectedStudent(`ปีการศึกษา`);
                console.log(studentDataArray[0].Student_ID + " : " + studentDataArray[0].NameTitle + studentDataArray[0].FirstName + " " + studentDataArray[0].LastName);
                console.log('First Student ID:', firstStudentId);
                const yearSemesters = await getYearSemestersByStudentId(firstStudentId);
                // console.log('Year semesters:', yearSemesters);

                // หา Year และ Semester ที่มีค่ามากที่สุด
                let maxYear = 0;
                let maxSemester = 0;
                yearSemesters.forEach(({ Year, Semester }) => {
                    maxYear = Math.max(maxYear, parseInt(Year));
                });

                const getSemester = await getSemesterByStudentId(firstStudentId, maxYear);
                // console.log('getSemester:', getSemester);
                maxSemester = Math.max(maxSemester, parseInt(getSemester));
                console.log('maxSemester:', maxSemester);
                const gradeInfo = await getGradeInfo(firstStudentId, maxYear, maxSemester);
                const mappedGradeInfo = gradeInfo.map(item => ({
                  id: item.Subject_ID,
                  name: item.Subject_Name,
                  score: item.Score_mid,
                  credits: item.Subject_Credit,
                  between_full: item.Full_score_mid,
                  final_full: item.Full_score_final,
                  between_get: item.Score_mid,
                  final_get: item.Score_final,
                  totalScore: item.Total_score,
                  grade: item.Subject_grade,
                }));
                setSubjectObject(mappedGradeInfo);
                console.log('Max Year:', maxYear);
                console.log('Max Semester:', maxSemester);
                setTableHeader(`ปีการศึกษา ${maxYear} ภาคการศึกษาที่ ${maxSemester}`);
                setSelectedYear(maxYear);
                setSelectedSemester(maxSemester);
                // const years = await getYearByStudentId("ID1");
                // const semesters = await getSemesterByStudentId(studentDataArray[0].Student_ID, maxYear);
                // setYearData({
                //     Year: years.map(year => year.toString()).sort(),
                //     Semester: semesters.sort()
                // });
              } else {
                  console.log('No student data found');
              }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  // ตั้งค่า initialState สำหรับ YearData
  const initialState = {
    Year: [],
    Semester: []
  };

// สร้าง useState โดยกำหนด initialState
const [YearData, setYearData] = useState(initialState);

// สร้าง useEffect เพื่อเรียกใช้ API เมื่อ component ถูกโหลด
useEffect(() => {
  const fetchData = async () => {
    try {
        // if (selectedStudent !== '' && useEffect_state.no1 === 1){
        if (selectedStudent !== ''){
          console.log('useEffect No.2');
          // แยกค่า StudentID โดยใช้ split เพื่อแยกสตริงด้วยช่องว่างและเลือกค่าตัวแรก
          const selectedStudent_ID = selectedStudent.split(' ')[0];
          setSelectedStudent_ID(selectedStudent_ID);
          // setSelectedYear('');
          // setSelectedSemester('');

          console.log("selectedStudent_ID:", selectedStudent_ID); // พิมพ์ค่า StudentID ที่ได้

          const years = await getYearByStudentId(selectedStudent_ID);
          const formattedData = {
            Year: years.map(year => year.toString()).sort(), // แปลงปีเป็นสตริง
            Semester: [] // ประกาศค่าซีเมสเตอร์ที่ต้องการเป็นอาเรย์
          };
          setYearData(formattedData); // เซ็ตข้อมูลลงใน YearData state
          setSelectedYear("");
        }
      } catch (error) {
        console.error('Error fetching years:', error);
      }
    };

  fetchData(); // เรียกใช้ฟังก์ชัน fetchData เมื่อ component ถูกโหลด
}, [selectedStudent]);

useEffect(() => {
  const fetchData = async () => {
    if (selectedStudent_ID && selectedYear) {
      console.log('useEffect No.3');
      try {
        const semesters = await getSemesterByStudentId(selectedStudent_ID, selectedYear);
        // setSemesters(semesters);
        setYearData(prevState => ({
          ...prevState,
          Semester: semesters.sort()
        }));
      } catch (error) {
        console.error('Error fetching semesters:', error);
      }
    }
    else{
      setYearData(prevState => ({
        ...prevState,
        Semester: []
      }));
    }
  };

  fetchData();
}, [selectedYear]);

useEffect(() => {
  if (selectedStudent_ID && selectedYear && selectedSemester) {
    console.log('useEffect No.4');
    const fetchData = async () => {
      try {
        const gradeInfo = await getGradeInfo(selectedStudent_ID, selectedYear, selectedSemester);
        console.log('Grade info:', gradeInfo);
        const mappedGradeInfo = gradeInfo.map(item => ({
          id: item.Subject_ID,
          name: item.Subject_Name,
          score: item.Score_mid,
          credits: item.Subject_Credit,
          between_full: item.Full_score_mid,
          final_full: item.Full_score_final,
          between_get: item.Score_mid,
          final_get: item.Score_final,
          totalScore: item.Total_score,
          grade: item.Subject_grade,
        }));
        setSubjectObject(mappedGradeInfo);
      } catch (error) {
        console.error('Error fetching grade information:', error);
      }
    };

    fetchData(); 
  }
}, [selectedSemester]);


  // const [YearData, setYearData] = useState(
  //   {
  //     Year : ["2565","2564","2563"],
  //     Semester : ["1","2"]
  //   }
         
  // );
  const { Year,Semester } = YearData;
  
  // const [subjectObject, setSubjectObject] = useState(
  //   [
  //     { id: '001', name: 'วิชา A', score: 85, credits:'0.5', between_full:'80', final_full:'20', between_get:'79', final_get:'20', totalScore:'99', grade: 'A', result: 'ดีเด่น' },
  //     { id: '002', name: 'วิชา B', score: 92, credits:'1', between_full:'70', final_full:'30', between_get:'56', final_get:'24',  totalScore:'80', grade: 'A', result: 'ดีมาก' },
  //     { id: '003', name: 'วิชา C', score: 78, credits:'1', between_full:'70', final_full:'30', between_get:'53', final_get:'20', totalScore:'73', grade: 'B', result: 'ดี' },
  //   ]
    
  //   );

  const handleStudentChange = (event) => {
    const selectedStudentValue = event.target.value;
    setSelectedStudent(selectedStudentValue);
    console.log("selectedStudentValue",selectedStudentValue);
    setuseEffect_state(prevState => ({
      ...prevState,
      no1: 1
    }));
    console.log("useEffect_state.no1",useEffect_state.no1);
  };
  
  const handleYearChange = (event) => {
    const selectedYearValue = event.target.value;
    setSelectedYear(selectedYearValue);
    setSelectedSemester("");
    // if (selectedYearValue) {
    //   const semesters = subjectObject[selectedYearValue];
    //   setChapters(semesters);
    // } else {
    //   setChapters([]); // เมื่อไม่ได้เลือกปีการศึกษาให้ล้าง chapters
    // }
  };
  
  const handleSemesterChange = (event) => {
    const selectedSemesterValue = event.target.value;
    setSelectedSemester(selectedSemesterValue);
  };

  useEffect(() => {
    
    if (selectedYear && selectedSemester) {
      setTableHeader(`ปีการศึกษา ${selectedYear} ภาคการศึกษาที่ ${selectedSemester}`);
    }
    // else {
    //   setTableHeader(`ปีการศึกษา ${Year[0]} ภาคการศึกษาที่ ${Semester[0]}`);
    // }
  }, [selectedYear, selectedSemester]);


  return (
    <>
      

      <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับผู้ปกครอง" />
      <br />
      <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height:"100vh"}}>
      <div className="container d-flex flex-column align-items-center justify-content-center" style={{ marginLeft: 'auto', marginRight: 'auto',fontWeight:"bold" }}>
        <h2>ระบบตรวจสอบผลการเรียน</h2>
      </div>

      <div className="container d-flex align-items-center justify-content-center"style={{ flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px'}}>
            <div className="d-flex align-items-center">
              <span style={{marginRight:"10px"}}>เลือกข้อมูลนักเรียน :</span>
            </div>
            <div className="dropdown" style={{ maxWidth: '100%' }}>
            <select value={selectedStudent} onChange={handleStudentChange} className="custom-select">
                {/* <option value="">{selectedStudent}</option> */}
                {StudentData.map((student, index) => (
                  <option key={index} value={student.StudentID} >
                    {student.StudentID} : {student.nameTitle} {student.Firstname} {student.Lastname}
                  </option>
                ))}
              </select>
            </div>
        </div>

      </div>
      <div className="container d-flex align-items-center justify-content-center"style={{ flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px'}}>
            <div className="d-flex align-items-center">
              <span style={{marginRight:"10px"}}>ปีการศึกษา :</span>
            </div>
            <div className="dropdown" style={{ maxWidth: '100%' }}>
              <select value={selectedYear} onChange={handleYearChange} className="custom-select">
                <option value="">เลือกปีการศึกษา</option>
                {Year.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
        </div>
         
        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px'}}>
          <div className="d-flex align-items-center">
            <span style={{marginRight:"10px"}}>ภาคเรียนที่ :</span>
          </div>
          <div className="dropdown" style={{ maxWidth: '100%' }}>
                <select value={selectedSemester} onChange={handleSemesterChange} className="custom-select">
                  <option value="">เลือกภาคเรียน</option>
                  {Semester.map((semesterData) => (
                        <option key={semesterData} value={semesterData}>
                          {semesterData}
                        </option>
                      ))}
                </select>
              </div>
        </div>
      </div>
      <br /> {/* เพิ่มแท็ก <br /> เพื่อสร้างการเว้นบรรทัด margin: 'auto', */}
        
        <div className="container flex-column align-items-center">
        {/* <table className="table-bordered" style={{ textAlign: 'center',fontFamily: 'Kanit, sans-serif'}}> */}
        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
        <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>


        <thead>          
          <tr>
          <th colSpan="9" style={{ textAlign: 'center' }}>{tableHeader}</th>
          </tr>

          <tr>
            <th rowSpan="3">รหัสวิชา</th>
            <th rowSpan="3">ชื่อวิชา</th>
            <th rowSpan="3">หน่วยกิต</th>
            <th colSpan="4" style={{ textAlign: 'center' }}>ผลการเรียน</th>
            <th rowSpan="3">คะแนนรวม</th>
            <th rowSpan="3">เกรด</th>
          </tr>
          <tr>
            <th colSpan="2">ระหว่างภาค</th>
            <th colSpan="2">ปลายภาค</th>
          </tr>
          <tr>
            <th>เต็ม</th>
            <th>ได้</th>
            <th>เต็ม</th>
            <th>ได้</th>
          </tr>
        </thead>

        <tbody>
        {subjectObject.map((subject) => (
        <tr key={subject.id} style={{ height: '50px' }}>
          <td >{subject.id}</td>
          <td >{subject.name}</td>
          <td >{subject.credits}</td>
          <td >{subject.between_full}</td>
          <td >{subject.between_get}</td>
          <td >{subject.final_full}</td>
          <td >{subject.final_get}</td>
          <td >{subject.totalScore}</td>
          <td >{subject.grade}</td>
        </tr>
      ))}
    </tbody>


        </table>
        <br />
        </div>
        </div>
        
        </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default Checkgrade_info