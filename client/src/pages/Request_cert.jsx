import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Button, Modal,Spinner } from 'react-bootstrap';
import Modal_loading from '../components/Modal_loading';
import Modal_success from '../components/Modal_success';
import axios from 'axios';

function Request_cert({login_Email}) {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
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
      // ]); 

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

      async function getStudentIdByParentEmail(email) {
        try {
            const response = await axios.get('http://localhost:8080/get-student-id-grade-by-parent-email', {
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

    const [StudentData, setStudentData] = useState([]);
    const [selectedStudent_ID, setSelectedStudent_ID] = useState("");
    const [Student_picture_file,setStudent_picture_file] = useState("");

    const [selectedOptionRequestStudent, setSelectedOptionRequestStudent] = useState('');

    const handleSelectOptionRequestStudentChange = (event) => {
      setSelectedOptionRequestStudent(event.target.value);
    };

    const [selectedOptionRequestScore, setSelectedOptionRequestScore] = useState('');

    const handleSelectOptionRequestScoreChange = (event) => {
      setSelectedOptionRequestScore(event.target.value);
    };

    const [selectedOptionRequestGrade, setSelectedOptionRequestGrade] = useState('');

    const handleSelectOptionRequestGradeChange = (event) => {
      setSelectedOptionRequestGrade(event.target.value);
    };

    const [selectedOptionRequestYear, setSelectedOptionRequestYear] = useState('');

    const handleSelectOptionRequestYearChange = (event) => {
      setSelectedOptionRequestYear(event.target.value);
    };

    const [showConfirmModal, setshowConfirmModal] = useState(false);
    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const handleCloseModal = () => {
      setshowConfirmModal(false);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [ShowOptionInput,setShowOptionInput] =useState(false);
    const [OptionRequestStudent,setOptionRequestStudent] = useState("");
    const handleOptionRequestStudentChange = (event) => {
      setOptionRequestStudent(event.target.value);
    };
    useEffect(() => {
      
      if (selectedOptionRequestStudent==="อื่นๆ"){
        setShowOptionInput(true);
      }
      else {
        setShowOptionInput(false);
        setOptionRequestStudent("");
      }
      
    }, [selectedOptionRequestStudent]);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [ShowOptionInputScore,setShowOptionInputScore] = useState(false);

    const [OptionRequestScore,setOptionRequestScore] = useState("");
    const handleOptionRequestScoreChange = (event) => {
      setOptionRequestScore(event.target.value);
    };
    useEffect(() => {
      
      if (selectedOptionRequestScore==="อื่นๆ"){
        setShowOptionInputScore(true);
      }
      else {
        setShowOptionInputScore(false);
        setOptionRequestScore("");
      }
      
    }, [selectedOptionRequestScore]);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [ShowOptionInputGrade,setShowOptionInputGrade] =useState(false);

    const [OptionRequestGrade,setOptionRequestGrade] = useState("");
    const handleOptionRequestGradeChange = (event) => {
      setOptionRequestGrade(event.target.value);
    };
    useEffect(() => {
      
      if (selectedOptionRequestGrade==="อื่นๆ"){
        setShowOptionInputGrade(true);
      }
      else {
        setShowOptionInputGrade(false);
        setOptionRequestGrade("");
      }
      
    }, [selectedOptionRequestGrade]);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const [ShowOptionInputYear,setShowOptionInputYear] =useState(false);

    const [OptionRequestYear,setOptionRequestYear] = useState("");
    const handleOptionRequestYearChange = (event) => {
      setOptionRequestYear(event.target.value);
    };
    useEffect(() => {
      
      if (selectedOptionRequestYear==="อื่นๆ"){
        setShowOptionInputYear(true);
      }
      else {
        setShowOptionInputYear(false);
        setOptionRequestYear("");
      }
      
    }, [selectedOptionRequestYear]);

    useEffect(() => {
      const fetchData = async () => {
          try {
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
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchData();
  }, []);

/////////////////////////////////////////////////////Button/////////////////////////////////////////////////////////////////////
      const handleSubmitform = async () => {
        // setShowLoadingModal(true);
        if(checkInputForm()) {
          // setshowConfirmModal(false)
          setShowLoadingModal(true);
          if (selectedStudent !== ''){
            // แยกค่า StudentID โดยใช้ split เพื่อแยกสตริงด้วยช่องว่างและเลือกค่าตัวแรก
            const selectedStudent_ID = selectedStudent.split(' ')[0];
            setSelectedStudent_ID(selectedStudent_ID);
            console.log("selectedStudent_ID:", selectedStudent_ID); // พิมพ์ค่า StudentID ที่ได้
            // console.log("Student_picture_file:", Student_picture_file);

            // console.log("Student_ID",selectedStudent_ID);
            // console.log("Request_Date",formatDate(new Date()));
            // console.log("Requested_Copies",AmountRequestStudent);
            // console.log("Request_detail",selectedOption);

            // console.log("OptionRequestStudent",OptionRequestStudent);
            // console.log("OptionRequestScore",OptionRequestScore);
            // console.log("OptionRequestGrade",OptionRequestGrade);
            // console.log("OptionRequestYear",OptionRequestYear);

            // console.log("ShowOptionInput",ShowOptionInput);
            // console.log("ShowOptionInputScore",ShowOptionInputScore);
            // console.log("ShowOptionInputGrade",ShowOptionInputGrade);
            // console.log("ShowOptionInputYear",ShowOptionInputYear);

            // console.log('selectedOptionRequestStudent', selectedOptionRequestStudent);
            // console.log('selectedOptionRequestScore', selectedOptionRequestScore);
            // console.log('selectedOptionRequestGrade', selectedOptionRequestGrade);
            // console.log('selectedOptionRequestYear', selectedOptionRequestYear);

            // if(CheckRequestStudent){
            

              const formData = new FormData();
              formData.append('CheckRequestStudent', CheckRequestStudent.checked);
              formData.append('CheckRequestScore', CheckRequestScore.checked);
              formData.append('CheckRequestGrade', CheckRequestGrade.checked);
              formData.append('CheckRequestYear', CheckRequestYear.checked);
              // formData.append('CheckRequestTranscript', CheckRequestTranscript.checked);

              formData.append('Student_ID', selectedStudent_ID);
              formData.append('Parent_Email', login_Email);
              formData.append('Request_Date', formatDate(new Date()));
              
              // เพิ่มข้อมูลของนักเรียนเข้าไปใน formData
              // formData.append('Request_type', 'ปพ.7');
              formData.append('AmountRequestStudent', AmountRequestStudent);
              formData.append('AmountRequestScore', AmountRequestScore);
              formData.append('AmountRequestGrade', AmountRequestGrade);
              formData.append('AmountRequestYear', AmountRequestYear);

              formData.append('ShowOptionInput', ShowOptionInput);
              formData.append('ShowOptionInputScore', ShowOptionInputScore);
              formData.append('ShowOptionInputGrade', ShowOptionInputGrade);
              formData.append('ShowOptionInputYear', ShowOptionInputYear);

              formData.append('OptionRequestStudent', OptionRequestStudent);
              formData.append('OptionRequestScore', OptionRequestScore);
              formData.append('OptionRequestGrade', OptionRequestGrade);
              formData.append('OptionRequestYear', OptionRequestYear);

              formData.append('selectedOptionRequestStudent', selectedOptionRequestStudent);
              formData.append('selectedOptionRequestScore', selectedOptionRequestScore);
              formData.append('selectedOptionRequestGrade', selectedOptionRequestGrade);
              formData.append('selectedOptionRequestYear', selectedOptionRequestYear);

              // formData.append('AmountRequestTranscript', AmountRequestTranscript);

              // formData.append('Request_detail', selectedOption);
              formData.append('file', Student_picture_file);
              formData.append('Request_status', 'รอดำเนินการ');

              await axios.post('http://localhost:8080/upload-student-img-request', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });



            // }

            // if(CheckRequestTranscript){
            //   const formData = new FormData();
            //   formData.append('Student_ID', selectedStudent_ID);
            //   formData.append('Parent_Email', login_Email);
            //   formData.append('Request_Date', formatDate(new Date()));
              
            //   // เพิ่มข้อมูลของนักเรียนเข้าไปใน formData
            //   formData.append('Request_type', 'ปพ.1');
            //   formData.append('Requested_Copies', AmountRequestTranscript);
            //   formData.append('Request_detail', selectedOption);
            //   formData.append('file', Student_picture_file);
            //   formData.append('Request_status', 'รอดำเนินการ');

            //   await axios.post('http://localhost:8080/upload-student-img-request', formData, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data'
            //     }
            //   });
            // }
            // alert("Yeah");
    

            
          }
          setShowLoadingModal(false);
          setShowSuccessModal(true);
        }
        

        // return true;
      };

      ///////////////////////////////////////////////////////////////////////////////////////////////
      const [selectedStudent, setSelectedStudent] = useState("");

      const handleStudentChange = (event) => {
        const selectedStudentValue = event.target.value;
        setSelectedStudent(selectedStudentValue);
      };
      const [CheckRequestStudent,setCheckRequestStudent] = useState({ checked: false });
      const [AmountRequestStudent,setAmountRequestStudent] = useState('');

      // const [CheckRequestTranscript,setCheckRequestTranscript] = useState({ checked: false });
      // const [AmountRequestTranscript,setAmountRequestTranscript] = useState('');

      const [CheckRequestScore,setCheckRequestScore] = useState({ checked: false });
      const [AmountRequestScore,setAmountRequestScore] = useState('');

      const [CheckRequestGrade,setCheckRequestGrade] = useState({ checked: false });
      const [AmountRequestGrade,setAmountRequestGrade] = useState('');

      const [CheckRequestYear,setCheckRequestYear] = useState({ checked: false });
      const [AmountRequestYear,setAmountRequestYear] = useState('');
      
      const handleCheckRequestStudentChange= (event) => {
        setCheckRequestStudent({ checked: event.target.checked });
      };
      const handleAmountRequestStudentChange = (event) => {
        const integerValue = event.target.value;
        const AmountRequestStudent = integerValue.replace(/[^0-9]/g, "");
        if (AmountRequestStudent !== integerValue) {
            alert("กรุณากรอกเฉพาะตัวเลขเท่านั้น")
          event.target.value = AmountRequestStudent;
        }
        setAmountRequestStudent(AmountRequestStudent);
      };
      const handleCheckRequestScoreChange= (event) => {
        setCheckRequestScore({ checked: event.target.checked });
      };
      const handleAmountCheckRequestScoreChange= (event) => {
        const inputValue = event.target.value;
        const AmountRequestScore = inputValue.replace(/[^0-9]/g, "");
        if (inputValue !== AmountRequestScore) {
            alert("กรุณากรอกเฉพาะตัวเลขเท่านั้น")
          event.target.value = AmountRequestScore;
        }
        setAmountRequestScore(AmountRequestScore);
      };
     

      const handleCheckRequestGradeChange= (event) => {
        setCheckRequestGrade({ checked: event.target.checked });
      };
      const handleAmountCheckRequestGradeChange= (event) => {
        const inputValue = event.target.value;
        const AmountRequestGrade = inputValue.replace(/[^0-9]/g, "");
        if (inputValue !== AmountRequestGrade) {
            alert("กรุณากรอกเฉพาะตัวเลขเท่านั้น")
          event.target.value = AmountRequestGrade;
        }
        setAmountRequestGrade(AmountRequestGrade);
      };

      const handleCheckRequestYearChange= (event) => {
        setCheckRequestYear({ checked: event.target.checked });
      };
      const handleAmountRequestYearChange= (event) => {
        const inputValue = event.target.value;
        const AmountRequestYear = inputValue.replace(/[^0-9]/g, "");
        if (inputValue !== AmountRequestYear) {
            alert("กรุณากรอกเฉพาะตัวเลขเท่านั้น")
          event.target.value = AmountRequestYear;
        }
        setAmountRequestYear(AmountRequestYear);
      };

 
      
    // const [Student_picture_file,setStudent_picture_file] = useState("");
    const allowedFileTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
    const handleFileChange = (event) => {
        event.preventDefault();
        const Student_picture_file = event.target;
    
        // if (Student_picture_file.files.length === 0){
        //     setStudent_picture_file('');
            // sendImageDataToEnroll('');
        //   }
        
        if (Student_picture_file.files && Student_picture_file.files.length > 0) {
            const file = Student_picture_file.files[0];
            const fileType = '.' + file.name.split('.').pop().toLowerCase();
            if (allowedFileTypes.includes(fileType)) {
                
                let fileName = '';
                if (Student_picture_file.files.length === 1) {
                    setStudent_picture_file(event.target.files[0]);
                    
                    console.log("Student_picture_file",event.target.files[0]);
                    fileName = file.name;
                    // console.log("file.name", file.name);
                } else {
                    fileName = Student_picture_file.files.length + ' files selected';
                }
                // แสดงชื่อไฟล์ที่ถูกเลือกใน input label
                const fileInputLabel = document.getElementById('fileInputLabel');
                if (fileInputLabel) {
                    fileInputLabel.textContent = fileName;
                }
                // sendImageDataToEnroll(file);
            } else {
                alert('กรุณาเลือกไฟล์ที่มีนามสกุล .pdf, .jpg, .jpeg หรือ .png เท่านั้น');
                // เคลียร์ค่า input file และ label
                event.target.value = '';
                // setStudent_picture_file('');
                // Student_picture_file.value = '';
                const fileInputLabel = document.getElementById('fileInputLabel');
                if (fileInputLabel) {
                    fileInputLabel.textContent = 'Select Files';
                }
            }
        }
    };

      const checkInputForm = () => {
        const selectedStudent = document.getElementById('selectedStudent');

        if(selectedStudent.value==="") {
            alert('กรุณาเลือกข้อมูลนักเรียน');
            selectedStudent.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => selectedStudent.focus(), 100);
            return false;
        }

        if (!CheckRequestStudent.checked && !CheckRequestScore.checked && !CheckRequestGrade.checked && !CheckRequestYear.checked) {
            alert('กรุณาเลือกประเภทใบรับรอง');
            
            return false;
        }
        if (CheckRequestStudent.checked) {
            const AmountRequestStudent = document.getElementById('AmountRequestStudent');
            if(AmountRequestStudent.value===""){
                alert('กรุณาระบุจำนวนใบรับรองการเป็นนักเรียน');
                AmountRequestStudent.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => AmountRequestStudent.focus(), 100);
            return false;
            }
            const selectedOptionRequestStudent = document.getElementById('selectedOptionRequestStudent');

            if(selectedOptionRequestStudent.value==="") {
                alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
                selectedOptionRequestStudent.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => selectedOptionRequestStudent.focus(), 100);
                return false;
            }
            if(selectedOptionRequestStudent.value==="อื่นๆ") {
              const OptionRequestStudent = document.getElementById('OptionRequestStudent');
              if(OptionRequestStudent.value===""){
                alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
                OptionRequestStudent.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => OptionRequestStudent.focus(), 100);
                return false;
              }

          }
        }
        if (CheckRequestScore.checked) {
          const AmountRequestScore = document.getElementById('AmountRequestScore');
          if(AmountRequestScore.value===""){
              alert('กรุณาระบุจำนวนใบรับรองผลการเรียนแบบคะแนนรายวิชา');
              AmountRequestScore.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => AmountRequestScore.focus(), 100);
          return false;
          }
          const selectedOptionRequestScore = document.getElementById('selectedOptionRequestScore');

          if(selectedOptionRequestScore.value==="") {
              alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
              selectedOptionRequestScore.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => selectedOptionRequestScore.focus(), 100);
              return false;
          }
          if(selectedOptionRequestScore.value==="อื่นๆ") {
            const OptionRequestScore = document.getElementById('OptionRequestScore');
            if(OptionRequestScore.value===""){
              alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
              OptionRequestScore.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => OptionRequestScore.focus(), 100);
              return false;
            }

        }
      }
      if (CheckRequestGrade.checked) {
        const AmountRequestGrade = document.getElementById('AmountRequestGrade');
        if(AmountRequestGrade.value===""){
            alert('กรุณาระบุจำนวนใบรับรองผลการเรียนเกรดเฉลี่ยประจำปีการศึกษา');
            AmountRequestGrade.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => AmountRequestGrade.focus(), 100);
        return false;
        }
        const selectedOptionRequestGrade = document.getElementById('selectedOptionRequestGrade');

        if(selectedOptionRequestGrade.value==="") {
            alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
            selectedOptionRequestGrade.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => selectedOptionRequestGrade.focus(), 100);
            return false;
        }
        if(selectedOptionRequestGrade.value==="อื่นๆ") {
          const OptionRequestGrade = document.getElementById('OptionRequestGrade');
          if(OptionRequestGrade.value===""){
            alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
            OptionRequestGrade.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => OptionRequestGrade.focus(), 100);
            return false;
          }

      }
    }
        if (CheckRequestYear.checked) {
          const AmountRequestYear = document.getElementById('AmountRequestYear');
          if(AmountRequestYear.value===""){
              alert('กรุณาระบุจำนวนใบรับรองผลการเรียน ชั้นป.4-5');
              AmountRequestYear.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => AmountRequestYear.focus(), 100);
          return false;
          }
          const selectedOptionRequestYear = document.getElementById('selectedOptionRequestYear');

          if(selectedOptionRequestYear.value==="") {
              alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
              selectedOptionRequestYear.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => selectedOptionRequestYear.focus(), 100);
              return false;
          }
          if(selectedOptionRequestYear.value==="อื่นๆ") {
            const OptionRequestYear = document.getElementById('OptionRequestYear');
            if(OptionRequestYear.value===""){
              alert('กรุณาระบุหมายเหตุในการขอใบรับรอง');
              OptionRequestYear.scrollIntoView({ behavior: 'smooth' });
              setTimeout(() => OptionRequestYear.focus(), 100);
              return false;
            }

        }
      }
        
        const customFile = document.getElementById('customFile');

        if(customFile.value==="") {
            alert('กรุณาอัปโหลดรูปภาพนักเรียน');
            customFile.focus();
            return false;
        }
        return true;
      };

      
      const [ShowInputRequestStudent,setShowInputRequestStudent] =useState(false);
      const [ShowInputRequestScore,setShowInputRequestScore] =useState(false);
      const [ShowInputRequestGrade,setShowInputRequestGrade] =useState(false);
      const [ShowInputRequestYear,setShowInputRequestYear] =useState(false);


      useEffect(() => {
        
        if (CheckRequestStudent.checked){
            setShowInputRequestStudent(true);
        }
        else {
            setShowInputRequestStudent(false);
            setAmountRequestStudent('');
            setSelectedOptionRequestStudent("");
        }
        
      }, [CheckRequestStudent]);
     
      useEffect(() => {
        
        if (CheckRequestScore.checked){
          setShowInputRequestScore(true);
        }
        else {
          setShowInputRequestScore(false);
          setAmountRequestScore('');
          setSelectedOptionRequestScore("");
        }
        
      }, [CheckRequestScore]);

      useEffect(() => {
        
        if (CheckRequestGrade.checked){
          setShowInputRequestGrade(true);
        }
        else {
          setShowInputRequestGrade(false);
          setAmountRequestGrade('');
          setSelectedOptionRequestGrade("");
        }
        
      }, [CheckRequestGrade]);

      useEffect(() => {
        
        if (CheckRequestYear.checked){
          setShowInputRequestYear(true);
        }
        else {
          setShowInputRequestYear(false);
          setAmountRequestYear('');
          setSelectedOptionRequestYear("");
        }
        
      }, [CheckRequestYear]);


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
                  
                
                  <p className="mt-3"style={{ fontSize: '22px' }}>ต้องการที่จะยื่นคำร้องขอใบรับรองใช่หรือไม่</p>
             
                  <Button
                    variant="sm"
                    style={{ fontSize: "20px" }}
                    className="btn-success btn-same-size"
                    onClick={() => {
                      handleSubmitform();
                      handleCloseModal();
                    }}
                  >
                    OK
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
          <Modal_success 
          show={showSuccessModal} 
          setShow={setShowSuccessModal} 
          link="/Parent_menu" 
          text="ระบบได้รับคำร้องของท่านแล้ว"
          />
        )}

      <Header header="ระบบยื่นคำร้องขอใบรับรอง" subhead=""/>
      <br />
      <div className="d-flex flex-column align-items-center"style={{ height: '100vh',fontFamily: 'Kanit, sans-serif'}}>
      <div className="container d-flex align-items-center justify-content-center"style={{ flexWrap: 'wrap' }}>
        <div class="card" style={{ maxWidth: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>  
            <div class="card-body">
                
        {/* <label class="card-heading px-3" style={{fontSize: '20px',fontWeight: 'bolder'}}>ยื่นคำร้องขอใบรับรอง</label> */}
                
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px',marginLeft:"15px"}}>
            <div className="d-flex align-items-center">
              <span style={{marginRight:"10px",fontWeight: 'bolder'}}>เลือกข้อมูลนักเรียน :</span>
            </div>
            <div className="dropdown" style={{ maxWidth: '100%',fontSize: '18px' }}>
            <select value={selectedStudent} onChange={handleStudentChange} className="custom-select" id ="selectedStudent">
                <option value="">เลือกข้อมูล</option>
                {StudentData.map((student, index) => (
                  <option key={index}>
                    {student.StudentID} : {student.nameTitle} {student.Firstname} {student.Lastname}
                  </option>
                ))}
              </select>
            </div>
        </div>
        <br />
        <label class="card-heading px-3" style={{fontSize: '20px',fontWeight: 'bolder',marginBottom:"10px"}}>เลือกประเภทใบรับรอง</label>
             {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontSize: '16px',marginLeft: '15px' }}> */}
                <div class="form-group col-md-15 fone">
                    <div class="form-check"style={{ marginLeft:"15px",marginBottom:"5px"}}>
                        <input class="form-check-input" type="checkbox" 
                        value="ใบรับรองการเป็นนักเรียน" 
                        onChange={handleCheckRequestStudentChange} 
                        id="CheckRequestStudent"
                        style={{border: "1px solid #a7a7a7"}}/>

                        <label class="form-check-label custom-body" style={{ fontSize: '20px'}} for="flexCheckDefault">
                            กรณีขอใบรับรองการเป็นนักเรียน
                        </label>
                    </div>
                    {ShowInputRequestStudent && (
                      <>
                    
                    <div className="mb-3 d-flex px-3">
                        <input
                            type="text"
                            id = "AmountRequestStudent"
                            className="form-control ml-3 px-3"
                            placeholder="จำนวน"
                            style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"20px"}}
                            value={AmountRequestStudent}
                            onChange={handleAmountRequestStudentChange}
                            required
                        />
                        <h5 className="ms-2 mt-2 custom-body" style={{ fontSize: '18px'}}>ฉบับ</h5>
                    </div>

                    <h1 class="card-heading px-3" style={{fontSize: '18px',fontWeight: 'bold',marginLeft:"20px"}}>ต้องการขอเอกสารครั้งนี้เพื่อ</h1>
              
                            <div class="dropdown px-3"style={{maxWidth:"55%",fontSize: '18px',marginLeft:"20px"}} >
                                <select value={selectedOptionRequestStudent} onChange={handleSelectOptionRequestStudentChange} class="custom-select" id="selectedOptionRequestStudent">
                                    <option value="">ระบุหมายเหตุ</option>
                                    <option value="เพื่อใช้ในการขอทุนการศึกษา">เพื่อใช้ในการขอทุนการศึกษา</option>
                                    <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">เพื่อใช้ในการสมัครเข้าศึกษาต่อ</option>
                                    <option value="อื่นๆ">อื่นๆ</option>

                                </select>
                            </div>
                      
                    {ShowOptionInput && (
                      <textarea
                      type="text"
                      id = "OptionRequestStudent"
                      className="form-control ml-3 px-3"
                      placeholder="ระบุหมายเหตุในการขอใบรับรอง"
                      style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"35px",marginTop:"10px"}}
                      value={OptionRequestStudent}
                      onChange={handleOptionRequestStudentChange}
                      required
                  />
                    )}
                  
                    </>
                    )} 
                    
                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      */}
                    <div class="form-check"style={{ marginLeft:"15px",marginBottom:"5px",marginTop:"10px"}}>
                        <input class="form-check-input"
                        type="checkbox" 
                        value="ใบรับรองผลการเรียนแบบคะแนนรายวิชา" 
                        onChange={handleCheckRequestScoreChange} 
                        id="flexCheckChecked"
                        style={{border: "1px solid #a7a7a7"}}/>

                        <label class="form-check-label custom-body" style={{ fontSize: '20px'}} for="flexCheckChecked">
                            กรณีขอใบรับรองผลการเรียนแบบคะแนนรายวิชา
                        </label>
                    </div>
                    {ShowInputRequestScore && (
                      <>
                    <div className="mb-3 d-flex px-3" >
                        <input
                            type="text"
                            id="AmountRequestScore"
                            className="form-control ml-3 px-3"
                            placeholder="จำนวน"
                            style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"20px"}}
                            value={AmountRequestScore}
                            onChange={handleAmountCheckRequestScoreChange}
                            required
                        />
                        <h5 className="ms-2 mt-2 custom-body"style={{ fontSize: '18px'}}>ฉบับ</h5>
                    </div>
                    <h1 class="card-heading px-3" style={{fontSize: '18px',fontWeight: 'bold',marginLeft:"20px"}}>ต้องการขอเอกสารครั้งนี้เพื่อ</h1>
              
                        <div class="dropdown px-3"style={{maxWidth:"55%",fontSize: '18px',marginLeft:"20px"}} >
                            <select value={selectedOptionRequestScore} onChange={handleSelectOptionRequestScoreChange} class="custom-select" id="selectedOptionRequestScore">
                                <option value="">ระบุหมายเหตุ</option>
                                <option value="เพื่อใช้ในการขอทุนการศึกษา">เพื่อใช้ในการขอทุนการศึกษา</option>
                                <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">เพื่อใช้ในการสมัครเข้าศึกษาต่อ</option>
                                <option value="อื่นๆ">อื่นๆ</option>

                            </select>
                        </div>
                        
                      {ShowOptionInputScore && (
                        <textarea
                        type="text"
                        id = "OptionRequestScore"
                        className="form-control ml-3 px-3"
                        placeholder="ระบุหมายเหตุในการขอใบรับรอง"
                        style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"35px",marginTop:"10px"}}
                        value={OptionRequestScore}
                        onChange={handleOptionRequestScoreChange}
                        required
                    />
                      )}
    
                    </>
                   
                    )}
                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      */}

                     <div class="form-check"style={{ marginLeft:"15px",marginBottom:"5px",marginTop:"10px"}}>
                        <input class="form-check-input" type="checkbox" 
                        value="ใบรับรองผลการเรียนเกรดเฉลี่ยประจำปีการศึกษา" 
                        onChange={handleCheckRequestGradeChange} 
                        id="CheckRequestGrade"
                        style={{border: "1px solid #a7a7a7"}}/>

                        <label class="form-check-label custom-body" style={{ fontSize: '20px'}} for="flexCheckDefault">
                            กรณีขอใบรับรองผลการเรียนเกรดเฉลี่ยประจำปีการศึกษา
                        </label>
                    </div>
                    {ShowInputRequestGrade && (
                      <>
                    <div className="mb-3 d-flex px-3" >
                        <input
                            type="text"
                            id="AmountRequestGrade"
                            className="form-control ml-3 px-3"
                            placeholder="จำนวน"
                            style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"20px"}}
                            value={AmountRequestGrade}
                            onChange={handleAmountCheckRequestGradeChange}
                            required
                        />
                        <h5 className="ms-2 mt-2 custom-body"style={{ fontSize: '18px'}}>ฉบับ</h5>
                    </div>
                    <h1 class="card-heading px-3" style={{fontSize: '18px',fontWeight: 'bold',marginLeft:"20px"}}>ต้องการขอเอกสารครั้งนี้เพื่อ</h1>
              
                        <div class="dropdown px-3"style={{maxWidth:"55%",fontSize: '18px',marginLeft:"20px"}} >
                            <select value={selectedOptionRequestGrade} onChange={handleSelectOptionRequestGradeChange} class="custom-select" id="selectedOptionRequestGrade">
                                <option value="">ระบุหมายเหตุ</option>
                                <option value="เพื่อใช้ในการขอทุนการศึกษา">เพื่อใช้ในการขอทุนการศึกษา</option>
                                <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">เพื่อใช้ในการสมัครเข้าศึกษาต่อ</option>
                                <option value="อื่นๆ">อื่นๆ</option>

                            </select>
                        </div>
                        
                      {ShowOptionInputGrade && (
                        <textarea
                        type="text"
                        id = "OptionRequestGrade"
                        className="form-control ml-3 px-3"
                        placeholder="ระบุหมายเหตุในการขอใบรับรอง"
                        style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"35px",marginTop:"10px"}}
                        value={OptionRequestGrade}
                        onChange={handleOptionRequestGradeChange}
                        required
                    />
                      )}
    
                    </>
                   
                    )}

                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      */}

                    <div class="form-check"style={{ marginLeft:"15px",marginBottom:"5px",marginTop:"10px"}}>
                        <input class="form-check-input" type="checkbox" 
                        value="ใบรับรองผลการเรียน ชั้นป.4-5" 
                        onChange={handleCheckRequestYearChange} 
                        id="CheckRequestYear"
                        style={{border: "1px solid #a7a7a7"}}/>

                        <label class="form-check-label custom-body" style={{ fontSize: '20px'}} for="flexCheckDefault">
                            กรณีขอใบรับรองผลการเรียน ชั้นป.4-5
                        </label>
                    </div>

                    {ShowInputRequestYear && (
                      <>
                    <div className="mb-3 d-flex px-3" >
                        <input
                            type="text"
                            id="AmountRequestYear"
                            className="form-control ml-3 px-3"
                            placeholder="จำนวน"
                            style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"20px"}}
                            value={AmountRequestYear}
                            onChange={handleAmountRequestYearChange}
                            required
                        />
                        <h5 className="ms-2 mt-2 custom-body"style={{ fontSize: '18px'}}>ฉบับ</h5>
                    </div>
                    <h1 class="card-heading px-3" style={{fontSize: '18px',fontWeight: 'bold',marginLeft:"20px"}}>ต้องการขอเอกสารครั้งนี้เพื่อ</h1>
              
                        <div class="dropdown px-3"style={{maxWidth:"55%",fontSize: '18px',marginLeft:"20px"}} >
                            <select value={selectedOptionRequestYear} onChange={handleSelectOptionRequestYearChange} class="custom-select" id="selectedOptionRequestYear">
                                <option value="">ระบุหมายเหตุ</option>
                                <option value="เพื่อใช้ในการขอทุนการศึกษา">เพื่อใช้ในการขอทุนการศึกษา</option>
                                <option value="เพื่อใช้ในการสมัครเข้าศึกษาต่อ">เพื่อใช้ในการสมัครเข้าศึกษาต่อ</option>
                                <option value="อื่นๆ">อื่นๆ</option>

                            </select>
                        </div>
                        
                      {ShowOptionInputYear && (
                        <textarea
                        type="text"
                        id = "OptionRequestYear"
                        className="form-control ml-3 px-3"
                        placeholder="ระบุหมายเหตุในการขอใบรับรอง"
                        style={{maxWidth:"50%", fontFamily: 'Kanit, sans-serif',border: "1px solid #a7a7a7",marginLeft:"35px",marginTop:"10px"}}
                        value={OptionRequestYear}
                        onChange={handleOptionRequestYearChange}
                        required
                    />
                      )}
    
                    </>
                   
                    )}

                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      */}

                    <br></br>
                    
                
                    <h1 class="card-heading px-3" style={{fontSize: '20px',fontWeight: 'bold'}}>อัปโหลดรูปภาพนักเรียน</h1>
                    <h2 class="card-heading px-3"style={{ fontSize: '18px'}}>หมายเหตุ</h2>
                    <h5 class="card-heading px-3"style={{ fontSize: '16px'}}>1. รูปถ่ายต้องถ่ายไว้ไม่เกิน 6 เดือน</h5>
                    <h5 class="card-heading px-3"style={{ fontSize: '16px'}}>2. รูปถ่ายนักเรียนปัจจุบันต้องแต่งกายถูกต้องตามระเบียบของโรงเรียน</h5>
                    <br></br>
                    <input 
                        type="file" 
                        class="form-control" 
                        id="customFile" 
                        onChange={handleFileChange} 
                        style={{maxWidth:"60%",marginLeft:"15px"}}
                        accept=".pdf, .jpg, .jpeg, .png"
                        required 
                        />
                    <br></br>
                </div>
                    {/* <Link to="/Request_cert">  */}
                    {/* /Parent_menu */}
                    <button type="submit" onClick={() => setshowConfirmModal(true)} class="btn btn-primary float-end" style={{ textAlign: 'right' }}>
                      <span>Submit</span>
                    </button>
                    {/* </Link> */}
            </div>
        </div>
    </div>
    </div>
     
      </>
      ) 
}

export default Request_cert