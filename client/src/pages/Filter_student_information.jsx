import React, { useState, useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
import logoImage from '../images/IMG_5416.png';
import Header from '../components/Header';
import axios from 'axios';

function Filter_student_information({login_Email}) {
    const apiUrl = process.env.API_URL
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none',
        fontFamily: 'Kanit, sans-serif',
        fontSize: '16px',
      };
    
    async function getYearFromClassroom(Personnel_Email) {
        try {
            const response = await axios.get(apiUrl + '/get-distinct-years-of-personnel', {
                params: {
                    Personnel_Email: Personnel_Email
                }
            });
            console.log('response.data',response.data);
            return response.data;
            
        } catch (error) {
            console.error('Error fetching Year From Classroom:', error);
            throw error;
        }
    }

    async function getPersonnelStudentInfo(Student_ID) {
        try {
            const response = await axios.get(apiUrl + '/personnel-get-student-info', {
                params: {
                    Student_ID: Student_ID
                }
            });
            return response.data;
        } catch (error) {
            console.log('Error fetching StudentInfo From Classroom:', error);
            // throw error;
            return null;
        }
    }

    async function getClassroomInfoFromPersonnel(Personnel_Email) {
        try {
            const response = await axios.get(apiUrl + '/get-classroom-info-from-personnel', {
                params: {
                    Personnel_Email: Personnel_Email
                }
            });
            return response.data;
        } catch (error) {
            console.log('Error fetching ClassroomInfo:', error);
            // throw error;
            return null;
        }
    }

    async function getClassroomInfoFromYear(Personnel_Email, Year) {
        try {
            const response = await axios.get(apiUrl + '/personnel-get-classroom-info-from-year', {
                params: {
                    Personnel_Email: Personnel_Email,
                    Year: Year
                }
            });
            return response.data;
        } catch (error) {
            console.log('Error fetching ClassroomInfo:', error);
            // throw error;
            return null;
        }
    }

    async function getStudentInfoByID(studentIDs) {
        try {
            // const studentIDs = [
            //     { "Student_ID": "ID4" },
            //     { "Student_ID": "ID5" }
            // ];
    
            const response = await axios.post(apiUrl + '/get-student-info-by-id', studentIDs);
            // console.log('Response------------------:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching student information:', error);
            return null;
        }
    };

    // async function getStudentInfoByID(studentIDs) {
    //     try {
    //         const response = await axios.get(apiUrl + '/get-student-info-by-id', [], {
    //             params: { studentIDs }
    //         });
    //         return response.data;
    //     } catch (error) {
    //         console.error('Error fetching student information:', error);
    //         throw error; // ส่ง error ออกไปเพื่อให้ caller ได้จัดการต่อ
    //     }
    // };
    


    const handleSelectYearChange = (event) => {
      setSelectedYear(event.target.value);
    };
    const [YearsList, setYearsList] = useState([]);
    // const YearsList = ["2566", "2565", "2564", "2563", "2562", "2561", "2560"];
    const [selectedYear, setSelectedYear] = useState("");
    // const options = [
    //     { value: 'ระบุหมายเหตุ', label: 'ปีการศึกษา' },
    //     { value: 'เพื่อใช้ในการขอทุนการศึกษา', label: 'ปริญญาตรี' },
    //     { value: 'เพื่อใช้ในการสมัครเข้าศึกษาต่อ', label: 'ปริญญาโท' },
    //     { value: 'เพื่อใช้ในการสมัครเข้าศึกษาต่อ', label: 'ปริญญาเอก' },
    // ];

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                console.log('login_Email11111',login_Email);
              const Years = await getYearFromClassroom(login_Email);
              setYearsList(Years);
              console.log('Years',Years);
            } catch (error) {
              console.error('Error fetching semesters:', error);
            }
          }
        fetchData();
      }, []);

    //   useEffect(() => {
    //     console.log('login_Email',login_Email);

    //   }, [login_Email]);

    const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const handleStudentIDChange = (event) => {
        const inputValue = event.target.value;
        // const idValue = inputValue.replace(/[^0-9]/g, "");
        // if (inputValue !== idValue) {
        //     alert("กรุณากรอกเฉพาะตัวเลขเท่านั้น");
        // event.target.value = idValue;
        // }
    
        setStudentID(inputValue);
      };
    const [StudentID,setStudentID]=useState("");
    
    const CheckInputData = () => {
        
        const YearSelect = document.getElementById('YearSelect');
        const student_id = document.getElementById('student_id');
        // const YearSelect = document.querySelector('#YearSelect');
        // const student_id = document.querySelector('#student_id');
        // console.log("selectedYear",YearSelect.value);
        // console.log("StudentID",student_id.value);
        if (SearchData==="") {
            // console.log("selectedYear",selectedYear);
            // console.log("StudentID",StudentID);

            alert("กรุณาเลือกข้อมูลที่ต้องการค้นหา");
        
            return  false;
        }
        if (SearchData==="ปีการศึกษา") {
            if (YearSelect.value===""){
                alert("กรุณากรอกข้อมูลที่ต้องการค้นหา");
                YearSelect.focus();
                YearSelect.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => YearSelect.focus(), 100);
                return  false; 
            }
        }
        if (SearchData==="เลขประจำตัวนักเรียน") {
            if (student_id.value===""){
                alert("กรุณากรอกข้อมูลที่ต้องการค้นหา");
                student_id.focus();
                student_id.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => student_id.focus(), 100);
            return  false; 
            }
        }

        return true;
    }

    function checkStudentID(studentID, result2) {
        // ใช้ฟังก์ชัน Array.some() เพื่อตรวจสอบว่ามีค่า studentID ใน studentID หรือไม่
        if (result2 !== null){
            return result2.some(item => item.Student_ID.includes(studentID));
        }
        console.log('result2',result2);
      }


    const navigate = useNavigate();
    const handleButtonSearchData = async (event) => { // เปลี่ยนเป็น async เพื่อให้ใช้ await ได้
        if (CheckInputData()) {
            
            const result1 = await getClassroomInfoFromPersonnel(login_Email);
            if (StudentID){
                try {
                    if(checkStudentID(StudentID, result1)){
                        const PersonnelStudentInfo = await getPersonnelStudentInfo(StudentID);
                        navigate("/Student_List_Information", { state: { selectedYear: selectedYear, result: PersonnelStudentInfo } });
                    }
                    else{
                        alert("รหัสนักเรียน " + StudentID + " ไม่ใช่นักเรียนของท่าน");
                            return;
                    }
                } catch (error) {
                    console.log('Error fetching StudentInfo:', error);
                }
            }
      
            if (selectedYear){
                const result2 = await getClassroomInfoFromYear(login_Email, selectedYear);
                if (result2 === null) {
                    alert("ท่านไม่ใช่ครูประจำชั้นในปีการศึกษา:" + selectedYear);
                    return;
                }
                else{
                    const result3 = await getStudentInfoByID(result2);
                    if (result3 === null) {
                        alert("ยังไม่มีข้อมูลนักเรียนของท่านในฐานข้อมูล");
                        return;
                    }
                    else{
                        navigate("/Student_List_Information", { state: { selectedYear: selectedYear, result: result3 } });
                    }
                    
                }
            }
        }
    
        return true;
      };

    const handleCheckChange = (event) => {
        setSearchData(event.target.value); 
        // console.log(nameTitle,"kkkk")
        // sendnameTitleToEnroll(nameTitle)s
    };
    
    
    const [SearchData,setSearchData] =useState("");
    
    const [ShowYearCheck,setShowYearCheck] = useState(false);
    useEffect(() => {
       
        if (SearchData==="ปีการศึกษา") {
            setShowYearCheck(true); 
            setShowIDCheck(false); 
            setStudentID("");
        }
        if (SearchData==="เลขประจำตัวนักเรียน") {
            setShowIDCheck(true); 
            setShowYearCheck(false); 
            setSelectedYear("");
        }
        }, [SearchData]);

    const [ShowIDCheck,setShowIDCheck] = useState(false);
   
    
    
    return (
        <>

      <Header header="ระบบจัดการสารสนเทศ" subhead="บริการสำหรับบุคลากรภายในโรงเรียน" />
      {/* <Sidebar /> */}
      <div className="container-fluid"style={{height: "100vh"}}>
        <div className="row flex-nowrap">
            {/* <Sidebar /> */}
            
    <div className="col-md">
            <div className="d-flex align-items-center flex-column">
                <h2 className="col-sm d-flex align-items-center" style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px',paddingTop: '40px' }}>กรอกข้อมูลที่ต้องการค้นหา</h2>
            </div>
    <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
    <div className="container">
            <div className="card mx-auto" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' ,maxWidth: '100%',Height: '100vh'}} >
    {/* <div className="card mx-auto my-auto" style={{border: '1px solid #D3D3D3' }}> */}
    
        <div className="card-body">
        <div style={{  flexWrap: 'wrap',gap:"10px",padding:"10px"}}>
            <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:"center"}}>
                {/* <div className="d-flex align-items-center">
                    <h2 className="card-heading" style={{ fontSize: '20px', marginTop: '2px', fontWeight: 'bold' }}>Filter</h2>
                </div> */}
                {/* <div className="d-flex align-items-center">
                    <h2 className="card-heading" style={{ fontSize: '22px', padding: "10px" }}>กรอกข้อมูลที่ต้องการค้นหา</h2>
                </div> */}
            </div>
                
               
                <div className="d-flex align-items-center">
                    <h2 className="card-heading" style={{ fontSize: '16px', color: '#808080'}}>ค้นหารายชื่อจากปีการศึกษา</h2>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                <div className="align-items-center" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Kanit, sans-serif', fontSize: '16px'}}>  
                    <input className="form-check-input" type="radio" name="YearCheck" id="YearCheck" value="ปีการศึกษา" 
                    checked={SearchData === 'ปีการศึกษา'} 
                    onChange={handleCheckChange}
                    style={{border: "1px solid #a7a7a7"}}
                    />
                    </div>
                    <div className="d-flex align-items-center">
                    <label className="card-heading" style={{ fontSize: '18px', fontWeight: 'bold', padding: '10px' }}>
                        ปีการศึกษา
                    </label>
                    </div>
                    
                    {ShowYearCheck && (
                   <div className="align-items-center" >
                   <div className="dropdown" style={{ maxWidth: '100%' ,marginTop:"0.5rem" }}>
                     <select value={selectedYear} onChange={handleSelectYearChange} className="custom-select" id="YearSelect">
                       <option value="">เลือกปีการศึกษา</option>
                       {YearsList.map((year) => (
                         <option key={year} value={year}>
                           ปีการศึกษา {year}
                         </option>
                       ))}
                     </select>
                   </div>
                 </div>
                    )}
                </div>
               <br />
                <div className="d-flex align-items-center">
                    <h2 className="card-heading" style={{ fontSize: '16px', color: '#808080'}}>ค้นหาข้อมูลรายบุคคล</h2>
                </div>

                
                <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: '18px'}}>
                <div className="align-items-center" style={{ display: 'flex', alignItems: 'center', fontFamily: 'Kanit, sans-serif', fontSize: '16px'}}>           
                    {/* <div className=" d-flex align-items-center"> */}
                    {/* col-sm-5 */}
                    <input className="form-check-input" type="radio" name="IDCheck" id="IDCheck" value="เลขประจำตัวนักเรียน" 
                    checked={SearchData === 'เลขประจำตัวนักเรียน'} 
                    onChange={handleCheckChange} 
                    style={{border: "1px solid #a7a7a7"}}
                    
                    />
                    </div>
                    
                    <div className="d-flex align-items-center">
                    <label className="card-heading" style={{ fontSize: '18px', fontWeight: 'bold', padding: '10px' }}>เลขประจำตัวนักเรียน</label>
                    </div>
                    {ShowIDCheck && (

                        <div className=" align-items-center">   
                        <input type="text" className="form-control" 
                        id="student_id" 
                        name="student_id" 
                        placeholder="กรอกเลขประจำตัวนักเรียน"
                        style={{maxWidth: '100%',border: "1px solid #a7a7a7"}} 
                        value={StudentID}
                        onChange={handleStudentIDChange}
                        
                        />
                        </div>
                    )}
                    
                    </div>
               
                {/* <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                    <div className="d-flex align-items-center">
                        <h2 className="card-heading" style={{ fontSize: '18px',padding:"10px",fontWeight: 'bold'}}>ชื่อ</h2>
                    </div>
                    <div className="align-items-center" style={{maxWidth:"100%"}}>
                        <input type="text" className="form-control" id="surname" name="surname" placeholder="กรอกชื่อ"/>
                    </div>
                    
                    <div className="d-flex align-items-center">   
                        <h2 className="card-heading" style={{ fontSize: '18px',padding:"10px",fontWeight: 'bold'}}>นามสกุล</h2>
                    </div>
                    <div className="align-items-center" style={{maxWidth:"100%"}}>    
                        <input type="text" className="form-control" id="lastname" name="lastname" placeholder="กรอกนามสกุล" />
                    </div>
                    
                </div> */}
                <br />
               
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    {/* <Link to="/Student_List_Information"> */}
                    <button 
                        type="submit" 
                        className="btn btn-primary custom-font" 
                        style={{
                        ...fontStyle, 
                        color: 'white', 
                        fontSize: '16px', 
                        textAlign: 'center', 
                        
                        // marginRight: '15px',
                       
                        width:"100%"

                        }}
                        onClick={handleButtonSearchData}
                    >
                        <span>ค้นหาข้อมูล</span>
                    </button>
                    {/* </Link> */}

                   
                </div>
                

            </div>
        </div> 
        </div>
        </div>
    </div>
            
            </div>
        </div>  
    </div>
    </>
  );
}

export default Filter_student_information;
