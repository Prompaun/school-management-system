import React,{useState,useEffect} from 'react';
import { Link, useLocation  } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";
import printer_icon from "../images/printer_icon.png";
import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar'
import Header from '../components/Header';
import Tab_health from '../components/Tab_health';
import axios from 'axios';
const Health_info = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        color: 'white',
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const location = useLocation();
    //   console.log("Student_ID:", location);
    const SearchParams = new URLSearchParams(location.search);
    const studentID_param = SearchParams.get("id");
    // console.log(studentID_param);

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
      {
        // id:1,
        // DateCheck:"12/05/2024",
        // Diseases:"โรคอีสุกอีใส"
    }
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
    
    
    const [HealthSummary,setHealthSummary] = useState([
      {id:1,summary:"สุขภาพแข็งแรง"}
    ])
    //ยังไม่มีเงื่อนไขเช็คถ้าไม่เจอค่า
    const [BodyData,setBodyData] = useState([
      // {id:1,DateRecord:"12/05/2024",weight_kg:"50",height_cm:"160"}
      {id:1,DateRecord:"",weight_kg:"",height_cm:""}
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
    };
    
  
    useEffect(() => {
    calculateBMI();
    }, [BodyData])
  
    //ยังไม่มีเงื่อนไขเช็คถ้าไม่เจอค่า
    const [HealthCheckUp,setHealthCheckUp] = useState([
      {id:1,DateCheck:"12/05/2024",Eyesight:"ปกติ",Hearing:"ปกติ",Mouth:"ปกติ"}
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

    useEffect(() => {
      const fetchData = async () => {
          try {
            const CongenitalDisease = await getCongenitalDiseaseInfo(studentID_param);
            const mappedCongenitalDisease = CongenitalDisease.map(item => ({
                id: item.id,
                DateCheck: formatDateThaiYear(item.Date),
                congenital_disease: item.Congenital_Disease
              }));
              
          // } catch (error) {
          //   console.log('Error fetching Congenital Disease:', error);
          // }

          // try {
            const HistoryDisease = await getHistoryDiseaseInfo(studentID_param);
            const mappedHistoryDisease = HistoryDisease.map(item => ({
                id: item.id,
                DateCheck: formatDateThaiYear(item.Date),
                Diseases: item.History_Disease
              }));
              
          // } catch (error) {
          //   console.log('Error fetching History Disease:', error);
          // }

          // try {
            const allergic = await getAllergiesInfo(studentID_param);
            const mappedAllergic = allergic.map(item => ({
                id: item.id,
                DateCheck: formatDateThaiYear(item.Date),
                allergic: item.Allergies
              }));
              
          // } catch (error) {
          //   console.log('Error fetching allergic:', error);
          // }

          // try {
            const accident = await getSurgeryAccidentInfo(studentID_param);
            const mappedaccident = accident.map(item => ({
                id: item.id,
                DateCheck: formatDateThaiYear(item.Date),
                accident: item.Surgery_Accident
              }));
            
            const InjectionAlternativeVaccine = await getInjectionAlternativeVaccineInfo(studentID_param);
            const mappedInjectionAlternativeVaccine = InjectionAlternativeVaccine.map(item => ({
                id: item.Alternative_Vaccine_ID,
                Vaccine: item.Vaccine_name
              }));
            
            const GrowthNutrition = await getGrowthNutritionInfo(studentID_param);
            const mappedGrowthNutrition = GrowthNutrition.map(item => ({
                id: item.id,
                DateRecord: formatDateThaiYear(item.Health_Check_Date),
                weight_kg: item.Weight,
                height_cm: item.Height
              }));

            const HealthCheck = await getHealthCheckInfo(studentID_param);
            const mappedHealthCheck = HealthCheck.map(item => ({
                id: item.id,
                DateCheck: formatDateThaiYear(item.Date),
                Eyesight: item.Eye_examination,
                Hearing: item.Hearing,
                Mouth: item.Oral_health
              }));

            const Basic_Vaccine  = await checkVaccine(studentID_param);
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
          } catch (error) {
            console.log('Error fetching data:', error);
          }

      };
      fetchData();
    }, []);

    return (
        <>
          

            <Header header="ระบบจัดการข้อมูลสุขภาพ" subhead="" />  
             
            <div className="container"style={{fontFamily:'Kanit, sans-serif'}}> 
            <div className="flex-column"> 
                <div className="justify-content-center"> 
           
                <div className="container d-flex align-items-center"style={{ flexWrap: 'wrap',marginTop:"20px"  }}>
                        <div className="d-flex align-items-center">
                            <h2 className="card-heading" style={{ fontSize: '25px', fontWeight: 'bold',padding:"10px"}}>ผลการค้นหา</h2>
                        </div>
                        
                        <div className="d-flex align-items-center">
                            <Link to="/Filter_student_information">
                                <button type="submit" class="btn btn-primary" style={{ ...fontStyle, color: 'white', textAlign: 'center',padding:"10px"}}><span>ค้นหาข้อมูลใหม่</span></button>
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
                                    {/* <div className='container d-flex justify-content-end'>
                                                <span
                                                className="btn btn-link float-end"
                                                style={{ color: 'black', textDecoration: 'none', fontFamily: 'Kanit, sans-serif', cursor: 'pointer'}}
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
                                                    style={{ width: '25px', height: '25px', cursor: 'pointer',marginTop:"5px" }}
                                                    // onClick={() => {
                                                    //     const fileUrl = "src/assets/พิมพ์ใบสมัครป.1.pdf";
                                                    //     const printWindow = window.open(fileUrl, "_blank", 'width=1000,height=800');
                                                    //     printWindow.print();
                                                    // }}
                                                />
                                            </div> */}
          
            </div>
            
            {/* <Tab_health/>    */}
            <div className="container">
        
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
                                        
                                        <div className="card-body" style={{ width: "auto", height: "auto",display:"flex",justifyContent:"center",flexWrap:"wrap"
                                    
                                    }}>
                                        {/* <p>BMI: {BMI}</p><br /> */}
                                      

                                        <React.Fragment >
                                          {BMI >= 23 && BMI <= 24.99 ? (
                                           <>
                                           <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap"  }}>
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
                                      
                                           <div style={{ display: 'flex', alignItems: 'center',flexWrap:"wrap"  }}>
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
                                    
                              
                              
                                <br />
                                {/* <Link to="/Student_List_Information"> */}
                                    {/* <button type="submit" class="btn btn-primary float-end" style={{ ...fontStyle, fontSize: '16px', textAlign: 'right'}}><span>ย้อนกลับ</span></button> */}
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
                                {/* </Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif',height: '20vh'}}>
            </div>
        </>
    );
};

export default Health_info;
