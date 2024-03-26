import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";
import { Dropdown, Modal } from 'react-bootstrap';
import axios from 'axios';

// import Modal_subject from "../components/Modal_subject";
const Subject_Score_Record = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };
      
    const [YearData, setYearData] = useState(
    {
      Year : [],
      Semester : []
    }
    );
    //   const [selectedYear, setSelectedYear] = useState();

    const { Year,Semester } = YearData;

    async function getyeardropdown() {
        try {
            const response = await axios.get('http://localhost:8080/teaching-assignment-get-year', {});
            const newYears = response.data.map(item => item.year.toString());
            setYearData(prevYearData => ({
                ...prevYearData,
                Year: newYears
            }));
            return response.data;
        } catch (error) {
            console.error('Error fetching year dropdown:', error);
            throw error;
        }
    };

    async function getsemesterdropdown() {
        if (selectedYear !== "เลือกปีการศึกษา") {
            try {
                const response = await axios.post('http://localhost:8080/teaching-assignment-get-semester', {
                    year : selectedYear
                });
                const newSemester = response.data.map(item => item.Semester.toString());
                setYearData(prevYearData => ({
                    ...prevYearData,
                    Semester: newSemester
                }));
                return response.data;
            } catch (error) {
                console.error('Error fetching semester dropdown:', error);
                throw error;
            }
        }
        else {
            setYearData(prevSemesterData => ({
                ...prevSemesterData,
                Semester: []
            }));
        }
    };

    async function getsubjectdropdown() {
        if (selectedSemester !== "เลือกภาคการศึกษา") {
            try {
                const response = await axios.post('http://localhost:8080/teaching-assignment-get-subject', {
                    year : selectedYear,
                    semester : selectedSemester
                });
                const newSubject = response.data.map(item => item.subject_name.toString());
                setSubjectData(prevSubjectData => ({
                    ...prevSubjectData,
                    Subject : newSubject
                }));
                return response.data;
            } catch (error) {
                console.error('Error fetching subjet dropdown:', error);
                throw error;
            }
        } else {
            setSubjectData(prevSubjectData => ({
                ...prevSubjectData,
                Subject : []
            }));
        }
    };

    async function getAssessmentInfo() {
        if (selectedSubject !== "เลือกวิชา") {
            try {
                const response = await axios.post('http://localhost:8080/assessment-get-name-proportion', {
                    year : selectedYear,
                    semester : selectedSemester,
                    subject : selectedSubject
                });
                const newInfo = response.data.map((item, index) => ({
                    ...item,
                    id: index,
                    saved: true
                }));
                setAssessment(newInfo);
                return response.data;
            } catch (error) {
                console.error('Error fetching year dropdown:', error);
                throw error;
            }
        }
    };

    async function updateAssessmentInfo(id) {
        if (selectedSubject !== "เลือกวิชา") {
            try {
                const response = await axios.post('http://localhost:8080/update-assessment', {
                    assessment_name: Assessment[id].Assessment_name, 
                    assessment_proportion: Assessment[id].Assessment_proportion, 
                    id: Assessment[id].Assessment_id
                });
                return response.data;
            } catch (error) {
                console.error('Error fetching year dropdown:', error);
                throw error;
            }
        }
    };

    async function insertAssessmentInfo(id) {
        console.log(Assessment)
        if (selectedSubject !== "เลือกวิชา") {
            try {
                const response = await axios.post('http://localhost:8080/insert-new-assessment', {
                    subject: selectedSubject, 
                    assessment_name: Assessment[id].Assessment_name, 
                    assessment_proportion: Assessment[id].Assessment_proportion, 
                    year: selectedYear, 
                    semester: selectedSemester
                });
                setSubjectData(prevSubjectData => ({
                    ...prevSubjectData,
                    saved:true
                }));
                return response.data;
            } catch (error) {
                console.error('Error fetching year dropdown:', error);
                throw error;
            }
        }
    };
    

    useState(() => {
        getyeardropdown();
    }, []);

    //   const handleSelectYearChange = (event) => {
    //     setSelectedYear(event.target.value);
    //   };

    // const [Year, setYear] = useState([]);
    // const [Semester, setSemester] = useState([]);
    const [selectedYear, setSelectedYear] = useState("เลือกปีการศึกษา");
    const [selectedSemester, setSelectedSemester] = useState("เลือกภาคการศึกษา");
    const [selectedSubject, setSelectedSubject] = useState("เลือกวิชา");
    const [selectedClassYear, setSelectedClassYear] = useState("เลือกชั้นปี");
    const [selectedRoom, setSelectedRoom] = useState("เลือกห้อง");

    useEffect(() => {
        getsemesterdropdown();
    }, [selectedYear])

    useEffect(() => {
        getsubjectdropdown();
    }, [selectedSemester])

    const handleSelectYearChange = (event) => {
      setSelectedYear(event.target.value);
      // ตั้งค่าให้ดรอปดาวน์ "ภาคการศึกษา" เป็นค่าเริ่มต้น
      setSelectedSemester("เลือกภาคการศึกษา");
      setSelectedSubject("เลือกวิชา");
      setSelectedClassYear("เลือกชั้นปี");
      setSelectedRoom("เลือกห้อง");
    };
    
    const handleSelectSemesterChange = (event) => {
      setSelectedSemester(event.target.value);
      setSelectedSubject("เลือกวิชา");
      setSelectedClassYear("เลือกชั้นปี");
      setSelectedRoom("เลือกห้อง");
    };
    
    const handleSelectSubjectChange = (event) => {
        setSelectedSubject(event.target.value);
        setSelectedClassYear("เลือกชั้นปี");
        setSelectedRoom("เลือกห้อง");
      };
    const handleSelectClassYearChange = (event) => {
      setSelectedClassYear(event.target.value);
      setSelectedRoom("เลือกห้อง");
    };
    
    const handleSelectRoomChange = (event) => {
      setSelectedRoom(event.target.value);
    };

    const [SubjectData,setSubjectData] = useState(
    {
        Subject: []
    }
    );
    const { Subject } = SubjectData;
    
    const [classNameroomData,setclassNameroomData] = useState(
        {
            classYear : ["1","2","3","4","5","6"],
            classroom : ["1","2","5"]
        }
        );
    const { classroom,classYear} = classNameroomData;

    const [ShowAssessment,setShowAssessment] =useState(false);

    useEffect(() => {
      if (selectedSubject!=="เลือกวิชา"){
        setShowAssessment(true);
      }
      else {
        setShowAssessment(false);
      }
    }, [selectedSubject]);
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [Assessment, setAssessment] = useState([
        // {id:1, Assessment_name: "สอบกลางภาค", Assessmant_propotion: 30},
        // {id:2, Assessment_name: "สอบปลายภาค", Assessmant_propotion: 30},
        // {id:3, Assessment_name: "การบ้าน", Assessmant_propotion: 10},
        // {id:4, Assessment_name: "สอบย่อย", Assessmant_propotion: 10},
        // {id:5, Assessment_name: "โครงงาน", Assessmant_propotion: 20},
    ]);
    
    useEffect(() => {
        getAssessmentInfo();
    }, [selectedSubject])

    useEffect(() => {
        console.log('assessment', Assessment)
    }, [Assessment])

    const [editingId, setEditingId] = useState(null);
    const handleEditRow = (id) => {
        setEditingId(id === editingId ? null : id);
        if (id === editingId){
            if (Assessment[id].saved && Assessment[id].Assessment_name !== '' && Assessment[id].Assessment_proportion !== ''){
                updateAssessmentInfo(id);
            } else if (Assessment[id].saved && (Assessment[id].Assessment_name !== '' || Assessment[id].Assessment_proportion !== '')) {
                setEditingId(id)
                alert('กรุณากรอกข้อมูลให้ครบ')
            } else if (!Assessment[id].saved && Assessment[id].Assessment_name !== '' && Assessment[id].Assessment_proportion !== '') {
                insertAssessmentInfo(id);
            } else {
                Assessment.splice(id, 1);
                alert('กรุณากรอกข้อมูลให้ครบ')
            }
        }
    };
      
    const handleChange = (id, field, value) => {
    setAssessment(
        Assessment.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
        )
    );
    };

    const handleDeleteRow = (id) => {
    setAssessment(Assessment.filter((row) => row.id !== id));
    };
    const handleAddRow = () => {
    setAssessment([...Assessment, { id: Assessment.length, Assessment_name: '', Assessment_proportion: '', saved: false }]);
    };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [ShowStudentScore,setShowStudentScore] =useState(false);

    useEffect(() => {
      if (selectedRoom!=="เลือกห้อง"){
        setShowStudentScore(true);
      }
      else {
        setShowStudentScore(false);
      }
    }, [selectedRoom]);
    
    const [StudentScore, setStudentScore] = useState([
        { id: 6, StudentID: "6301", nameTitle: "เด็กชาย", Surname: "สมคิด", Lastname: "สามเขา", 
            scores: { "สอบกลางภาค": "20", "สอบปลายภาค": "10", "การบ้าน": "5", "สอบย่อย": "15", "โครงงาน": "15" } 
        },
        { id: 7, StudentID: "6302", nameTitle: "เด็กชาย", Surname: "สมรัก", Lastname: "ใจงาม", 
            scores: { "สอบกลางภาค": "", "สอบปลายภาค": "", "การบ้าน": "", "สอบย่อย": "", "โครงงาน": "" } 
        },
        { id: 8, StudentID: "6303", nameTitle: "เด็กชาย", Surname: "สมปอง", Lastname: "รักสงบ", 
            scores: { "สอบกลางภาค": "", "สอบปลายภาค": "", "การบ้าน": "", "สอบย่อย": "", "โครงงาน": "" } 
        },
        { id: 9, StudentID: "6304", nameTitle: "เด็กหญิง", Surname: "สมหมาย", Lastname: "จิตสะอาด", 
            scores: { "สอบกลางภาค": "", "สอบปลายภาค": "", "การบ้าน":"", "สอบย่อย": "", "โครงงาน": "" } 
        },
        { id: 10, StudentID: "6305", nameTitle: "เด็กหญิง", Surname: "สมจิต", Lastname: "ศรีไพโรจน์", 
            scores: { "สอบกลางภาค": "", "สอบปลายภาค": "", "การบ้าน": "", "สอบย่อย": "", "โครงงาน": "" } 
        },
      ]);
    
  const assessmentNames = Object.keys(StudentScore[0].scores);
    const [editingIdScore, setEditingIdScore] = useState(null);
    const handleEditRowScore = (id) => {
        setEditingIdScore(id === editingIdScore ? null : id);
      
      };
      
      const handleChangeScore = (id, field, value) => {
        setStudentScore(
          StudentScore.map((row) =>
            row.id === id ? { ...row, scores: { ...row.scores, [field]: value } } : row
          )
        );
      };

    //   const handleDeleteRowScore = (id) => {
    //     setAssessment(StudentScore.filter((row) => row.id !== id));
    //   };
    //   const handleAddRowScore = () => {
    //     setAssessment([...StudentScore, { id: StudentScore.length + 1, Assessment_name: '', Assessmant_propotion: '' }]);
    //   };

    return (
        <>
           
            <Header header="ระบบจัดการข้อมูลการศึกษา" subhead="บันทึกคะแนนรายวิชา" />  
             <div style={{height:"150vh",fontFamily:"Kanit, sans-serif"}}>
            <div className="container"> 
            <div className="flex-column"> 
                <div className="justify-content-center"> 
                       
                <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                            <h2 className="card-heading"style={{ fontSize: '25px', fontWeight: 'bold'}}>บันทึกคะแนน</h2>
                        </div>
                    
                    <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                        
                        <div className="card"  style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
                            <div className="card-body">
                                <div className="form-group col-md-0 fone" style={{ padding: '10px' }}>
                                <div className="d-flex align-items-center"style={{ flexWrap: 'wrap'}}>
                                    <span style={{margin:"10px",fontWeight: 'bold',fontSize:"20px"}}>เกณฑ์การให้คะแนน</span>
                                    </div>
                        
                                    <div className="d-flex align-items-center"style={{ flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                    <div className="d-flex align-items-center">
                                        <span style={{margin:"10px"}}>ปีการศึกษา :</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                        <div className="dropdown" style={{ maxWidth: '100%' }}>
                                            <select
                                            value={selectedYear}
                                            onChange={handleSelectYearChange}
                                            className="custom-select"
                                            >
                                            <option value="เลือกปีการศึกษา">เลือกปีการศึกษา</option>
                                            {Year.map((year,index) => (
                                                <option key={index} value={year}>
                                                    {year}
                                                </option>
                                                ))}
                                            </select>
                                        </div>
                                        </div>
                                        </div>
                                        {/* แสดง "ภาคการศึกษา" เมื่อเลือก "ปีการศึกษา" */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                    <div className="d-flex align-items-center">
                                    <span style={{margin:"10px"}}>ภาคการศึกษา :</span>
                                    </div>
                                        <div className="d-flex align-items-center">
                                        <div className="dropdown" style={{ maxWidth: '100%' }}>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <select
                                            value={selectedSemester}
                                            onChange={handleSelectSemesterChange}
                                            className="custom-select"
                                            
                                            >
                                                
                                            <option value="เลือกภาคการศึกษา">เลือกภาคการศึกษา</option>
                                                {selectedYear !== "เลือกปีการศึกษา" && (
                                                <>
                                                  {Semester.map((semesterData,index) => (
                                                        <option key={index} value={semesterData}>
                                                        {semesterData}
                                                        </option>
                                                    ))}
                                                </>
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                    <div className="d-flex align-items-center">
                                    <span style={{margin:"10px"}}>วิชา :</span>
                                    </div>
                                        <div className="d-flex align-items-center">
                                        <div className="dropdown" style={{ maxWidth: '100%',marginRight:"10px"  }}>
                                            <select
                                            value={selectedSubject}
                                            onChange={handleSelectSubjectChange}
                                            className="custom-select"
                                      
                                            >
                                            <option value="เลือกวิชา">เลือกวิชา</option>

                                            {selectedSemester !== "เลือกภาคการศึกษา" && (
                                            <>
                                               {Subject.map((subject,index) => (
                                                        <option key={index} value={subject}>
                                                        {subject}
                                                        </option>
                                                    ))}
                                            </>
                                            )}
                                            </select>
                                        </div>
                                        </div>
                                        
                                    </div>
                                    {ShowAssessment &&(
                                    <button type="submit" className="btn btn-primary float-end" style={{ ...fontStyle, color: 'white', fontSize: '16px', textAlign: 'center' }}>
                                        <span>บันทึก</span>
                                    </button>
                                    )}
                                </div>
                            </div>
                       
                        
                            {ShowAssessment &&(  
                                <> 
                        <div className="container align-items-center">
                            {/* <table className="table-bordered" style={{ textAlign: 'center',fontFamily: 'Kanit, sans-serif'}}> */}
                            <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                                    <thead>
                                        <tr style={{ height: '50px',backgroundColor: '#FFFFFF', fontWeight: 'bold',fontSize:"18px"  }}>
                                            <th rowSpan="1" >กิจกรรมที่</th>
                                            <th rowSpan="1">การประเมิน</th>
                                            <th rowSpan="1" >สัดส่วนการประเมิน</th>
                                            <th rowSpan="1">แก้ไข</th>
                                            <th rowSpan="1">ลบ</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Assessment.map((row,index) => (
                                            <tr key={row.id} style={{ height: '50px' }}>
                                            <td >{index+1}</td>
                                            <td className="expand">
                                                {editingId === row.id ? (
                                                <input
                                                    type="text"
                                                    value={row.Assessment_name}
                                                    onChange={(e) => handleChange(row.id, 'Assessment_name', e.target.value)}
                                                />
                                                ) : (
                                                row.Assessment_name
                                                )}
                                            </td>
                                            <td >
                                                {editingId === row.id ? (
                                                <input
                                                    type="text"
                                                    value={row.Assessment_proportion}
                                                    onChange={(e) => handleChange(row.id, 'Assessment_proportion', e.target.value)}
                                                />
                                                ) : (
                                                row.Assessment_proportion
                                                )}
                                            </td>
                                            <td >
                                                <span className="actions"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    onClick={() => handleEditRow(row.id)}
                                                >
                                                    {editingId === row.id ? <BsFillFloppy2Fill /> : <BsFillPencilFill />}
                                                </span>
                                                </td>
                                            <td >
                                                <span className="actions"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => handleDeleteRow(row.id)}
                                                >
                                                <BsFillTrashFill
                                                    className="delete-btn"
                                                />
                                                </span>
                                            </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>
                                
                                <br />
                                <button onClick={() => handleAddRow()} className="btn btn-secondary float-end">
                                    Add
                                    </button>
                            </div>
                        </div>
                        </div>
                     
                       
                                <div className="form-group col-md-0 fone" style={{ padding: '10px'}}> 
                                <div className="d-flex align-items-center"style={{ flexWrap: 'wrap'}}>
                                    <span style={{margin:"10px",fontWeight: 'bold',fontSize:"20px"}}>การบันทึกคะแนน</span>
                                </div>
                                <div className="d-flex align-items-center"style={{ flexWrap: 'wrap'}}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                    <div className="d-flex align-items-center">    
                                    <span style={{margin:"10px"}}>ชั้นประถมศึกษาปีที่ :</span>
                                    </div>
                                        <div className="d-flex align-items-center">
                                        <div className="dropdown" style={{ maxWidth: '100%',marginRight:"10px" }}>
                                            <select
                                            value={selectedClassYear}
                                            onChange={handleSelectClassYearChange}
                                            className="custom-select"
                                           
                                            >
                                            <option value="เลือกชั้นปี">เลือกชั้นปี</option>
                                                {selectedSubject !== "เลือกวิชา" && (
                                                    <>
                                                       {classYear.map((classYear,index) => (
                                                        <option key={index} value={classYear}>
                                                        {classYear}
                                                        </option>
                                                    ))}
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                     </div>
                                    
                                    </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                                    <div className="d-flex align-items-center">    
                                    <span style={{margin:"10px"}}>ห้อง :</span>
                                    </div>
                                        <div className="d-flex align-items-center">
                                        <div className="dropdown" style={{ maxWidth: '100%',marginRight:"10px" }}>
                                            <select
                                            value={selectedRoom}
                                            onChange={handleSelectRoomChange}
                                            className="custom-select"
                                           
                                            >
                                            <option value="เลือกห้อง">เลือกห้อง</option>
                                                {selectedYear !== "เลือกชั้นปี" && (
                                                    <>
                                                       {classroom.map((classroom,index) => (
                                                        <option key={index} value={classroom}>
                                                        {classroom}
                                                        </option>
                                                    ))}
                                                    </>
                                                )}
                                            </select>
                                        </div>
                                     </div>
                                    
                                    </div>
                                    {ShowStudentScore &&(
                                    <button type="submit" className="btn btn-primary float-end" style={{ ...fontStyle, color: 'white', fontSize: '16px', textAlign: 'center'}}>
                                        <span>บันทึก</span>
                                    </button>
                                    )}
                                    </div>
                                
                            </div>
                            {ShowStudentScore &&(
                            <div className="container align-items-center">
                           
                            <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                                    <th rowSpan="1">เลขประจำตัวนักเรียน</th>
                                    <th rowSpan="1">ชื่อ-สกุล</th>
                                    {assessmentNames.map((assessment) => (
                                    <th colSpan="1" key={assessment}>
                                        {assessment}
                                    </th>
                                    ))}
                                    <th rowSpan="1">แก้ไข</th>
                                </tr>
                                </thead>

                                <tbody>
                                    {StudentScore.map((row) => (
                                        <tr key={row.id} style={{ height: "50px" }}>
                                        <td>{row.StudentID}</td>
                                        <td>{row.nameTitle} {row.Surname} {row.Lastname}</td>
                                        {Object.keys(row.scores).map((assessment) => (
                                            <td key={assessment}>
                                            {editingIdScore === row.id ? (
                                                <input
                                                type="text"
                                                value={row.scores[assessment]}
                                                onChange={(e) => handleChangeScore(row.id, assessment, e.target.value)}
                                                />
                                            ) : (
                                                row.scores[assessment]
                                            )}
                                            </td>
                                        ))}
                                        <td>
                                            <span
                                            className="actions"
                                            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                            onClick={() => handleEditRowScore(row.id)}
                                            >
                                            {editingIdScore === row.id ? <BsFillFloppy2Fill /> : <BsFillPencilFill />}
                                            </span>
                                        </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <br />
                                <br />
                            </div>
                        </div>
                        </div>
                       )}
                            </>
                            )}
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

export default Subject_Score_Record;
