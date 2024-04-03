import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Tab_health from '../components/Tab_health';
// import './Health.css';
import { Popover } from "react-bootstrap";
import axios from 'axios';

function Check_health_result({login_Email}) {
   
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    function formatDateThaiYear(dateString) {
      const dob = new Date(dateString);
      const day = dob.getDate();
      const month = dob.getMonth() + 1;
      const year = dob.getFullYear() + 543; // เพิ่มค่า 543 เข้าไปในปีเพื่อแปลงเป็น พ.ศ.
      const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
      return formattedDOB;
    }

    const [congenital_disease,setcongenital_disease] = useState ([
      // {
      //   id:1,
      //   DateCheck:"12/05/2024",
      //   congenital_disease:"ภูมิแพ้อากาศ"
      // },
      // {
      //   id:2,
      //   DateCheck:"12/05/2024",
      //   congenital_disease:"โลหิตจาง"
      // }
    ]);
    const [Diseases,setDiseases] = useState ([
    //   {
    //     id:1,
    //     DateCheck:"12/05/2024",
    //     Diseases:"โรคอีสุกอีใส"
    // }
    ]);
    const [allergic,setallergic] = useState ([
    //   {
    //     id:1,
    //     DateCheck:"12/05/2024",
    //     allergic:"แพ้อาหารทะเล"
    // }
    ]);
    const [accident,setaccident] = useState ([
    //   {
    //     id:1,
    //     DateCheck:"12/05/2024",
    //     accident:"ผ่าตัด"
    // }
    ]);
  
  const [StudentData, setStudentData] = useState([]);
  // const [selectedStudent, setSelectedStudent] = useState("เลือกข้อมูลนักเรียน :");
  const [selectedStudent, setSelectedStudent] = useState('');
  const [Student_ID, setStudent_ID] = useState("");

  async function getStudentIdByParentEmail(email) {
    try {
        const response = await axios.get('http://localhost:8080/get-student-id-request-by-parent-email', {
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

  const handleStudentChange = (event) => {
    const selectedStudentValue = event.target.value;
    setSelectedStudent(selectedStudentValue);
  };

    useEffect(() => {
      const fetchData = async () => {
          try {
              const studentDataArray = await getStudentIdByParentEmail(login_Email);
              const formattedStudentData = studentDataArray.map(student => ({
                  ...student,
                  key: student.Student_ID,
                  StudentID: student.Student_ID,
                  nameTitle: student.NameTitle,
                  Firstname: student.FirstName,
                  Lastname: student.LastName
              }));
              setStudentData(formattedStudentData);
              setStudent_ID(formattedStudentData[0]);
              setSelectedStudent(`${formattedStudentData[0].StudentID} : ${formattedStudentData[0].nameTitle} ${formattedStudentData[0].Firstname} ${formattedStudentData[0].Lastname}`);
              console.log('SelectedStudent:', selectedStudent);
            } catch (error) {
              console.error('Error fetching Data:', error);
          }
      };
      fetchData();
  }, []);
    

  useEffect(() => {
    const fetchData = async () => {
      try {
          // const studentDataArray = await getStudentIdByParentEmail(login_Email);
          // // console.log('Student data array:', studentDataArray);
        
          // const formattedStudentData = studentDataArray.map(student => ({
          //     ...student,
          //     key: student.Student_ID, // ใช้ Student_ID เป็น key
          //     StudentID: student.Student_ID,
          //     nameTitle: student.NameTitle,
          //     Firstname: student.FirstName,
          //     Lastname: student.LastName
          // }));
          // setStudentData(formattedStudentData);
          // // console.log('formattedStudentData:', formattedStudentData);
          // // setSelectedStudent(formattedStudentData[0].StudentID);

          // console.log("formattedStudentData[0].StudentID:", formattedStudentData[0].StudentID);
          // setStudent_ID(formattedStudentData[0]);
          // setSelectedStudent(`${Student_ID.StudentID} : ${Student_ID.nameTitle} ${Student_ID.Firstname} ${Student_ID.Lastname}`);
          // // console.log("Student_ID.StudentID:", Student_ID.StudentID);
          if (selectedStudent){
            // if(formattedStudentData === 1){
              const selectedStudent_ID = selectedStudent.split(' ')[0];
  //           // setSelectedStudent_ID(selectedStudent_ID);
            
  
  //           console.log("selectedStudent_ID:", selectedStudent_ID); // พิมพ์ค่า StudentID ที่ได้
                // console.log("Student_ID.StudentID:", selectedStudent); // พิมพ์ค่า StudentID ที่ได้

                const CongenitalDisease = await getCongenitalDiseaseInfo(selectedStudent_ID);
                const mappedCongenitalDisease = CongenitalDisease.map(item => ({
                    id: item.id,
                    DateCheck: formatDateThaiYear(item.Date),
                    congenital_disease: item.Congenital_Disease
                  }));
                  
                const HistoryDisease = await getHistoryDiseaseInfo(selectedStudent_ID);
                const mappedHistoryDisease = HistoryDisease.map(item => ({
                    id: item.id,
                    DateCheck: formatDateThaiYear(item.Date),
                    Diseases: item.History_Disease
                  }));
                  
                const allergic = await getAllergiesInfo(selectedStudent_ID);
                const mappedAllergic = allergic.map(item => ({
                    id: item.id,
                    DateCheck: formatDateThaiYear(item.Date),
                    allergic: item.Allergies
                  }));

                const accident = await getSurgeryAccidentInfo(selectedStudent_ID);
                const mappedaccident = accident.map(item => ({
                    id: item.id,
                    DateCheck: formatDateThaiYear(item.Date),
                    accident: item.Surgery_Accident
                  }));
                
                const InjectionAlternativeVaccine = await getInjectionAlternativeVaccineInfo(selectedStudent_ID);
                const mappedInjectionAlternativeVaccine = InjectionAlternativeVaccine.map(item => ({
                    id: item.Alternative_Vaccine_ID,
                    Vaccine: item.Vaccine_name
                  }));
                
                const GrowthNutrition = await getGrowthNutritionInfo(selectedStudent_ID);
                const mappedGrowthNutrition = GrowthNutrition.map(item => ({
                    id: item.id,
                    DateRecord: formatDateThaiYear(item.Health_Check_Date),
                    weight_kg: item.Weight,
                    height_cm: item.Height
                  }));
      
                const HealthCheck = await getHealthCheckInfo(selectedStudent_ID);
                const mappedHealthCheck = HealthCheck.map(item => ({
                    id: item.id,
                    DateCheck: formatDateThaiYear(item.Date),
                    Eyesight: item.Eye_examination,
                    Hearing: item.Hearing,
                    Mouth: item.Oral_health
                  }));
      
                const Basic_Vaccine  = await checkVaccine(selectedStudent_ID);
                const mappedBasic_Vaccine  = Basic_Vaccine .map(item => ({
                    id: item.Basic_Vaccine_ID,
                    Vaccine: item.BasicVaccine_name,
                    value: item.value
                  }));
            
                setcongenital_disease(mappedCongenitalDisease);
                setDiseases(mappedHistoryDisease);
                setallergic(mappedAllergic);
                setaccident(mappedaccident);
                setOptionalVaccine(mappedInjectionAlternativeVaccine);
                setBodyData(mappedGrowthNutrition);
                setHealthCheckUp(mappedHealthCheck);
                setEPI_program(mappedBasic_Vaccine);
              }
          //   else if (formattedStudentData > 1){
          //         const CongenitalDisease = await getCongenitalDiseaseInfo(selectedStudent);
          //         const mappedCongenitalDisease = CongenitalDisease.map(item => ({
          //             id: item.id,
          //             DateCheck: formatDateThaiYear(item.Date),
          //             congenital_disease: item.Congenital_Disease
          //           }));
                    
          //         const HistoryDisease = await getHistoryDiseaseInfo(selectedStudent);
          //         const mappedHistoryDisease = HistoryDisease.map(item => ({
          //             id: item.id,
          //             DateCheck: formatDateThaiYear(item.Date),
          //             Diseases: item.History_Disease
          //           }));
                    
          //         const allergic = await getAllergiesInfo(selectedStudent);
          //         const mappedAllergic = allergic.map(item => ({
          //             id: item.id,
          //             DateCheck: formatDateThaiYear(item.Date),
          //             allergic: item.Allergies
          //           }));

          //         const accident = await getSurgeryAccidentInfo(selectedStudent);
          //         const mappedaccident = accident.map(item => ({
          //             id: item.id,
          //             DateCheck: formatDateThaiYear(item.Date),
          //             accident: item.Surgery_Accident
          //           }));
                  
          //         const InjectionAlternativeVaccine = await getInjectionAlternativeVaccineInfo(selectedStudent);
          //         const mappedInjectionAlternativeVaccine = InjectionAlternativeVaccine.map(item => ({
          //             id: item.Alternative_Vaccine_ID,
          //             Vaccine: item.Vaccine_name
          //           }));
                  
          //         const GrowthNutrition = await getGrowthNutritionInfo(selectedStudent);
          //         const mappedGrowthNutrition = GrowthNutrition.map(item => ({
          //             id: item.id,
          //             DateRecord: formatDateThaiYear(item.Health_Check_Date),
          //             weight_kg: item.Weight,
          //             height_cm: item.Height
          //           }));
        
          //         const HealthCheck = await getHealthCheckInfo(selectedStudent);
          //         const mappedHealthCheck = HealthCheck.map(item => ({
          //             id: item.id,
          //             DateCheck: formatDateThaiYear(item.Date),
          //             Eyesight: item.Eye_examination,
          //             Hearing: item.Hearing,
          //             Mouth: item.Oral_health
          //           }));
        
          //         const Basic_Vaccine  = await checkVaccine(selectedStudent);
          //         const mappedBasic_Vaccine  = Basic_Vaccine .map(item => ({
          //             id: item.Basic_Vaccine_ID,
          //             Vaccine: item.BasicVaccine_name,
          //             value: item.value
          //           }));
              
          //         setcongenital_disease(mappedCongenitalDisease);
          //         setDiseases(mappedHistoryDisease);
          //         setallergic(mappedAllergic);
          //         setaccident(mappedaccident);
          //         setOptionalVaccine(mappedInjectionAlternativeVaccine);
          //         setBodyData(mappedGrowthNutrition);
          //         setHealthCheckUp(mappedHealthCheck);
          //         setEPI_program(mappedBasic_Vaccine);
          //     }
          // }
        

        } catch (error) {
          console.error('Error fetching Data:', error);
      }
  };
    fetchData();
  }, [selectedStudent]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //         const studentDataArray = await getStudentIdByParentEmail(login_Email);
  //         // console.log('Student data array:', studentDataArray);
        
  //         const formattedStudentData = studentDataArray.map(student => ({
  //             ...student,
  //             key: student.Student_ID, // ใช้ Student_ID เป็น key
  //             StudentID: student.Student_ID,
  //             nameTitle: student.NameTitle,
  //             Firstname: student.FirstName,
  //             Lastname: student.LastName
  //         }));
  //         setStudentData(formattedStudentData);
  //         // console.log('formattedStudentData:', formattedStudentData);
  //         // setSelectedStudent(formattedStudentData[0].StudentID);

  //         console.log("formattedStudentData[0].StudentID:", formattedStudentData[0].StudentID);
  //         setStudent_ID(formattedStudentData[0]);
  //         setSelectedStudent(`${Student_ID.StudentID} : ${Student_ID.nameTitle} ${Student_ID.Firstname} ${Student_ID.Lastname}`);

  //         if (selectedStudent){
  //           // แยกค่า StudentID โดยใช้ split เพื่อแยกสตริงด้วยช่องว่างและเลือกค่าตัวแรก
  //           const selectedStudent_ID = selectedStudent.split(' ')[0];
  //           // setSelectedStudent_ID(selectedStudent_ID);
            
  
  //           console.log("selectedStudent_ID:", selectedStudent_ID); // พิมพ์ค่า StudentID ที่ได้

  //           // const CongenitalDisease = await getCongenitalDiseaseInfo(selectedStudent_ID);
  //           // const mappedCongenitalDisease = CongenitalDisease.map(item => ({
  //           //     id: item.id,
  //           //     DateCheck: formatDateThaiYear(item.Date),
  //           //     congenital_disease: item.Congenital_Disease
  //           //   }));
              
  //           // const HistoryDisease = await getHistoryDiseaseInfo(selectedStudent_ID);
  //           // const mappedHistoryDisease = HistoryDisease.map(item => ({
  //           //     id: item.id,
  //           //     DateCheck: formatDateThaiYear(item.Date),
  //           //     Diseases: item.History_Disease
  //           //   }));
              
  //           // const allergic = await getAllergiesInfo(selectedStudent_ID);
  //           // const mappedAllergic = allergic.map(item => ({
  //           //     id: item.id,
  //           //     DateCheck: formatDateThaiYear(item.Date),
  //           //     allergic: item.Allergies
  //           //   }));

  //           // const accident = await getSurgeryAccidentInfo(selectedStudent_ID);
  //           // const mappedaccident = accident.map(item => ({
  //           //     id: item.id,
  //           //     DateCheck: formatDateThaiYear(item.Date),
  //           //     accident: item.Surgery_Accident
  //           //   }));
            
  //           // const InjectionAlternativeVaccine = await getInjectionAlternativeVaccineInfo(selectedStudent_ID);
  //           // const mappedInjectionAlternativeVaccine = InjectionAlternativeVaccine.map(item => ({
  //           //     id: item.Alternative_Vaccine_ID,
  //           //     Vaccine: item.Vaccine_name
  //           //   }));
            
  //           // const GrowthNutrition = await getGrowthNutritionInfo(selectedStudent_ID);
  //           // const mappedGrowthNutrition = GrowthNutrition.map(item => ({
  //           //     id: item.id,
  //           //     DateRecord: formatDateThaiYear(item.Health_Check_Date),
  //           //     weight_kg: item.Weight,
  //           //     height_cm: item.Height
  //           //   }));
  
  //           // const HealthCheck = await getHealthCheckInfo(selectedStudent_ID);
  //           // const mappedHealthCheck = HealthCheck.map(item => ({
  //           //     id: item.id,
  //           //     DateCheck: formatDateThaiYear(item.Date),
  //           //     Eyesight: item.Eye_examination,
  //           //     Hearing: item.Hearing,
  //           //     Mouth: item.Oral_health
  //           //   }));
  
  //           // const Basic_Vaccine  = await checkVaccine(selectedStudent_ID);
  //           // const mappedBasic_Vaccine  = Basic_Vaccine .map(item => ({
  //           //     id: item.Basic_Vaccine_ID,
  //           //     Vaccine: item.BasicVaccine_name,
  //           //     value: item.value
  //           //   }));
        
  //           // setcongenital_disease(mappedCongenitalDisease);
  //           // setDiseases(mappedHistoryDisease);
  //           // setallergic(mappedAllergic);
  //           // setaccident(mappedaccident);
  //           // setOptionalVaccine(mappedInjectionAlternativeVaccine);
  //           // setBodyData(mappedGrowthNutrition);
  //           // setHealthCheckUp(mappedHealthCheck);
  //           // setEPI_program(mappedBasic_Vaccine);
  //         }
  //       // else if {

  //       // }

  //       } catch (error) {
  //         console.error('Error fetching Data:', error);
  //     }
  // };
  //   fetchData();
  // }, [selectedStudent]);
  
  const [HealthSummary,setHealthSummary] = useState([
    {id:1,summary:"สุขภาพแข็งแรง"}
  ])
  const [BodyData,setBodyData] = useState([
    {id:1,DateRecord:"",weight_kg:"",height_cm:""}
    // {id:1,DateRecord:"12/05/2024",weight_kg:"50",height_cm:"160"}
  ])
  const [BMI,setBMI] = useState(null);

  const calculateBMI = () => {
    // Map the BodyData array to calculate BMI for each object
    const newBMI = BodyData.map((data, index) => {
      // Convert weight from pounds to kilograms
      const weightInKg = data.weight_kg;
      // Convert height from inches to meters
      const heightInM = data.height_cm / 100;
      // Calculate BMI
      const bmi = weightInKg / (heightInM * heightInM);
      return parseFloat(bmi.toFixed(2));
    });
  
    // Set the BMI state with the calculated BMI values
    setBMI(newBMI);
    console.log('newBMI',newBMI);
  };
  

  useEffect(() => {
  calculateBMI();
  }, [BodyData])

  
  const [HealthCheckUp,setHealthCheckUp] = useState([
    {id:1,DateCheck:"",Eyesight:"",Hearing:"",Mouth:""}
    // {id:1,DateCheck:"12/05/2024",Eyesight:"ปกติ",Hearing:"ปกติ",Mouth:"ปกติ"}
  ])

  //วัคซีนพื้นฐาน จำเป็น 8 ชนิด
  const [EPI_program,setEPI_program] = useState([
    // {id:1,Vaccine:"วัคซีนป้องกันวัณโรค (BCG Vaccine)",value:true},
    // {id:2,Vaccine:"วัคซีนตับอักเสบบี (Hepatitis B Vaccine : HBV)",value:true},
    // {id:3,Vaccine:"วัคซีนคอตีบ-บาดทะยัก-ไอกรน (Diphtheria, Tetanus, Pertussis : DPT)",value:true},
    // {id:4,Vaccine:"วัคซีนโปลิโอ (Polio)",value:true},
    // {id:5,Vaccine:"วัคซีนหัด-หัดเยอรมัน-คางทูม (Measles mumps rubella vaccine : MMR)",value:true},
    // {id:6,Vaccine:"วัคซีนไข้สมองอักเสบเจอี (Japanese encephalitis virus : JE)",value:true},
    // {id:7,Vaccine:"วัคซีนป้องกันไข้หวัดใหญ่ (Influenza Vaccine)",value:false},
    // {id:8,Vaccine:"วัคซีนเอชพีวี (HPV)",value:false},

  ])
  //วัคซีนทางเลือก ข้อมูลเพิ่มจะถือว่าฉีดแล้ว
  const [OptionalVaccine,setOptionalVaccine] = useState([
    // {id:1,Vaccine:"วัคซีนโรต้าไวรัส (Rotavirus)"},
    // {id:2,Vaccine:"วัคซีนไข้เลือดออก (Dengue Vaccine)"},
    // {id:3,Vaccine:"วัคซีนป้องกันโรคอีสุกอีใส  (Varicella vaccine)"},
  
  ])
// แสดง ui วัคซีนทางเลือก
  const [showOptionalVaccine,setshowOptionalVaccine] = useState(false);

  useEffect(() => {
    if (OptionalVaccine.length!==0) {
      setshowOptionalVaccine(true)
    }
  }, [OptionalVaccine])

  async function getCongenitalDiseaseInfo(studentId) {
    try {
        const response = await axios.get(`http://localhost:8080/get-congenital-disease-info/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching congenital disease information:', error);
        throw error;
    }
  }

  async function getHistoryDiseaseInfo(studentId) {
    try {
        const response = await axios.get(`http://localhost:8080/get-history-disease-info/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching congenital disease information:', error);
        throw error;
    }
  }

  async function getAllergiesInfo(studentId) {
    try {
        const response = await axios.get(`http://localhost:8080/get-allergies-info/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching allergies information:', error);
        throw error;
    }
  }

  async function getSurgeryAccidentInfo(studentId) {
    try {
        const response = await axios.get(`http://localhost:8080/get-surgery-accident-info/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching surgery_accident information:', error);
        throw error;
    }
  }

  async function getInjectionAlternativeVaccineInfo(studentId) {
    try {
        const response = await axios.get(`http://localhost:8080/get-injection-alternative-vaccine-info/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching injection_alternative_vaccine information:', error);
        throw error;
    }
  }

  async function getGrowthNutritionInfo(studentId) {
    try {
        const response = await axios.get(`http://localhost:8080/get-growth-nutrition-info/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching growth_nutrition information:', error);
        throw error;
    }
  }

  async function getHealthCheckInfo(studentId) {
    try {
        const response = await axios.get(`http://localhost:8080/get-health_check/${studentId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching health_check information:', error);
        throw error;
    }
  }

  async function checkVaccine(studentId) {
    try {
        // เรียกใช้ API ด้วย Axios
        const response = await axios.get(`http://localhost:8080/check-vaccine/${studentId}`);
        // return ข้อมูลที่ได้รับกลับมา
        return response.data;
    } catch (error) {
        // กรณีเกิด error ในการเรียก API
        console.error('Error checking vaccines:', error);
        throw error;
    }
}

    const [show, setShow] = useState(false);
 
    const handleToggle = () => {
      setShow(!show);
    };
  
  return (
        <>
      
      
      <Header header="ผลการตรวจสุขภาพของนักเรียน" subhead=""/>
      <br></br>
      <br></br>
    {/* <div class="container justify-content-center"> */}
    <div className="mt-2 d-flex flex-column"style={{ height: 'auto',fontFamily:'Kanit, sans-serif'}}>
        {/* <Tab_health/> */}
        <div className="container">
          <div className="d-flex"style={{ flexWrap: 'wrap', fontSize: '25px' ,padding: "10px"}}>
            <div className="d-flex align-items-center">
                <span style={{fontWeight:"bolder",marginRight:"10px"}}>
                  เลือกข้อมูลนักเรียน :
                </span>
            </div>

            <div className="dropdown" style={{ maxWidth: '100%' }}>
              <select value={selectedStudent} onChange={handleStudentChange} className="custom-select">
                {/* <option value="">เลือกข้อมูล</option> */}
                {StudentData.map((student, index) => (
                  <option key={index}>
                    {student.StudentID} : {student.nameTitle} {student.Firstname} {student.Lastname}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
        
          <div className="container d-flex align-items-center" style={{ flexWrap: "wrap"}}>
            <h2 className="card-heading" style={{ margin:"10px",fontSize: "25px", fontWeight: "bold" }}>
              Summary
            </h2>
          </div>
             
              <div className="row">
                    
                         {/* ------------------------------------------------------------------------------------------ */}
                  <div className="col">
                    
                   
                          <div className="card" style={{width:"auto",height:"auto",margin:"10px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)',
                                 
                                    
                                    }}>
                                        
                                        <div className="card-body" style={{ width: "auto", height: "auto",display:"flex",justifyContent:"center",flexWrap:"wrap" }}>
                                          { !isNaN(BMI) ? (
                                            <React.Fragment>
                                              {BMI >= 23 && BMI <= 24.99 ? (
                                                <>
                                                  <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap" }}>
                                                    <span style={{fontSize:"30px",fontWeight:"bold" }}>
                                                      BMI
                                                    </span>
                                                    <span className="text-warning" style={{fontSize:"54px",fontWeight:"bold",marginInline:"20px"  }}>{BMI}</span>
                                                    <span style={{fontSize:"22px"}}>
                                                      ท้วม / โรคอ้วนระดับ 1
                                                    </span>
                                                  </div>
                                                </>
                                              ) : BMI >= 25 && BMI <= 29.99 ? (
                                                <>
                                                  <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap" }}>
                                                    <span style={{fontSize:"30px",fontWeight:"bold" }}>
                                                      BMI
                                                    </span>
                                                    <span className="text-warning" style={{fontSize:"54px",fontWeight:"bold",marginInline:"20px"  }}>{BMI}</span>
                                                    <span style={{fontSize:"22px"}}>
                                                      อ้วน / โรคอ้วนระดับ 2
                                                    </span>
                                                  </div>
                                                </>
                                              ) : BMI >= 30 ? (
                                                <>
                                                  <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap" }}>
                                                    <span style={{fontSize:"30px",fontWeight:"bold" }}>
                                                      BMI
                                                    </span>
                                                    <span className="text-danger" style={{fontSize:"54px",fontWeight:"bold",marginInline:"20px" }}>{BMI}</span>
                                                    <span style={{fontSize:"22px"}}>
                                                      อ้วนมาก / โรคอ้วนระดับ 3
                                                    </span>
                                                  </div>
                                                </>
                                              ) : BMI >= 18.50 && BMI <= 22.99 ? (
                                                <>
                                                  <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap" }}>
                                                    <span style={{fontSize:"30px",fontWeight:"bold",color:"gray"}}>
                                                      BMI
                                                    </span>
                                                    <span className="text-success" style={{fontSize:"54px",fontWeight:"bold",marginInline:"20px"  }}>{BMI}</span>
                                                    <span style={{fontSize:"22px"}}>
                                                      ปกติ (สุขภาพดี)
                                                    </span>
                                                  </div> 
                                                </>
                                              ) : (
                                                <>
                                                  <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap" }}>
                                                    <span style={{fontSize:"30px",fontWeight:"bold" }}>
                                                      BMI
                                                    </span>
                                                    <span className="text-danger" style={{fontSize:"54px",fontWeight:"bold",marginInline:"20px"  }}>{BMI}</span>
                                                    <span style={{fontSize:"22px"}}>
                                                      น้ำหนักน้อย / ผอม
                                                    </span>
                                                  </div>
                                                </>
                                              )}
                                            </React.Fragment>
                                          ) : (
                                            <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap" }}>
                                              <span style={{fontSize:"30px",fontWeight:"bold" }}>
                                                BMI
                                              </span>
                                              {/* <span className="text-danger" style={{fontSize:"54px",fontWeight:"bold",marginInline:"28px"  }}>-</span> */}
                                              <span style={{fontSize:"22px", marginInline:"20px"}}>
                                                {/* ไม่สามารถคำนวณได้ */}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                        
                                      </div> 
                          
                          </div>
                        <div className="col"> 
                        <div className="row"> 

                          <div className="col">
                                    <div className="card" style={{width: "auto",height:"auto",margin:"10px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)',
                                  backgroundColor: "#0c6668",
                                  }}>
                                       
                                    <div className="card-body" style={{ width: "auto", height: "auto", display: "flex", alignItems: "center", justifyContent: "center", 
                                    flexDirection: "column" ,
                                    
                                    }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{fontSize:"20px",color: "white",fontWeight:"bold" }}>
                                           ส่วนสูง
                                          </span>
                                          <span style={{marginInline:"20px",fontSize:"50px",color: "white",fontWeight:"bold" }}>
                                            {BodyData[0].height_cm}
                                          </span>
                                          <span style={{fontSize:"20px",color: "white",fontWeight:"bold" }}> cm.</span>
                                        </div>
                                        
                                      </div>
                                      </div> 
                          </div>
                          <div className="col">
                                    <div className="card" style={{width: "auto",height:"auto",margin:"10px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)',
                                    backgroundColor: "#119396",
                                  }}
                                    >
                                
                                    <div className="card-body" style={{ width: "auto", height: "auto", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

                                          <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <span style={{fontSize:"20px",color: "white",fontWeight:"bold" }}>
                                           น้ำหนัก
                                          </span>
                                          <span style={{marginInline:"20px",fontSize:"50px",color: "white",fontWeight:"bold" }}>
                                            {BodyData[0].weight_kg}
                                          </span>
                                          <span style={{fontSize:"20px",color: "white",fontWeight:"bold" }}> kg.</span>
                                        </div>
                                          </div>
                                     
                                      </div> 
                          </div>
                          </div>
                          </div>
                
                </div>
                
            {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
           

              <br />
              <div className="row">
              {/* <div className="card" style={{width:"auto",height:"auto",margin:"10px",border:"none"}}> */}
                    <div className="col">
                            <div className="container d-flex align-items-center" style={{ flexWrap: "wrap"}}>
                              <span className="card-heading" style={{ margin:"10px",fontSize: "25px", fontWeight: "bold" }}>
                              การตรวจสุขภาพตา หูและช่องปาก
                              </span>
                              <span style={{ fontSize: "25px", fontWeight: "bold",color:"#A0A0A0"}}>
                             (Latest)
                              </span>
                              </div>
                              <div className="row">
                              
                              <div className="col">
                                      <div className="card" style={{width:"auto",height:"auto",margin:"5px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'
                                    ,backgroundColor: "#16348C",}}>
                                        
                                        <div className="card-body">
                                            <div className="col">
                                                
                                                  <span style={{fontSize:"20px",color: "white",fontWeight:"bold" }}>
                                                   การตรวจสายตา
                                                </span>
                                                <br />
                                                <span style={{fontSize:"14px",color: "#E5E4E2" }}>
                                                {HealthCheckUp[0].DateCheck}
                                                </span>

                                                  </div> 
                                                 
                                                  <br />
                                                  <div className="col">
                                                    <div className="text-center">
                                                  <span style={{fontSize:"44px",color: "white",fontWeight:"bold" }}>
                                                      {HealthCheckUp[0].Eyesight}
                                                </span>
                                                </div>
                                                  </div>    
                                          
                                        </div>   
                                        
                                        </div>
                              </div>
                              <div className="col">

                                        <div className="card" style={{width:"auto",height:"auto",margin:"5px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'
                                    ,backgroundColor: "#1F48C3",}}>
                                        
                                        <div className="card-body">
                                           
                                                  <div className="col">
                                                  <span style={{fontSize:"20px",color: "white",fontWeight:"bold" }}>
                                                  การได้ยิน
                                                </span>
                                                <br />
                                                <span style={{fontSize:"14px",color: "#E5E4E2" }}>
                                                {HealthCheckUp[0].DateCheck}
                                                </span>

                                                  </div>  
                                                  <br />
                                                  <div className="col">
                                                    <div className="text-center">
                                                  <span style={{fontSize:"44px",color: "white",fontWeight:"bold" }}>
                                                      {HealthCheckUp[0].Hearing}
                                                </span>
                                                </div>
                                                  </div>   
                                           
                                        </div>   
                                        
                                        </div>
                                        </div>
                                        <div className="col">

                                        <div className="card" style={{width:"auto",height:"auto",margin:"5px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'
                                    ,backgroundColor: "#4169E1",}}>
                                       <div className="card-body">
                                         
                                                  <div className="col">
                                                  <span style={{fontSize:"20px",color: "white",fontWeight:"bold" }}>
                                                  สุขภาพช่องปาก
                                                </span>
                                                <br />
                                                <span style={{fontSize:"14px",color: "#E5E4E2" }}>
                                                {HealthCheckUp[0].DateCheck}
                                                </span>

                                                  </div> 
                                                  <br />
                                                  <div className="col">
                                                    <div className="text-center">
                                                  <span style={{fontSize:"44px",color: "white",fontWeight:"bold" }}>
                                                      {HealthCheckUp[0].Mouth}
                                                </span>
                                                </div>
                                                  </div>   
                                           
                                        </div> 
                                        </div> 

                                        </div> 

                         </div>

                         </div>
                         </div>

                        {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                        <br />
                  <div className="row">
                 
                  <div className="container d-flex align-items-center" style={{ flexWrap: "wrap"}}>
                      <h2 className="card-heading" style={{ margin:"10px",fontSize: "25px", fontWeight: "bold" }}>
                      ประวัติการเจ็บป่วย
                      </h2></div>
                      
                       
                      <div className="row">
                           
                      
                            <div className="col">   
                           
                                    <div className="card" style={{width:"auto",height:"auto",margin:"5px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'}}>
                                    {/* <div className="card-header"
                                          style={{
                                            width:"auto",
                                            height:"auto",
                                            fontSize:"20px",fontWeight:"bold",
                                            // backgroundColor: "#1577A5",
                                            backgroundColor: "#black",
                                            color:"white"
                                            }} > */}
                                            <div className="card-header"
                                          style={{
                                            width:"auto",
                                            height:"auto",
                                            fontSize:"20px",fontWeight:"bold",
                                            // backgroundColor: "#1C9FDD",
                                            backgroundColor: "black",
                                            

                                            color:"white"
                                            }} >
                                       
                                              โรคประจำตัว

                                        </div> 
                                        {congenital_disease.length === 0 ? (
                                          <div className="card-body"style={{width:"auto",height:"auto"}} >
                                          <div className="text-center">
                                                  <span style={{fontSize:"18px",color: "#A0A0A0",fontWeight:"bold" }}>
                                                      ไม่มี
                                                </span>
                                                </div>
                                          </div>
                                        ) : (
                                        <div className="card-body" style={{width: "auto", height: "auto"}}>
                                          {congenital_disease.map((item, index) => (
                                            <div key={index}>
                                              <i className="bi bi-arrow-right"></i> 
                                              <span style={{fontSize:"18px",fontWeight:"bold",marginLeft:"10px"}}>
                                  
                                              {item.congenital_disease}</span>
                                            </div>
                                          ))}
                                        </div>
                                            )
                                            }
                                      </div> 
                                      </div> 

                                      <div className="col">   
                                    <div className="card" style={{width:"auto",height:"auto",margin:"5px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'}}>
                                    <div className="card-header"
                                          style={{
                                            width:"auto",
                                            height:"auto",
                                            fontSize:"20px",fontWeight:"bold",
                                            // backgroundColor: "#1C9FDD",
                                            backgroundColor: "black",
                                            

                                            color:"white"
                                            }} >
                                        โรคที่เคยเป็น
                                        </div> 
                                        {Diseases.length === 0 ? (
                                          <div className="card-body"style={{width:"auto",height:"auto"}} >
                                          <div className="text-center">
                                                  <span style={{fontSize:"18px",color: "#A0A0A0",fontWeight:"bold" }}>
                                                      ไม่มี
                                                </span>
                                                </div>
                                          </div>
                                        ) : (
                                        <div className="card-body"style={{width:"auto",height:"auto"}} >
                                          {Diseases.map((item, index) => (

                                              <div key={index}>  
                                              <i className="bi bi-arrow-right"></i> 
                                                <span style={{fontSize:"18px",fontWeight:"bold",marginLeft:"10px"}}>
                                              {item.Diseases}</span> 
                                              </div>
                                            ))}
                                          </div>
                                        )
                                      }
                                        
                                        </div> 
                                      </div> 
                                     

                                      <div className="col">   
                                    <div className="card" style={{width:"auto",height:"auto",margin:"5px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'}}>
                                    <div className="card-header"
                                          style={{
                                            width:"auto",
                                            height:"auto",
                                            fontSize:"20px",fontWeight:"bold",
                                            // backgroundColor: "#50B8E9",
                                            backgroundColor: "black",

                                            color:"white"
                                            }} >
                                        อาหาร/ยา/สารที่แพ้
                                        </div> 
                                        {allergic.length === 0 ? (
                                          <div className="card-body"style={{width:"auto",height:"auto"}} >
                                          <div className="text-center">
                                                  <span style={{fontSize:"18px",color: "#A0A0A0",fontWeight:"bold" }}>
                                                      ไม่มี
                                                </span>
                                                </div>
                                          </div>
                                        ) : (
                                        <div className="card-body"style={{width:"auto",height:"auto"}} >
                                        {allergic.map((item, index) => (
                                            <div key={index}>
                                              <i className="bi bi-arrow-right"></i> 
                                              <span style={{fontSize:"18px",fontWeight:"bold",marginLeft:"10px"}}>
                                              {item.allergic}</span>
                                            </div>
                                          ))}
                                        </div>

                                          )
                                          }

                                      </div> 
                                      </div>


                                      <div className="col">   
                                    <div className="card" style={{width:"auto",height:"auto",margin:"5px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'}}>
                                    <div className="card-header"
                                          style={{
                                            width:"auto",
                                            height:"auto",
                                            fontSize:"20px",fontWeight:"bold",
                                            // backgroundColor: "#89CFF0",
                                            backgroundColor: "black",

                                            color:"white"
                                            }} >
                                        การผ่าตัด/อุบัติเหตุร้ายแรง
                                        </div> 
                                        {accident.length === 0 ? (
                                          <div className="card-body"style={{width:"auto",height:"auto"}} >
                                          <div className="text-center">
                                                  <span style={{fontSize:"18px",color: "#A0A0A0",fontWeight:"bold" }}>
                                                      ไม่มี
                                                </span>
                                                </div>
                                          </div>
                                        ) : (
                                        <div className="card-body"style={{width:"auto",height:"auto"}} >
                                        {accident.map((item, index) => (
                                            <div key={index}>
                                              <i className="bi bi-arrow-right"></i> 
                                              <span style={{fontSize:"18px",fontWeight:"bold",marginLeft:"10px"}}>
                                              {item.accident}</span>
                                            </div>
                                          ))}
                                        </div> 
                                         )
                                        }
                                      </div> 
                                      </div>
                                      
                        </div>
                  

                    </div>    
                   
                        
                

                {/* ----------------------------------------------------------------------------------------------------------------------- */}
                <br />
                <div className="row">
                    
                    <div className="col">
                            <div className="container d-flex align-items-center" style={{ flexWrap: "wrap"}}>
                              <h2 className="card-heading" style={{ margin:"10px",fontSize: "25px", fontWeight: "bold" }}>
                              การให้ภูมิคุ้มกัน
                              </h2>
                              </div>
                                      <div className="card" style={{width:"auto",height:"auto",margin:"10px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'}}>
                                          <div className="card-body"style={{
                                            width:"auto",
                                            height:"auto",
                                            }} >
                                         <span style={{
                                            fontSize:"22px",fontWeight:"bold",
                                            // backgroundColor: "#6B2213",
                                            // color:"white"
                                            }}>วัคซีนพื้นฐาน</span>
                                            <br /><br />
                                          <span style={{
                                            fontSize:"18px",fontWeight:"bold",
                                            // backgroundColor: "#6B2213",
                                            color:"green"
                                            }}> สีเขียว</span> <span style={{fontSize:"16px"}}> : ได้รับวัคซีนนี้แล้ว</span>
                                          
                                          <span style={{
                                            fontSize:"18px",fontWeight:"bold",
                                            // backgroundColor: "#6B2213",
                                            color:"red"
                                            }}> สีแดง</span> <span style={{fontSize:"16px"}}> : ยังไม่ได้รับวัคซีน</span>

                                            </div> 
                                     
                                        <div className="card-body">
                                          <div className="row">
                                          {EPI_program.map((item, index) => (
                                              <div
                                                key={index}
                                                className="card"
                                                style={{
                                                  width: "11rem",
                                                  height: "10rem",
                                                  margin: "10px",
                                                  boxShadow: "1px 2px 12px 4px rgba(0, 0, 0, 0.2)",
                                                  backgroundColor: item.value ? "#00C000" : "#FF1709",
                                                  color: "white",
                                                }}
                                              >
                                                <div className="card-body" style={{ fontSize:"16px",fontWeight:"bold",width: "10rem", height: "10rem" }}>
                                                  {item.Vaccine}
                                                </div>
                                              </div>
                                            ))}

                                          </div>
                            
                                        </div> 
                                        
                                        
                                        </div>
                                        {showOptionalVaccine && (
                                        <div className="card" style={{width:"auto",height:"auto",margin:"10px",marginTop:"50px",boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)'}}>
                                        <div className="card-body"
                                          style={{
                                            width:"auto",
                                            height:"auto",
                                            fontSize:"22px",fontWeight:"bold",
                                            // backgroundColor: "#008080", 
                                            // backgroundColor: "#A1331C", 

                                            // color:"white"
                                            }} >
                                          วัคซีนทางเลือก
                                        </div> 
                                        <div className="card-body">
                                          <div className="row">
                                          {OptionalVaccine.map((item, index) => (
                                              <div
                                                key={index}
                                                className="card"
                                                style={{
                                                  width: "11rem",
                                                  height: "10rem",
                                                  margin: "10px",
                                                  boxShadow: "1px 2px 12px 4px rgba(0, 0, 0, 0.2)",
                                                  backgroundColor: "#00C000",
                                                  color: "white",
                                                }}
                                              >
                                                <div className="card-body" style={{ fontSize:"16px",fontWeight:"bold",width: "10rem", height: "10rem" }}>
                                                  {item.Vaccine}
                                                </div>
                                              </div>
                                            ))}

                                          </div>
                            
                                        </div> 
                                        
                                        
                                        </div>
                                        )}
                                      

                         </div>
                  
                            

                        
                </div>
              </div>
            </div> 
            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height: '50vh'}}>
            </div>
      </>
      ) 
}

export default Check_health_result