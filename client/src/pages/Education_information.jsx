import React, { useState, useEffect } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import printer_icon from "../images/printer_icon.png";
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar'
import Header from '../components/Header';
// import { getSearchParamsForLocation } from 'react-router-dom/dist/dom';
// import { URLSearchParams } from 'url';
import axios from 'axios';

const Education_information = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        color: 'white',
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    async function getYearByStudentId(studentId) {
    try {
        const response = await axios.get('http://localhost:8080/get-years-by-student-id', {
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
        const response = await axios.get('http://localhost:8080/get-semesters-by-student-id', {
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
            const response = await axios.get('http://localhost:8080/get-grade-info', {
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

    const [Yeardata, setYearData] = useState(
    {
        // Year : ["2565","2564","2563"],
        // Semester : ["1","2"]
        Year: [],
        Semester: []
    }
            
    );

    const [StudentData,setStudentData] = useState(
    [
        // {
        //     StudentID : "6301012630095",
        //     NameTitle : "เด็กหญิง",
        //     Surname : "รักดี",
        //     Lastname : "น้ำใจงาม"
        // }
        {
            StudentID : "",
            Name: "",
            NameTitle : "",
            Surname : "",
            Lastname : ""
        }
    ]

    );
    const { Year,Semester } = Yeardata;

    const [subjectObject, setSubjectObject] = useState([]);
    
    // const [subjectObject, setSubjectObject] = useState(
    // [
    //     { id: '001', name: 'วิชา A', score: 85, credits:'0.5', between_full:'80', final_full:'20', between_get:'79', final_get:'20', totalScore:'99', grade: 'A', result: 'ดีเด่น' },
    //     { id: '002', name: 'วิชา B', score: 92, credits:'1', between_full:'70', final_full:'30', between_get:'56', final_get:'24',  totalScore:'80', grade: 'A', result: 'ดีมาก' },
    //     { id: '003', name: 'วิชา C', score: 78, credits:'1', between_full:'70', final_full:'30', between_get:'53', final_get:'20', totalScore:'73', grade: 'B', result: 'ดี' },
    // ]
    
    // );

    const [selectedYear, setSelectedYear] = useState("");
    
    const [selectedSemester, setSelectedSemester] = useState("");
    const [tableHeader, setTableHeader] = useState("");

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
    //     setTableHeader(`ปีการศึกษา ${Year[0]} ภาคการศึกษาที่ ${Semester[0]}`);
    // }
    }, [selectedYear, selectedSemester]);

    const location = useLocation();
    //   console.log("Student_ID:", location);
    const SearchParams = new URLSearchParams(location.search);
    const studentID_param = SearchParams.get("id");
    const namme_param = SearchParams.get("name");
//     const studentID_param = "ID1";
//     const namme_param = "ID1";

// const { id, name, otherValue } = location.state || {};
//     console.log("id",id);
//     console.log("location",location);
    
    // หาชื่อจากพารามิเตอร์ id
    useEffect(() => {
        if (studentID_param && namme_param) {
            console.log("id:", studentID_param); // พิมพ์ชื่อที่ได้
            setStudentData(prevState => ({
                ...prevState,
                [0]: {
                    ...prevState[0],
                    StudentID: studentID_param,
                    Name: namme_param
                }
            }));
        }
    }, []);
    
    // useEffect(() => {
    //     if (namme_param) {
    //         console.log("Name:", namme_param); // พิมพ์ชื่อที่ได้
    //     }
    // }, [namme_param]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const StudentYears = await getYearByStudentId(studentID_param);
                console.log('StudentYears:', StudentYears);

                const maxYear = Math.max(...StudentYears);
                console.log('ค่าที่มากที่สุดใน StudentYears:', maxYear);

                setYearData(prevState => ({
                ...prevState,
                Year: StudentYears.map(year => year.toString()).sort()
                }));

                // if (StudentYears.length > 0) {
                //     console.log('Years retrieved successfully!');
                //     console.log('First year:', StudentYears[0]);

                //     const maxYear = Math.max(...StudentYears);
                //     console.log('ค่าที่มากที่สุดใน StudentYears:', maxYear);

                //     console.log('Max Year:', maxYear);
                // } else {
                //     console.log('No years retrieved!');
                // }
                const getSemester = await getSemesterByStudentId(studentID_param, maxYear);
                // console.log('getSemester:', getSemester);
                const maxSemester = Math.max(...getSemester.map(sem => parseInt(sem)));
                console.log('getSemester:', getSemester);
                console.log('maxSemester:', maxSemester);
                const gradeInfo = await getGradeInfo(studentID_param, maxYear, maxSemester);
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

                console.log('Max Semester:', maxSemester);
                setTableHeader(`ปีการศึกษา ${maxYear} ภาคการศึกษาที่ ${maxSemester}`);
                setSelectedYear(maxYear);
                setSelectedSemester(maxSemester);
            //   const years = await getYearByStudentId("ID1");

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          if (selectedYear) {
            try {
              const semesters = await getSemesterByStudentId(studentID_param, selectedYear);
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
    if (selectedYear && selectedSemester) {
        const fetchData = async () => {
        try {
            const gradeInfo = await getGradeInfo(studentID_param, selectedYear, selectedSemester);
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

    return (
        <>
            

            <Header header="ระบบจัดการข้อมูลการศึกษา" subhead="" />  
             
            <div className="container"style={{height:"100vh"}}> 
            <div className="flex-column"> 
                <div className="justify-content-center"> 
           
                <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                        <div className="d-flex align-items-center">
                            <h2 className="card-heading" style={{ fontSize: '25px', fontWeight: 'bold',padding:"10px"}}>ผลการค้นหา</h2>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <Link to="/Filter_student_information">
                                <button type="submit" className="btn btn-primary" style={{ ...fontStyle, color: 'white', textAlign: 'center',padding:"10px"}}><span>ค้นหาข้อมูลใหม่</span></button>
                            </Link>
                        </div>
                        </div>
                    <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>

                        <div className="card" style={{width: "100vw"}}>
                            <div className="card-body">
                                
                                <div className="form-group col-md-0 fone">
                                <div className="d-flex align-items-center"style={{ flexWrap: 'wrap' }}>
                                    <div className="d-flex align-items-center">
                                        <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px',padding:"10px" ,flexWrap: 'wrap'}}>ข้อมูลรายชื่อ</h2>
                                        </div>   
                                        <div className="d-flex align-items-center">    
                                        <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px',padding:"10px",flexWrap: 'wrap' }}>&gt;</h2>
                                        </div>
                                        <div className="d-flex align-items-center">   
                                        <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px',padding:"10px",flexWrap: 'wrap' }}>รายละเอียด</h2>
                                    </div>
                                    </div>

                                <br />
                                
                                <div className="card" style={{ width: "auto" }}>
                                {/* maxWidth:"100%",justifyContent:"center" */}
                                    <div className="card-body">
                                        
                                        <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>   
                                        <div style={{ fontSize: '18px'}}> 
                                        <div className="align-items-center">
                                                
                                                <label htmlFor="Student_ID" className="col-form-label"style={{ fontWeight:"bold"}}>เลขประจำตัวนักเรียน</label>
                                                </div> 
                                            <div className="align-items-center"style={{maxWidth:"100%"}}>  
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="Student_ID"
                                                    name="Student_ID"
                                                    value={StudentData[0].StudentID}
                                                    readOnly
                                                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                                                    />            
                                            </div>
                                                                                
                                            </div>                                  
                                        <div style={{ fontSize: '18px'}}> 
                                                <div className="align-items-center">
                                                    <label htmlFor="fullname" className="col-form-label"style={{ fontWeight:"bold"}}>ชื่อ-นามสกุล</label>
                                                    </div> 
                                                <div className="align-items-center"style={{width:"auto"}}> 
                                                    <input 
                                                        type="text" 
                                                        className="form-control"
                                                        id="fullname" 
                                                        name="fullname" 
                                                        value={`${StudentData[0].Name}`}
                                                        readOnly 
                                                        style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                                                        // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                                                    />
                                                </div>
                                                </div>
                                            
                                        </div>
                                            <br />
                                            <div className="d-flex align-items-center"style={{ flexWrap: 'wrap', fontFamily: 'Kanit, sans-serif' }}>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                                    <div className="d-flex align-items-center">
                                                    <span style={{marginRight:"5px",fontWeight:"bold"}}>ปีการศึกษา :</span>
                                                    </div>
                                                    <div className="dropdown" style={{ maxWidth: '100%',padding:"5px" }}>
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
                                                
                                                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                                <div className="d-flex align-items-center">
                                                    <span style={{marginRight:"5px",fontWeight:"bold"}}>ภาคเรียนที่ :</span>
                                                </div>
                                                <div className="dropdown" style={{ maxWidth: '100%' ,padding:"5px"}}>
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
                                        
                                    </div>
                                </div>
                                
                                <br />
                                

                                {subjectObject.length === 0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px',fontFamily: 'Kanit, sans-serif'}}>
                                        <div className="container mt-5 d-flex flex-column align-items-center">
                                            <span className="ms-3 mb-0" style={{ color: 'gray' }}>ไม่พบข้อมูลเกรดของนักเรียนท่านนี้</span>
                                        </div>
                                    </div>
                                    
                                ) : (
                                <>
                                    <div className="align-items-center">
                                        <div className="container d-flex justify-content-end">
                                            <span
                                                className="btn btn-link"
                                                style={{ color: 'black', textDecoration: 'none', fontFamily: 'Kanit, sans-serif', marginRight: '4px', cursor: 'pointer', marginTop: '-2px' }}
                                                onClick={() => {
                                                    const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                    const printWindow = window.open(fileUrl, "_blank", 'width=1000,height=800');
                                                    printWindow.print();
                                                }}
                                                >
                                                พิมพ์ข้อมูล
                                            </span>

                                            <img
                                                src={printer_icon}  // Replace with the path to your printer icon image
                                                alt="Printer Icon"
                                                style={{ width: '25px', height: '25px', cursor: 'pointer', marginTop: '5px' }}
                                                onClick={() => {
                                                    const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                    const printWindow = window.open(fileUrl, "_blank", 'width=1000,height=800');
                                                    printWindow.print();
                                                }}
                                            />
                                        
                                        </div>
                                    </div>

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
                                </>
                                )}
                                
                                <br />
                                    <button
                                        type="button"
                                        className="btn btn-primary float-end"
                                        style={{ ...fontStyle, fontSize: '16px', textAlign: 'right' }}
                                        onClick={() => {
                                            window.history.back();
                                        }}
                                        >
                                        <span>ย้อนกลับ</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
           
        
        </>
    );
};

export default Education_information;
