import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeftRight,BsFillTrashFill } from "react-icons/bs";
import { Button, Modal,Spinner } from 'react-bootstrap';
import axios from 'axios';

function ModalEditVaccine({show, setShow, Student_id, Optional_Vaccine}) {

    const [Click, setClick] = useState (false);
    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

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

    async function checkVaccine(studentId) {
        try {
            // เรียกใช้ API ด้วย Axios
            const response = await axios.get(`http://localhost:8080/check-vaccine/${studentId}`);
            // return ข้อมูลที่ได้รับกลับมา
            return response.data;
        } catch (error) {
            // กรณีเกิด error ในการเรียก API
            console.log('Error checking vaccines:', error);
            throw error;
        }
    }

    const getVaccineIdFromId = (id, epiProgram) => {
        // const epiProgram = [
        //     { id: 3, Vaccine_ID: 76, Vaccine: 'วัคซีนคอตีบ-บาดทะยัก-ไอกรน (Diphtheria, Tetanus, Pertussis : DPT)', value: 1 },
        //     { id: 2, Vaccine_ID: 77, Vaccine: 'วัคซีนตับอักเสบบี (Hepatitis B Vaccine : HBV)', value: 1 },
        //     { id: 1, Vaccine_ID: 78, Vaccine: 'วัคซีนป้องกันวัณโรค (BCG Vaccine)', value: 1 },
        //     { id: 7, Vaccine_ID: 79, Vaccine: 'วัคซีนป้องกันไข้หวัดใหญ่ (Influenza Vaccine)', value: 1 },
        //     { id: 5, Vaccine_ID: 80, Vaccine: 'วัคซีนหัด-หัดเยอรมัน-คางทูม (Measles mumps rubella vaccine : MMR)', value: 1 },
        //     { id: 8, Vaccine_ID: 81, Vaccine: 'วัคซีนเอชพีวี (HPV)', value: 1 },
        //     { id: 4, Vaccine_ID: 82, Vaccine: 'วัคซีนโปลิโอ (Polio)', value: 1 },
        //     { id: 6, Vaccine_ID: 83, Vaccine: 'วัคซีนไข้สมองอักเสบเจอี (Japanese encephalitis virus : JE)', value: 1 }
        // ];
    
        const epiData = epiProgram.find(item => item.id === id);
        if (epiData) {
            const { Vaccine_ID } = epiData;
            return Vaccine_ID;
        }
        return null; // หากไม่พบ ID ที่ตรงกัน
    };

    const addInjectionBasicVaccine = async (basicVaccineId, studentId, vaccinatedDate, sideEffects, note) => {
        try {
            const response = await axios.post('http://localhost:8080/add-injection-basic-vaccine', {
                Basic_Vaccine_ID: basicVaccineId,
                Student_ID: studentId,
                Vaccinated_Date: vaccinatedDate,
                Side_Effects: sideEffects,
                Note: note
            });
            console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
            return response.data; // ส่งข้อมูลที่ได้รับกลับ
        } catch (error) {
            console.log('Error adding injection basic vaccine information:', error);
            throw error; // ส่ง error กลับเพื่อให้ UI จัดการต่อ
        }
    };

    const deleteInjectionBasicVaccine = async (vaccineId) => {
        try {
            const response = await axios.delete(`http://localhost:8080/delete-injection-basic-vaccine/${vaccineId}`);
            console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
            return response.data; // ส่งข้อมูลที่ได้รับกลับ
        } catch (error) {
            console.log('Error deleting injection basic vaccine information:', error);
            throw error; // ส่ง error กลับเพื่อให้ UI จัดการต่อ
        }
    };

    // useEffect(() => {
    //     setEPI_program(EPIProgram);
    //     console.log(EPIProgram,'EPIProgram');
    //   }, []);
    const addAlternativeVaccine = async (studentId, vaccineName, vaccinatedDate, sideEffects, note) => {
        try {
            const response = await axios.post('http://localhost:8080/add-injection-alternative-vaccine', {
                Student_ID: studentId,
                Vaccine_name: vaccineName,
                Vaccinated_Date: vaccinatedDate,
                Side_Effects: sideEffects,
                Note: note
            });
            console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
            return response.data; // ส่งข้อมูลที่ได้รับกลับ
        } catch (error) {
            console.log('Error adding injection alternative vaccine information:', error);
            throw error; // ส่ง error กลับเพื่อให้ UI จัดการต่อ
        }
    };

    const deleteInjectionAlternativeVaccine = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/delete-injection-alternative-vaccine/${id}`);
            console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
            return response.data; // ส่งข้อมูลที่ได้รับกลับ
        } catch (error) {
            console.log('Error deleting injection alternative vaccine information:', error);
            throw error; // ส่ง error กลับเพื่อให้ UI จัดการต่อ
        }
    };


    
    
    
    const handleSaveButton = () => {
    //    if (CheckInput()){
        setShowLoadingModal(true)
        if(OptionalVac.length >= 1){
            // setShowLoadingModal(true)
            console.log("OptionalVac",OptionalVac[0].name)
            OptionalVac.forEach(async (item) => {
                addAlternativeVaccine(Student_id, item.name, formatDate(new Date()), 'ไม่มี', 'ยังไม่มีข้อความ')
                .then((data) => {
                    console.log('Injection alternative vaccine information added successfully:', data);
                    // ทำสิ่งที่ต้องการหลังจากเพิ่มข้อมูลสำเร็จ
                })
                .catch((error) => {
                    console.error('Failed to add injection alternative vaccine information:', error);
                    // ทำสิ่งที่ต้องการหลังจากการเพิ่มข้อมูลล้มเหลว
                });
            });
            // setShowLoadingModal(false)
            // setShowSuccessModal(true)
        }
        

        setShowLoadingModal(false)
        setShowSuccessModal(true)
        
    //    }
      
    }

    
    //วัคซีนพื้นฐาน จำเป็น 8 ชนิด
    const [EPI_program,setEPI_program] = useState([
        // {id:1,Vaccine:"วัคซีนป้องกันวัณโรค (BCG Vaccine)",value:false},
        // {id:2,Vaccine:"วัคซีนตับอักเสบบี (Hepatitis B Vaccine : HBV)",value:false},
        // {id:3,Vaccine:"วัคซีนคอตีบ-บาดทะยัก-ไอกรน (Diphtheria, Tetanus, Pertussis : DPT)",value:false},
        // {id:4,Vaccine:"วัคซีนโปลิโอ (Polio)",value:false},
        // {id:5,Vaccine:"วัคซีนหัด-หัดเยอรมัน-คางทูม (Measles mumps rubella vaccine : MMR)",value:false},
        // {id:6,Vaccine:"วัคซีนไข้สมองอักเสบเจอี (Japanese encephalitis virus : JE)",value:false},
        // {id:7,Vaccine:"วัคซีนป้องกันไข้หวัดใหญ่ (Influenza Vaccine)",value:false},
        // {id:8,Vaccine:"วัคซีนเอชพีวี (HPV)",value:false},

    ])

    const handleVaccineClick = (id) => {
        setClick(true);
        setEPI_program(
          EPI_program.map((row) => {
            if (row.id === id) {
                console.log("row.value",!row.value, id, EPI_program)
                const vaccineId = getVaccineIdFromId(id, EPI_program);
                console.log("vaccineId",vaccineId, id,)
                if(!row.value){
                    addInjectionBasicVaccine(id, Student_id, formatDate(new Date()), 'ไม่มี', 'ยังไม่มีข้อความ')
                        .then((data) => {
                            console.log('Injection basic vaccine information added successfully:', data);
                        })
                        .catch((error) => {
                            console.log('Failed to add injection basic vaccine information:', error, id);
                        });
                }
                else{
                    deleteInjectionBasicVaccine(vaccineId)
                                .then((data) => {
                                    console.log('Injection basic vaccine information deleted successfully:', data);
                                })
                                .catch((error) => {
                                    console.log('Failed to delete injection basic vaccine information:', error, id);
                                });
                }
                // const fetchEditVaccine = async () => {
                //     try {          
                //           const Basic_Vaccine  = await checkVaccine(Student_id);
                //           console.log('Basic_Vaccine:', Basic_Vaccine);
                //           const mappedBasic_Vaccine  = Basic_Vaccine .map(item => ({
                //               // id: item.Basic_Vaccine_ID,
                //               id: item.Basic_Vaccine_ID,
                //               Vaccine_ID: item.Vaccine_ID,
                //               Vaccine: item.BasicVaccine_name,
                //               value: item.value
                //             }));
                            
                //           setEPI_program(mappedBasic_Vaccine);
                //         console.log('mappedBasic_Vaccine:', mappedBasic_Vaccine);
                        
                        
                //     } catch (error) {
                //       console.log('Error fetching data:', error);
                //     }
                // };
                // fetchEditVaccine();
                

                return {...row, value:!row.value };
            }
            // console.log("row.value",!row.value)
            return row;
          })
        );
     }
     useEffect(() => {
        setOptionalVaccine(Optional_Vaccine);
        // console.log(congenital_disease,'congenitalDisease',congenitalDisease);
      }, []);

     useEffect(() => {
        // if (ShowEditVaccine === false){
            const fetchEditVaccine = async () => {
              try {          
                    const Basic_Vaccine  = await checkVaccine(Student_id);
                    console.log('Basic_Vaccine:', Basic_Vaccine);
                    const mappedBasic_Vaccine  = Basic_Vaccine .map(item => ({
                        // id: item.Basic_Vaccine_ID,
                        id: item.Basic_Vaccine_ID,
                        Vaccine_ID: item.Vaccine_ID,
                        Vaccine: item.BasicVaccine_name,
                        value: item.value
                      }));
                      
                    setEPI_program(mappedBasic_Vaccine);
                      console.log('mappedBasic_Vaccine:', mappedBasic_Vaccine);
              } catch (error) {
                console.log('Error fetching data:', error);
              }
          };
          fetchEditVaccine();
          setClick(false);
        // }
        
      }, [Click]);
    //วัคซีนทางเลือก ข้อมูลเพิ่มจะถือว่าฉีดแล้ว
    const [OptionalVaccine,setOptionalVaccine] = useState([
        // {id:1,Vaccine:"วัคซีนโรต้าไวรัส (Rotavirus)"},
        // {id:2,Vaccine:"วัคซีนไข้เลือดออก (Dengue Vaccine)"},
        // {id:3,Vaccine:"วัคซีนป้องกันโรคอีสุกอีใส  (Varicella vaccine)"},
    ])

    const handleDeleteRow = (id) => {
        console.log("row.id",id)
        setOptionalVaccine(OptionalVaccine.filter((row) => row.id!== id));
        deleteInjectionAlternativeVaccine(id)
            .then((data) => {
                console.log('Injection alternative vaccine information deleted successfully:', data);
                // ทำสิ่งที่ต้องการหลังจากลบข้อมูลสำเร็จ
            })
            .catch((error) => {
                console.log('Failed to delete injection alternative vaccine information:', error);
                // ทำสิ่งที่ต้องการหลังจากการลบข้อมูลล้มเหลว
            });
      };
    
    // const CheckInput = () => {
    //     if (Weight < 0 || Height < 0) {
    //         alert("กรุณากรอกเฉพาะค่าที่ไม่ติดลบ")
    //         return false;
    //     }
    //     if (Weight === "" || Height === "") {
    //         alert("กรุณากรอกค่าให้ครบถ้วน")
    //         return false;
    //     }

    //     return true;
    //  }
    let nextId = 0;
    const [AddOptionalVac, setAddOptionalVac] = useState('');
    const [OptionalVac, setOptionalVac] = useState([]);

    const handleOptionalVac = () => {
        if (AddOptionalVac.trim().length > 0) {
            if (OptionalVac.length>0){
                const lastId = OptionalVac.length > 0? OptionalVac[OptionalVac.length - 1].id : null;
                setOptionalVac([
                ...OptionalVac,
                { id: lastId+1, name: AddOptionalVac }
                ]);
        }
        else {
            setOptionalVac([
                ...OptionalVac,
                { id: nextId, name: AddOptionalVac }
                ]);
        }
           
            setAddOptionalVac('');
        }
    };

    const [showConfirmModal, setshowConfirmModal] = useState(false);

    const [showLoadingModal, setShowLoadingModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const handleCloseModal = () => {
        setshowConfirmModal(false);
        }

    const handleCloseSuccess = () => {
        setShowSuccessModal(false);
        };

    const handleClick = () => {
        handleCloseSuccess();
        setShow(false);
        };

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
                  
                
                  <p className="mt-3"style={{ fontSize: '22px' }}>ต้องการที่จะบันทึกข้อมูลใช่หรือไม่</p>
             
                  <Button
                    variant="sm"
                    style={{ fontSize: "20px" }}
                    className="btn-success btn-same-size"
                    onClick={() => {
                      handleSaveButton();
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
            <Modal
            show={showSuccessModal}
            onHide={handleCloseSuccess}
            backdrop="static"
            keyboard={false}
            size="sm"
            centered
            style={{ fontFamily: 'Kanit, sans-serif' }}
        >
            <Modal.Body className="text-center p-lg-4">
          <h4 className="text-success mt-3" style={{ fontSize: '30px'}}>
              COMPLETE
          </h4>
          {/* ระบบได้รับข้อมูลการสมัครของท่านแล้ว */}
          <p className="mt-3"style={{ fontSize: '22px' }}>ระบบได้บันทึกข้อมูลแล้ว</p>
         
          <Button variant="sm"style={{ fontSize: '20px' }} className="btn-success btn-same-size" onClick={handleClick}>
          OK
          </Button>
      </Modal.Body>
      </Modal>
        )} 
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
        style={{ fontFamily: 'Kanit, sans-serif' }}
    >
      <Modal.Header>
      <h5 className="modal-title">การให้ภูมิคุ้มกัน</h5>
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
                        <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>วัคซีนพื้นฐาน :  </span>
                                </label>
                            </div>
                            <br />
                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                                    <th rowSpan="1">ชื่อวัคซีน</th>
                                    <th rowSpan="1">สถานะ</th>
                                    <th rowSpan="1">แก้ไขสถานะ</th>
                                </tr>
                                </thead>

                                <tbody>
                                {EPI_program.map((row,index) => (
                                    <tr key={row.id} style={{ height: "50px" }}>
                                    <td className="text-start">{index+1}. {row.Vaccine}</td>
                                    {/* <td className={row.value ? "text-success" : "text-danger"}>
                                    {row.value ? "ได้รับวัคซีนแล้ว" : "ยังไม่ได้รับวัคซีน"}
                                    </td> */}
                                    <td style={{ color: row.value ? "green" : "red" }}>
                                        {row.value ? "ได้รับวัคซีนแล้ว" : "ยังไม่ได้รับวัคซีน"}
                                    </td>
                                    <td>
                                        <span
                                        className="actions"
                                        style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                                        onClick={() => handleVaccineClick(row.id)}
                                        >
                                         <BsArrowLeftRight />
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
                        <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>วัคซีนทางเลือก :  </span>
                                </label>
                            </div>
                        {OptionalVaccine.length===0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        
                                    <span style={{ color: 'gray', textAlign: 'center' }}>ไม่มีประวัติได้รับวัคซีนทางเลือก</span>
                                  <br />
                                </div>

                                ) : ( 
                            <>
                        
                            <br />
                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                                    <th rowSpan="1">ชื่อวัคซีน</th>
                                    {/* <th rowSpan="1">สถานะ</th> */}
                                    <th rowSpan="2">ลบ</th>
                                </tr>
                                </thead>

                                <tbody>
                                {OptionalVaccine.map((item,index) => (
                                    <tr key={index} style={{ height: "50px" }}>
                                    <td className="text-start">{index+1}. {item.Vaccine}</td>
                                    <td >
                                                <span className="actions"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => handleDeleteRow(item.id)}
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
                                
                            </div>
                        </div>
                    </>    
                   ) }


                        <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>เพิ่มวัคซีนทางเลือก :  </span>
                                </label>
                            </div>
                       
                        <div className="row"style={{marginTop:"10px"}}>
                            <div className="col-10">
                                <input
                                type="text"
                                className="form-control"
                                value={AddOptionalVac}
                                onChange={e => setAddOptionalVac(e.target.value)}
                                
                                />
                            </div>
                            <div className="col-2">
                            <button className="btn btn-primary" onClick={handleOptionalVac}>Add</button>
                            </div>
                            </div>
                        <ul>
                            {OptionalVac.map(vaccine => (
                            <li key={vaccine.id}>{vaccine.name}</li>
                            ))}
                        </ul>

                        </Modal.Body>
      <Modal.Footer>
       
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => setshowConfirmModal(true)}>
            Save
        </button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default ModalEditVaccine