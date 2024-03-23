import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../images/IMG_5416.png';
import Header from '../components/Header';
import Axios from 'axios';

function CheckEnroll_status() {
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };

      // const data = [{
      //   "array": ["NID1", "NID2"],
      //   "Name": ["John Doe", "Jane Doe"],
      //   "Enroll_Year": [2022, 2021, 2024],
      //   "Enroll_Course": ["Computer Science", "Engineering", "Business Administration"]
      // }];
    
      
    
     
      
// const handleEnroll_dataDropdownChange = (event) => {
      //   setEnroll_dataDropdownList(event.target.value);
      // };

      const [selectedApplicantData, setSelectedApplicantData] = useState("");
      const [selectedName, setSelectedName] = useState("");
      const [selectedYear, setSelectedYear] = useState("");
      const [selectedCourse, setSelectedCourse] = useState("");
      const [Enroll_statusList, setEnroll_statusList] = useState([]);
      const [Enroll_ArrayDropdownList, setEnroll_ArrayDropdownList] = useState([]);
      const [Enroll_dataDropdownList, setEnroll_dataDropdownList] = useState([]);

      
      // const nidValue = "";

    //   if (selectedName.trim() !== "") {
    //     const nameIndex = Enroll_dataDropdownList[0].Name.indexOf(selectedName);
    //     if (nameIndex !== -1) {
    //         const nidValue = Enroll_dataDropdownList[0].Enroll_ID[nameIndex];
    //         console.log("nidValue:", nidValue);
    //     } else {
    //         console.log("selectedName ไม่ตรงกับข้อมูลใดใน Enroll_dataDropdownList");
    //     }
    // } else {
    //     console.log("selectedName เป็นสตริงเปล่า");
        
    // }
    
    const handleApplicantDataChange = (event) => {
        setSelectedApplicantData(event.target.value);
      };
    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
      };
      const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
      };
      const handleCourseChange = (event) => {
        setSelectedCourse(event.target.value);
      };

      useEffect(() => {

        
        // เรียก API เมื่อหน้าเว็บโหลดขึ้นมา
        Axios.get('http://localhost:8080/dropdownArray_EnrollStatus/parent1@example.com')
          .then((response) => {
            console.log("so sad cannot connect to http://localhost:8080/dropdownArray_EnrollStatus",response.data);
            setEnroll_ArrayDropdownList(response.data);
            console.log("hello world",response.data[0].Name);
          }).catch((err) => {
            console.log(err)
          });

          Axios.get('http://localhost:8080/dropdownData_EnrollStatus/parent1@example.com')
          .then((response) => {
            console.log("so sad cannot connect to http://localhost:8080/dropdownArray_EnrollStatus",response.data);
            setEnroll_dataDropdownList(response.data);
            console.log("hello world",response.data[0].Name);
          }).catch((err) => {
            console.log(err)
          });

        Axios.get('http://localhost:8080/defaultData_EnrollStatus/parent1@example.com')
        // Axios.get('http://localhost:8080/CheckEnroll_status/1')
            .then((response) => {
              console.log("so sad cannot connect to http://localhost:8080/defaultData_EnrollStatus/parent1@example.com",response.data);
              setEnroll_statusList(response.data);
            }).catch((err) => {
              console.log(err)
            });
      }, []);
      
      // const handleNextButtonClick = () => {
      //   if (selectedName && selectedYear && selectedCourse) {
      //     console.log("มีค่าในทั้งสามดรอปดาวน์ด้านบน");
      //     Axios.get('http://localhost:8080/CheckEnroll_status?Enroll_ID=3&Enroll_Year=2024&Enroll_Course=ปกติ')
      //       .then((response) => {
      //         console.log("so sad cannot connect to http://localhost:8080/CheckEnroll_status?Enroll_ID=3&Enroll_Year=2024&Enroll_Course=ปกติ",response.data);
      //         setEnroll_statusList(response.data);
      //       }).catch((err) => {
      //         console.log(err)
      //       });
      //   } else {
      //     console.log("ไม่มีค่าในทั้งสามดรอปดาวน์ด้านบน");
      //   }
      // }

      const handleNextButtonClick = () => {
        if (selectedName && selectedYear && selectedCourse) {
          console.log("มีค่าในทั้งสามดรอปดาวน์ด้านบน");
          const nameIndex = Enroll_ArrayDropdownList[0].Name.indexOf(selectedName);
          if (nameIndex !== -1) {
              const nidValue = Enroll_ArrayDropdownList[0].Enroll_ID[nameIndex];
              Axios.get(`http://localhost:8080/CheckEnroll_status?Enroll_ID=${nidValue}&Enroll_Year=${selectedYear}&Enroll_Course=${selectedCourse}`)
                .then((response) => {
                  console.log("Data from http://localhost:8080/CheckEnroll_status", response.data);
                  setEnroll_statusList(response.data);
                }).catch((err) => {
                  console.log(err);
                  if (err.response && err.response.status === 404) {
                    console.log("ไม่พบข้อมูลที่ค้นหา");
                    setEnroll_statusList([]);
                  } else {
                      console.log("มีข้อผิดพลาดในการร้องขอข้อมูล");
                  }
                
                });

          } else {
              console.log("ไม่พบชื่อที่ถูกเลือกในรายการ");
            }
        } else {
            console.log("ไม่มีค่าในทั้งสามดรอปดาวน์ด้านบน");
        }
      }

      useEffect(() => {
        console.log("ค่าที่เลือกใน dropdown:", selectedApplicantData);
        if (selectedApplicantData) {
            const dataParts = selectedApplicantData.split('/');
            if (dataParts.length === 3) {
                const selectedName = dataParts[0].trim();
                const selectedYear = dataParts[1].trim();
                const selectedCourse = dataParts[2].trim();
                
                setSelectedName(selectedName);
                setSelectedYear(selectedYear);
                setSelectedCourse(selectedCourse);
                
                

                const nameIndex = Enroll_ArrayDropdownList[0].Name.indexOf(selectedName);
                if (nameIndex !== -1) {
                  const nidValue = Enroll_ArrayDropdownList[0].array[nameIndex];
                  Axios.get(`http://localhost:8080/CheckEnroll_status?Enroll_ID=${nidValue}&Enroll_Year=${selectedYear}&Enroll_Course=${selectedCourse}`)
                    .then((response) => {
                      console.log("Data from http://localhost:8080/CheckEnroll_status", response.data);
                      setEnroll_statusList(response.data);
                    }).catch((err) => {
                      console.log(err);
                      if (err.response && err.response.status === 404) {
                        console.log("ไม่พบข้อมูลที่ค้นหา");
                        setEnroll_statusList([]);
                      } else {
                          console.log("มีข้อผิดพลาดในการร้องขอข้อมูล");
                      }
                    
                    });
    
              }

              console.log("ชื่อ:", selectedName);
                console.log("ปีการศึกษา:", selectedYear);
                console.log("หลักสูตร:", selectedCourse);

            } else {
                console.log("ข้อมูลที่เลือกไม่ถูกต้อง");
            }
        } else {
            console.log("ไม่มีข้อมูลที่เลือก");
        }
    }, [selectedApplicantData]);
    

      // useState(()=>{
        // const getCheckEnroll_status = () => {
          // Axios.get('http://localhost:8080/CheckEnroll_status/2')
          // Axios.get('http://localhost:8080/defaultData_EnrollStatus/parent1@example.com')
          //   .then((response) => {
          //     console.log("so sad cannot connect to http://localhost:8080/defaultData_EnrollStatus/parent1@example.com",response.data);
          //     setEnroll_statusList(response.data);
          //   }).catch((err) => {
          //     console.log(err)
          //   });

          //   Axios.get('http://localhost:8080/dropdownArray_EnrollStatus/parent1@example.com')
          //   .then((response) => {
          //     console.log("so sad cannot connect to http://localhost:8080/dropdownArray_EnrollStatus",response.data);
          //     setEnroll_dataDropdownList(response.data);
              
          //     console.log("hello world",response.data[0].Name);
          //   }).catch((err) => {
          //     console.log(err)
          //   });
        // }
      // },[])

      // const sortedsYear =Enroll_dataDropdownList[0].Enroll_Year.sort();
    

      // console.log(response);
      
      // const [obj, setObj] = useState([
      //   {
      //     NameTitle: "เด็กหญิง",
      //     FirstName: "ใจดี",
      //     LastName: "รักสงบ",
      //     Student_NID: "X-XXXX-XXXXX-XX-X",
      //     Enroll_Year: "XXXX",
      //     Enroll_Course:"English Program (EP)",
      //     Enroll_No:"XXXX",
      //     Enroll_Status:"รอการสอบคัดเลือก"
      //   }
      // ]);
  return (
    <>
    {/* <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logoImage} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            <h5 style={{ textAlign: 'right', marginLeft: '10px', marginBottom: '0' }}>โรงเรียนฤทธิยะวรรณาลัย (ประถม)</h5>
          </div>
        </Link>
        <div className="nav navbar-nav navbar-right">
          <span className='nav-link'>
          <Link
                // onClick={handleGoBack}
                to = "/NewUser_menu"
                style={{ ...linkStyle, fontFamily: 'Kanit, sans-serif' }}>
                เลือกเมนู
              </Link>
          </span>
        </div>
      </div>
    </nav> */}
    
    <Header header="ระบบรับสมัครนักเรียนแบบออนไลน์" subhead="เพื่อเข้าศึกษาระดับประถมศึกษาปีที่ 1" />
    
    
    <div class="container"style={{height: '100vh' }}>
      <div className="container mt-5 d-flex flex-column align-items-center">
          <h2 className="ms-3 mb-0">ข้อมูลการสมัคร</h2>
      </div>

      <br />
      <div className="container d-flex align-items-center justify-content-center"style={{ flexWrap: 'wrap' }}>

      <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontFamily: 'Kanit, sans-serif', fontSize: '20px' }}>
        <div className="d-flex align-items-center">
          <span style={{ marginRight: "10px",fontWeight:"bolder" }}>ตรวจสอบข้อมูลผู้สมัคร :</span>
        </div>
        <div className="dropdown" style={{ maxWidth: '100%' }}>
          <select value={selectedApplicantData} onChange={handleApplicantDataChange} className="custom-select">
            <option value="">เลือกผู้สมัคร/ปีการศึกษา/หลักสูตร</option>
            {Enroll_dataDropdownList.length > 0 && Enroll_dataDropdownList.map((applicant, index) => (
              <option key={index} value={`${applicant.FirstName} ${applicant.LastName} / ${applicant.Enroll_Year} / ${applicant.Enroll_Course}`}>
                {`${applicant.FirstName} ${applicant.LastName} / ${applicant.Enroll_Year} / ${applicant.Enroll_Course}`}
              </option>
            ))}
          </select>
        </div>
      </div>


          {/* <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px' }}>
            <div className="d-flex align-items-center">
              <span style={{ marginRight: "10px" }}>ผู้สมัครเรียน :</span>
            </div>
            <div className="dropdown" style={{ maxWidth: '100%' }}>
              <select value={selectedName} onChange={handleNameChange} className="custom-select">
                <option value="">เลือกผู้สมัคร</option>
                {Enroll_dataDropdownList.length > 0 && Array.from(new Set(Enroll_dataDropdownList[0].Name)).map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

         
        {/* <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px'}}>
          <div className="d-flex align-items-center">
            <span style={{marginRight:"10px"}}>เลือกปีการศึกษา:</span>
          </div>
          <div className="dropdown" style={{ maxWidth: '100%' }}>
            <select value={selectedYear} onChange={handleYearChange} className="custom-select">
              <option value="">เลือกปีการศึกษา</option>
              {Enroll_dataDropdownList.length > 0 && Enroll_dataDropdownList[0].Enroll_Year.sort().map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px'}}>
          <div className="d-flex align-items-center">
            <span style={{marginRight:"10px"}}>เลือกหลักสูตร:</span>
          </div>
          <div className="dropdown" style={{ maxWidth: '100%' }}>
            <select value={selectedCourse} onChange={handleCourseChange} className="custom-select">
              <option value="">เลือกหลักสูตร</option>
              {Enroll_dataDropdownList.length > 0 && Enroll_dataDropdownList[0].Enroll_Course.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div> */}

        {/* <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px'}}>
          <button className="btn btn-primary ms-auto" onClick={handleNextButtonClick}>ถัดไป</button>
        </div> */}
      </div>

      <div className="d-flex flex-column justify-content-center"style={{fontFamily: 'Kanit, sans-serif'}}>
      {Enroll_statusList.length === 0 ? (
       <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px' }}>
        <div className="container mt-5 d-flex flex-column align-items-center">
          <span className="ms-3 mb-0" style={{ color: 'gray' }}>ไม่พบข้อมูลผู้สมัคร</span>
        </div>
      </div>
     
        ) : (
          <>
          <br/>
          <div className="mx-auto" style={{ maxWidth: '90%', fontFamily: 'Kanit, sans-serif' }}>
              {Enroll_statusList.map((val, key) => (
                <div className="card" style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
            <div className="card-body">
            
            <div style={{display:"flex", flexWrap: 'wrap',justifyContent:"left"}}>
                <div className="align-items-center"style={{padding:"10px"}}>
                  <h2 className="col-form-label" style={{ fontSize: '18px', fontWeight: 'bold' }}>ชื่อ-นามสกุล</h2>

                  
                  <input
                      type="text"
                      className="form-control"
                      value={`${val.NameTitle} ${val.FirstName} ${val.LastName}`}
                      readOnly
                      style={{ backgroundColor: '#DCDCDC', color: 'black', maxWidth: '100%' }}
                    />
                </div>
           
                {/* </div>
                <div style={{ display:"flex",justifyContent:"center" }}> */}
                <div className="align-items-center"style={{padding:"10px"}} >
                  <h2 className="col-form-label" style={{ fontSize: '18px', fontWeight: 'bold' }}>เลขประจำตัวประชาชน</h2>
                  
                  <input
                      type="text"
                      className="form-control"
                      value={`${val.Student_NID}`}
                      readOnly
                      style={{ backgroundColor: '#DCDCDC', color: 'black', maxWidth: '100%' }}
                    />
                </div>
                {/* </div>
              <div style={{display:"flex", flexWrap: 'wrap',justifyContent:"center"}}> */}
            
                  <div className="align-items-center"style={{padding:"10px"}}>
                    <h2 className="col-form-label" style={{ fontSize: '18px', fontWeight: 'bold' }}>ปีการศึกษา</h2>
                    
                
                    <input
                    type="text"
                    className="form-control"
                    value={`${val.Enroll_Year}`}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black', maxWidth: '100%' }}
                  />
                  </div>
                  {/* </div>
                <div style={{ display:"flex",flexWrap: 'wrap' }}> */}
                  <div className="align-items-center"style={{padding:"10px"}}>
                    <h2 className="col-form-label" style={{ fontSize: '18px', fontWeight: 'bold' }}>หลักสูตร</h2>
                  
                    <input
                      type="text"
                      className="form-control"
                      value={`${val.Enroll_Course}`}
                      readOnly
                      style={{ backgroundColor: '#DCDCDC', color: 'black', maxWidth: '100%' }}
                    />
                  </div>
                  {/* </div>
                <div style={{ display:"flex",flexWrap: 'wrap' }}> */}            
                <div className="align-items-center"style={{padding:"10px"}}>
                    <h2 className="col-form-label" style={{ fontSize: '18px', fontWeight: 'bold' }}>เลขที่สมัคร</h2>
                    
                    <input
                      type="text"
                      className="form-control"
                      value={`${val.Enroll_No}`}
                      readOnly
                      style={{ backgroundColor: '#DCDCDC', color: 'black', maxWidth: '100%' }}
                    />
                    </div>
                    </div>

                <div style={{ display:"flex",flexWrap: 'wrap' }}>
                  <div className=" align-items-center"style={{padding:"10px"}}>
                    <h2 className="col-form-label" style={{ fontSize: '18px', fontWeight: 'bold' }}>สถานะ</h2>
                    <h2 className="col-form-label" style={{ fontSize: '18px' }}>{val.Enroll_Status}</h2>
                  </div>
                
              </div>
              {/* </div> */}
              {val.Enroll_Status === "รอการสอบคัดเลือก" && (
                  <button
                    type="button"
                    className="btn btn-primary float-end"
                    style={{
                      fontFamily: "Kanit, sans-serif",
                      textAlign: "center",
                      justifyContent: 'flex-end',
                      display: val.Enroll_Status === "รอการสอบคัดเลือก" ? "block" : "none"
                    }}
                    onClick={() => {
                      const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                      const printWindow = window.open(fileUrl, "_blank", "width=1000,height=800");
                      printWindow.print();
                    }}
                  >
                    <span>พิมพ์บัตรประจำตัวผู้สอบ</span>
                  </button>
                )}
            </div>
            </div>
          ))}
          </div>  
        </>
    )}
    </div>
  </div>
  </>
  )
}

export default CheckEnroll_status