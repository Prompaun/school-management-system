import React, { useState,useEffect } from 'react'
import { Button, Modal,Spinner } from 'react-bootstrap';
import axios from 'axios';

function Modal_ApplicantDetails({show,setShow,applicant_id}) {

    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };
      const [StudentData,setStudentData] = useState(
        [
            {
                National_ID_Number : "1-0000-00000-11-1",
                // Student_ID : "13333",
                NameTitle : "เด็กหญิง",
                FirstName : "ดวง",
                LastName : "จันทร์",
                DateOfBirth : "01/05/2559",
                CopyofStudentIDCardFile : "", //link drive gg
                TranscriptType : "ปพ.1",
                PreviousSchoolEducationalRecordsFile : "" //link drive gg
            }
        ]
      );

      const [HouseholdData,setHouseholdData] = useState(
        [
            {
              Address_Number : "11/1",
              Village : "5",
              Alley : "อ่อนนุช 11",
              Road : "สุขุมวิท",
              Province : "กรุงเทพมหานคร",
              District : "ประเวศ",
              Subdistrict : "สวนหลวง", 
              HouseReg_file : "" //link drive gg
            }
        ]
      );

     
      const [ParentData,setParentData] = useState(
        [
            {
              name_father : "-",
              lastname_father : "-",
              DOB_father : "-",
              Nationality_father : "-",
              Occupation_father : "-",
              Workplace_father : "-",
              Phone_father : "-", 
              name_mother : "-",
              lastname_mother : "-",
              DOB_mother : "-",
              Nationality_mother : "-",
              Occupation_mother : "-",
              Workplace_mother : "-",
              Phone_mother : "-", 
    
            }
        ]
      );
       //รับค่ามาว่าผู้ปกครองเป็นใคร
    const [WhoAreParent,setWhoAreParent] = useState("บิดา");
    //ฟังก์ชันโชว์ส่วนของข้อมูลผู้ปกครองที่เป็นบิดา มารดา บิดาและมารดา
    const [ShowWhoAreParent,setShowWhoAreParent] = useState(false);
    
    useEffect(() => {
    
        if (WhoAreParent==="อื่นๆ") {
            setShowWhoAreParent(false);
            setShowParentData(true);
        }
        else {
            setShowWhoAreParent(true);
            setShowParentData(false);
        }

        }, [WhoAreParent]);

        //ฟังก์ชันโชว์ส่วนของข้อมูลผู้ปกครองที่เป็นอื่นๆ
    const [ShowParentData,setShowParentData]=useState(false);

    //ข้อมูลที่ใช้โชว์เมื่อผู้ปกครองเป็นอื่นๆ
      const [OtherParentData,setOtherParentData] = useState(
        [
            {
              name_parent : "-",
              lastname_parent : "-",
              DOB_parent : "-",
              Nationality_parent : "-",
              Occupation_parent : "-",
              Workplace_parent : "-",
              Phone_parent : "-", 
              Parent_relation :"-"
            }
        ]
      );


    //=============================api=============================
    function formatDateThaiYear(dateString) {
        const dob = new Date(dateString);
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear() + 543; // Add 543 to convert to พ.ศ.
        const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return formattedDOB;
    }  

    async function getApplicantDetailInfo() {
        try {
            const response = await axios.post('http://localhost:8080/get-applicant-detail-info', {
                applicant: applicant_id
            });

            const formatStudentDOB = formatDateThaiYear(response.data.results[0].Student_DOB)
            setStudentData([
                {
                    National_ID_Number : response.data.results[0].Student_NID,
                    // Student_ID : "13333",
                    NameTitle : response.data.results[0].NameTitle,
                    FirstName : response.data.results[0].FirstName,
                    LastName : response.data.results[0].LastName,
                    DateOfBirth : formatStudentDOB,
                    CopyofStudentIDCardFile : response.data.results[0].BirthCert_file, //link drive gg
                    TranscriptType : response.data.results[0].Transcript_type,
                    PreviousSchoolEducationalRecordsFile : response.data.results[0].Transcript_file //link drive gg
                }
            ])
            setHouseholdData([
                {
                    Address_Number : response.data.results[0].House_No,
                    Village : response.data.results[0].Moo,
                    Alley : response.data.results[0].Soi,
                    Road : response.data.results[0].Road,
                    Province : response.data.results[0].Province,
                    District : response.data.results[0].District,
                    Subdistrict : response.data.results[0].Sub_District, 
                    HouseReg_file : response.data.results[0].HouseReg_file //link drive gg
                  }
            ])

            const getOtherParent = response.data.results.find(element => element.Role !== "บิดา" && element.Role !== "มารดา")
            if (getOtherParent !== undefined) {
                setWhoAreParent("อื่นๆ")
                const formatOtherParentDOB = formatDateThaiYear(getOtherParent.DateOfBirth)
                setOtherParentData([
                    {
                        name_parent : getOtherParent.pFirstName,
                        lastname_parent : getOtherParent.pLastName,
                        DOB_parent : formatOtherParentDOB,
                        Nationality_parent : getOtherParent.Nationality,
                        Occupation_parent : getOtherParent.Occupation,
                        Workplace_parent : getOtherParent.Office,
                        Phone_parent : getOtherParent.Tel, 
                        Parent_relation : getOtherParent.Role
                    }
                ])
            }

            response.data.results.forEach(element => {
                if (element.Role === "บิดา") {
                    const formatFatherentDOB = formatDateThaiYear(element.DateOfBirth)
                    setParentData(prevData => {
                        const oldData = [...prevData]
                        oldData[0].name_father = element.pFirstName
                        oldData[0].lastname_father = element.pLastName
                        oldData[0].DOB_father = formatFatherentDOB
                        oldData[0].Nationality_father = element.Nationality
                        oldData[0].Occupation_father = element.Occupation
                        oldData[0].Workplace_father = element.Office
                        oldData[0].Phone_father = element.Tel
                        return oldData;
                    })
                }

                if (element.Role === "มารดา") {
                    const formatMatherParentDOB = formatDateThaiYear(element.DateOfBirth)
                    setParentData(prevData => {
                            const oldData = [...prevData]
                            oldData[0].name_mother = element.pFirstName
                            oldData[0].lastname_mother = element.pLastName
                            oldData[0].DOB_mother = formatMatherParentDOB
                            oldData[0].Nationality_mother = element.Nationality
                            oldData[0].Occupation_mother = element.Occupation
                            oldData[0].Workplace_mother = element.Office
                            oldData[0].Phone_mother = element.Tel
                            return oldData;
                    })
                }
            });

            
            
            return response.data;
        } catch (error) {
            console.error('Error fetching classRoom dropdown:', error);
            throw error;
        }
    };

    useEffect(() => {
        getApplicantDetailInfo()
    }, [])

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="xl"
      style={{ fontFamily: 'Kanit, sans-serif' }}
    >
        <Modal.Header>
        <h5 className="modal-title">ข้อมูลผู้สมัคร</h5>
            <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
            >
        </button>
        </Modal.Header>
      <Modal.Body>
        {/* -----------------------------------------------------Student Information--------------------------------------------------------------- */}
        
        <div className="card"  style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
            <div className="card-body">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Kanit, sans-serif',
      }}>

        <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
        
            <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                <label htmlFor="FirstName" className="col-form-label">ข้อมูลส่วนตัวของนักเรียน</label>
            </div>
        
        <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif' }}>   
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="National_ID_Number" className="col-form-label">เลขประจำตัวประชาชน</label>
                </div> 
            <div className="align-items-center"style={{maxWidth:"100%"}}>       
                <input 
                    type="text" 
                    className="form-control"
                    id="National_ID_Number" 
                    name="National_ID_Number" 
                    value={StudentData[0].National_ID_Number}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black' }} 
                />
            </div>
            </div>
            {/* <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
           
                <label htmlFor="Student_ID" className="col-form-label">เลขประจำตัวนักเรียน</label>
                </div> 
            <div className="align-items-center"style={{maxWidth:"100%"}}>  
                <input
                    type="text"
                    className="form-control"
                    id="Student_ID"
                    name="Student_ID"
                    value={StudentData[0].Student_ID}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                    />            
            </div>
            </div> */}
            </div>
      
      <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif' }}> 
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="title" className="col-form-label">คำนำหน้า</label>
                </div> 
            <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="title" 
                    name="title" 
                    value={StudentData[0].NameTitle} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                />
            </div>
            </div>
        <div style={{ fontSize: '18px'}}>    
            <div className=" align-items-center">
                <label htmlFor="FirstName" className="col-form-label">ชื่อ</label>
                </div> 
            <div className=" align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="FirstName"
                    name="FirstName"
                    value={StudentData[0].FirstName}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
             </div>           
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="lastname" className="col-form-label">นามสกุล</label>
                </div> 
            <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    value={StudentData[0].LastName}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
            </div>
        </div>

        <div style={{fontSize: '18px' }}>
            <div className="align-items-center"style={{ flexWrap: 'wrap' }}>
                <label htmlFor="Date_of_Birth" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                </div> 
            <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Date_of_Birth"
                    name="Date_of_Birth"
                    value={StudentData[0].DateOfBirth}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                    />            
            </div>
        </div>
        </div>
       
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', fontFamily: 'Kanit, sans-serif', fontSize: '18px'}}> 
            
                <div className="align-items-center"style={{flexWrap:"wrap", fontSize: '18px'}}>
                <label htmlFor="Copy_of_the_birth_certificate" className="col-form-label">สำเนาสูติบัตร (ของนักเรียน)</label>
                
                </div> 
                <button 
                        type="submit" 
                        className="btn btn-custom" 
                        style={{
                        ...fontStyle, 
                        color: 'white', 
                        fontSize: '18px', 
                        textAlign: 'center', 
                       
                        backgroundColor: '#EE82EE',
                        width: 'auto', // กำหนดความกว้าง
                        height: 'auto'  // กำหนดความสูง
                        }}
                        onClick={() => window.open(StudentData[0].CopyofStudentIDCardFile )}
                    >
                        <span>file</span>
                </button>
            
        </div>
      

            {/* <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <button type="submit" className="btn btn-primary">file</button>
            </div> */}

            <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                <label htmlFor="FirstName" className="col-form-label">ข้อมูลการศึกษา</label>
            </div>
        

        
        <div style={{ display: 'flex',flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif' }}>
            <div className="align-items-center"style={{flexWrap:"wrap", fontSize: '18px'}}>
                <label htmlFor="Education_Document" className="col-form-label">หลักฐานการศึกษาจากโรงเรียนเดิม</label>
                
                </div> 
            <div className="align-items-center"style={{ maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Education_Document"
                    name="Education_Document"
                    value={StudentData[0].TranscriptType}
                    readOnly
                    style={{
                        backgroundColor: '#DCDCDC',
                        color: 'black',
                         // กำหนดความกว้างขั้นต่ำ
                        boxSizing: 'border-box',  // ตั้งค่า box-sizing
                        fontSize: '18px'
                    }} 
                />
            </div>

            {/* <div className="align-items-center"> */}
                <button 
                        type="submit" 
                        className="btn btn-custom" 
                        style={{
                        ...fontStyle, 
                        color: 'white', 
                        fontSize: '18px', 
                        textAlign: 'center', 
                        
                        backgroundColor: '#EE82EE',
                        width: 'auto', // กำหนดความกว้าง
                        height: 'auto'  // กำหนดความสูง
                        }}
                        // onClick={StudentData[0].PreviousSchoolEducationalRecordsFile}
                        onClick={() => window.open(StudentData[0].PreviousSchoolEducationalRecordsFile )}
                    >
                        <span>file</span>
                </button>

               
                </div>

                </div>
                </div>
            </div>
        </div>
        {/* -----------------------------------------------------Student Address--------------------------------------------------------------- */}
        
        <div className="card"  style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
            <div className="card-body">
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Kanit, sans-serif',
      }}>
         <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
         <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                <label htmlFor="FirstName" className="col-form-label">ข้อมูลที่อยู่ตามทะเบียนบ้าน</label>
            </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            <label className="col-form-label"style={{flexWrap: 'wrap' }}>บ้านเลขที่ :</label>
            </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Address_Number" 
                    name="Address_Number" 
                    value={HouseholdData[0].Address_Number} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
           
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>หมู่ที่ :</label>
              </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Village"
                    name="Village"
                    value={HouseholdData[0].Village} 
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
            <label className="col-form-label" style={{flexWrap: 'wrap' }}>ซอย :</label>
            </div>
            <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Alley"
                    name="Alley"
                    value={HouseholdData[0].Alley} 
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
 </div>
 </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>ถนน :</label>
            </div>
            <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Road"
                    name="Road"
                    value={HouseholdData[0].Road} 
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                        
            </div>
        
        </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
           
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>จังหวัด :</label>
              </div>
              <div className="align-items-center" style={{maxWidth:"100%"}}>
                <input 
                    type="text" 
                    className="form-control"
                    id="Province" 
                    name="Province" 
                    value={HouseholdData[0].Province}  
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>

            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>เขต/อำเภอ :</label>
              </div>
              <div className="align-items-center" style={{maxWidth:"100%"}}>
                <input
                    type="text"
                    className="form-control"
                    id="District"
                    name="District"
                    value={HouseholdData[0].District}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
            <label className="col-form-label"style={{flexWrap: 'wrap' }}>แขวง/ตำบล :</label>
            </div>
            <div className="align-items-center" style={{maxWidth:"100%"}}>
              <input 
                  type="text" 
                  className="form-control"
                  id="Subdistrict" 
                  name="Subdistrict" 
                  value={HouseholdData[0].Subdistrict} 
                  readOnly 
                  style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                  // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
              />
          </div>
          </div>
            
          </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px',  fontFamily: 'Kanit, sans-serif',fontSize:"18px"}}>
          <div className="align-items-center">
          <label className="col-form-label">สำเนาทะเบียนบ้าน  </label>
                <button 
                    type="submit" 
                    className="btn btn-custom" 
                    style={{
                    ...fontStyle, 
                    color: 'white', 
                    fontSize: '18px', 
                    textAlign: 'center', 
                    // marginTop: '10px', 
                    margin: '5px',
                    
                    backgroundColor: '#EE82EE',
                    width: 'auto', // กำหนดความกว้าง
                    height: 'auto',  // กำหนดความสูง
                    // fontSize:"18px"
                    }}
                    onClick={() => window.open(HouseholdData[0].HouseReg_file)}
                >
                    <span>file</span>
                </button>
            </div>
        </div>
        
        </div>

    </div>
    </div>

    </div>
        {/* -----------------------------------------------------Parent Information--------------------------------------------------------------- */}
        <div className="card"  style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
            <div className="card-body">

            <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Kanit, sans-serif',
      }}>
       
       <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
            <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                    <label htmlFor="father_data" className="col-form-labe">ข้อมูลบิดา</label>
            </div>
        </div>
        <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="name_father" className="col-form-label">ชื่อ</label>
                </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="name_father" 
                    name="name_father" 
                    value={ParentData[0].name_father}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="lastname_father" className="col-form-label">นามสกุล</label>
                </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="lastname_father"
                    name="lastname_father"
                    value={ParentData[0].lastname_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                </div>         
            </div>
            </div>
       
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="DOB_father" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="DOB_father"
                    name="DOB_father"
                    value={ParentData[0].DOB_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
                
            </div>
        </div>
                  
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Nationality_father" className="col-form-label">สัญชาติ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Nationality_father" 
                    name="Nationality_father" 
                    value={ParentData[0].Nationality_father}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black' }} 
                />
            </div>
            
        </div>
        
                  
                  <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Occupation_father" className="col-form-label">อาชีพ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Occupation_father"
                    name="Occupation_father"
                    value={ParentData[0].Occupation_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
                  
                  <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Workplace_father" className="col-form-label">สถานที่ทำงาน</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Workplace_father"
                    name="Workplace_father"
                    value={ParentData[0].Workplace_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
            </div>
        
        </div>
                  
            <div style={{ fontSize: '18px'}}> 
                <div className="align-items-center">
                    <label htmlFor="Phone_father" className="col-form-label">โทรศัพท์</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                    <input 
                        type="text" 
                        className="form-control"
                        id="Phone_father" 
                        name="Phone_father" 
                        value={ParentData[0].Phone_father}
                        readOnly 
                        style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                    />
                </div>
            </div>
    </div>
    <br />

    <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>        
        <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                    <div className="align-items-center">
                            <label htmlFor="mother_data" className="col-form-label">ข้อมูลมารดา</label>
                        </div>
                
            </div>
        
            </div>
            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="name_mother" className="col-form-label">ชื่อ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="name_mother" 
                    name="name_mother" 
                    value={ParentData[0].name_mother} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="lastname_mother" className="col-form-label">นามสกุล</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="lastname_mother"
                    name="lastname_mother"
                    value={ParentData[0].lastname_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                        
            </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="DOB_mother" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="DOB_mother"
                    name="DOB_mother"
                    value={ParentData[0].DOB_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
              
            </div>
            </div>
            <div style={{ fontSize: '18px'}}>
            <div className="align-items-center">
                <label htmlFor="Nationality_mother" className="col-form-label">สัญชาติ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Nationality_mother" 
                    name="Nationality_mother" 
                    value={ParentData[0].Nationality_mother} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
        
            </div>
           
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Occupation_mother" className="col-form-label">อาชีพ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Occupation_mother"
                    name="Occupation_mother"
                    value={ParentData[0].Occupation_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Workplace_mother" className="col-form-label">สถานที่ทำงาน</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Workplace_mother"
                    name="Workplace_mother"
                    value={ParentData[0].Workplace_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
            </div>
            </div>
        
            <div style={{ fontSize: '18px'}}> 
        
            <div className="align-items-center">
                <label htmlFor="Phone_mother" className="col-form-label">โทรศัพท์</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Phone_mother" 
                    name="Phone_mother" 
                    value={ParentData[0].Phone_mother}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
            </div>

        </div>
        </div>
        
       <br />
       <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>        
        <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
            <div className="align-items-center">
                    <label htmlFor="data_parent" className="col-form-label">ข้อมูลผู้ปกครอง</label>
                </div>
        </div>
        </div>
        {ShowWhoAreParent && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
            <div style={{ fontSize: '18px'}}> 
                <div className="align-items-center">
                    <label htmlFor="who_are_parent" className="col-form-label">ผู้ปกครองเป็น</label>
                    </div>
                    <div className="align-items-center"style={{maxWidth:"100%"}}> 
                    <input 
                        type="text" 
                        className="form-control"
                        id="who_are_parent" 
                        name="who_are_parent" 
                        value={WhoAreParent}
                        readOnly 
                        style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                        // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                    />
                </div>
                </div>
            </div>
        )}

     {ShowParentData && (
        <>

        <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>   

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="name_parent" className="col-form-label">ชื่อ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="name_parent" 
                    name="name_parent" 
                    value={OtherParentData[0].name_parent}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="lastname_parent" className="col-form-label">นามสกุล</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="lastname_parent"
                    name="lastname_parent"
                    value={OtherParentData[0].lastname_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                        
            </div>
     
            </div>
           
            </div> 
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="DOB_parent" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="DOB_parent"
                    name="DOB_parent"
                    value={OtherParentData[0].DOB_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
                
            </div>
        </div>
        <div style={{ fontSize: '18px'}}>
            <div className="align-items-center">
                <label htmlFor="Nationality_parent" className="col-form-label">สัญชาติ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Nationality_parent" 
                    name="Nationality_parent" 
                    value={OtherParentData[0].Nationality_parent}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
        
            </div>
           
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Occupation_parent" className="col-form-label">อาชีพ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Occupation_parent"
                    name="Occupation_parent"
                    value={OtherParentData[0].Occupation_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Workplace_parent" className="col-form-label">สถานที่ทำงาน</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Workplace_parent"
                    name="Workplace_parent"
                    value={OtherParentData[0].Workplace_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
            </div>
            </div>
        
            <div style={{ fontSize: '18px'}}> 
        
            <div className="align-items-center">
                <label htmlFor="Phone_parent" className="col-form-label">โทรศัพท์</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Phone_parent" 
                    name="Phone_parent" 
                    value={OtherParentData[0].Phone_parent} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
            </div>

            <div style={{ fontSize: '18px'}}> 
                <div className="align-items-center">
                    <label htmlFor="Parent_relation" className="col-form-label">เกี่ยวข้องเป็น</label>
                    </div>
                    <div className="align-items-center"style={{maxWidth:"100%"}}> 
                    <input 
                        type="text" 
                        className="form-control"
                        id="Parent_relation" 
                        name="Parent_relation" 
                        value={OtherParentData[0].Parent_relation} 
                        readOnly 
                        style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                    />
                </div>
            </div>
            </div>
            
        </div></>
        )}
    
        </div>
    </div>
    </div>
            </div>
        </div>

{/* -------------------------------------------------------------------------------------------------------------------------------------------------- */}
      </Modal.Body>
      <Modal.Footer>
        {/* <button type="button" className="btn btn-primary">
            Save changes
        </button> */}
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>
            Close
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default Modal_ApplicantDetails