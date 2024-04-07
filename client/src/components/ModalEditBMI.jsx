import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Button, Modal,Spinner } from 'react-bootstrap';
import axios from 'axios';

function ModalEditBMI({show, setShow, Student_id, BodyData}) {
    const apiUrl = process.env.API_URL
    const [Weight,setWeight] = useState("");
    const [Height,setHeight] = useState("");
    // const [BodyData,setBodyData] = useState([{id:1,DateRecord:"",weight_kg:"",height_cm:""}]);
    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };
    
    // function checkDataValidity(dataArray) {
    //     // ใช้ forEach เพื่อวนลูปทุกๆ อ็อบเจกต์ในอาร์เรย์
    //     dataArray.forEach(data => {
    //         // ตรวจสอบค่า DateRecord และ height_cm ในแต่ละอ็อบเจกต์
    //         if (!data.DateRecord || !data.height_cm) {
    //             // console.log("ข้อมูลไม่ถูกต้อง:", data);
    //             return false;
    //         } else {
    //             // console.log("ข้อมูลถูกต้อง:", data);
    //             return true;
    //         }
    //     });
    // }
    function formatDateThaiYear(dateString) {
        const dob = new Date(dateString);
        const day = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear() + 543; // เพิ่มค่า 543 เข้าไปในปีเพื่อแปลงเป็น พ.ศ.
        const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
        return formattedDOB;
    }

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
    
    const getYearFromDate = (date) => {
        return date.getFullYear();
    };

    async function addGrowthNutrition(data) {
        try {
            // เรียกใช้ API เพื่อเพิ่มข้อมูลในตาราง Growth_Nutrition
            const response = await axios.post(apiUrl + '/add-growth-nutrition', data);
            return response.data;
        } catch (error) {
            console.error('Error adding growth nutrition data:', error);
            throw error;
        }
    }
    
    async function updateGrowthNutrition(id, data) {
        try {
            // เรียกใช้ API เพื่ออัปเดตข้อมูลในตาราง Growth_Nutrition ด้วย ID ที่กำหนด
            const response = await axios.put(apiUrl + `/update-growth-nutrition/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating growth nutrition data:', error);
            throw error;
        }
    }


    const handleInputWeightChange = (event) => {
        setWeight(event.target.value);
    }
    const handleInputHeightChange = (event) => {
      setHeight(event.target.value);
   
    }

    const handleSaveButton = () => {
       if (CheckInput()){
            console.log('Weight', Weight);
            console.log('Height',Height);
            console.log('BodyData',BodyData);
            // console.log('BodyData[0].height_cm',BodyData[0].height_cm);
            // console.log('BodyData[0].DateRecord',BodyData[0].DateRecord);
            
            // const fetchData = async () => {
                
            //     try {
            //         const GrowthNutrition = {
            //             Student_ID: Student_id,
            //             Year: getYearFromDate(new Date()),
            //             Semester: '',
            //             Health_Check_Date: formatDate(new Date()),
            //             Student_Age: '',
            //             Height: Height,
            //             Weight: Weight
            //         };
            //         if(BodyData[0].height_cm && BodyData[0].DateRecord){
            //             const updateGrowthNutrition = await updateGrowthNutrition(BodyData.id, GrowthNutrition);
            //             // console.log('getYearFromDate(new Date())',getYearFromDate(new Date()));
            //             // console.log('formatDate(new Date())',formatDate(new Date()));
            //         }
            //        else{
            //             const addGrowthNutrition = await addGrowthNutrition(GrowthNutrition);
            //             // console.log('1111111111111111111',getYearFromDate(new Date()));
            //             // console.log('2222222222222222222',formatDate(new Date()));
            //        }
            //       } catch (error) {
            //         console.error('Error fetching Data:', error);
            //     }
            // };
            
            setShowLoadingModal(true)
            const fetchData = async () => {
                try {
                    const GrowthNutrition = {
                        Student_ID: Student_id,
                        Year: getYearFromDate(new Date()),
                        // Semester: '',
                        Health_Check_Date: formatDate(new Date()),
                        // Student_Age: '',
                        Height: Height,
                        Weight: Weight
                    };
                    if (BodyData[0].height_cm && BodyData[0].DateRecord) {
                        const updatedData = await updateGrowthNutrition(BodyData[0].id, GrowthNutrition);
                    } else {
                        const addedData = await addGrowthNutrition(GrowthNutrition);
                    }
                } catch (error) {
                    console.error('Error fetching Data:', error);
                }
            };
            fetchData();
            setShowLoadingModal(false)
            setShowSuccessModal(true)
            // setShow(false);
           
       }
    }

    const CheckInput = () => {
        if (Weight < 0 || Height < 0) {
            alert("กรุณากรอกเฉพาะค่าที่ไม่ติดลบ")
            return false;
        }
        if (Weight === "" || Height === "") {
            alert("กรุณากรอกค่าให้ครบถ้วน")
            return false;
        }

        return true;
     }

    //  useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const GrowthNutrition = {
    //                 Student_ID: "ABC123",
    //                 Year: 2024,
    //                 Semester: 2,
    //                 Health_Check_Date: "2024-04-04",
    //                 Student_Age: 10,
    //                 Height: 150.5,
    //                 Weight: 45.3
    //             };
    //             if(BodyData[0].height_cm && BodyData[0].DateRecord){
    //                 const updateGrowthNutrition = await updateGrowthNutrition(BodyData.id, GrowthNutrition);
    //             }
    //            else{
    //                 const addGrowthNutrition = await addGrowthNutrition(GrowthNutrition);
    //            }
    //           } catch (error) {
    //             console.error('Error fetching Data:', error);
    //         }
    //     };
    //     fetchData();
    //     // checkDataValidity(bodyData);
    // }, []);
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
      <h5 className="modal-title">ข้อมูลสุขภาพทั่วไป</h5>
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
    <form>
                            <div className="mb-3 d-flex" style={{gap: '7px'}}>
                            <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' }}>ส่วนสูง (cm.) :  </span>
                                </label>
                            </div>
                                
                            </div>
                            <div className="align-items-center" style={{ maxWidth:"100%"}}>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="Height"
                                    name="Height"
                                    value={Height}
                                    onChange={handleInputHeightChange}
                                    min="0"
                                    required
                                /></div>

                            <div className="mb-3 d-flex align-items-center"style={{ marginTop: '10px'}} >
                            <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-5" style={{ marginRight: '10px', fontFamily: 'Kanit, sans-serif', fontSize: '18px' }}>น้ำหนัก (kg.) : </span>
                                </label>
                                </div>
                                
                                 </div>
                            <div className="d-flex align-items-center "style={{ maxWidth:"100%"}}>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="Weight"
                                    name="Weight"
                                    value={Weight}
                                    onChange={handleInputWeightChange}
                                    min="0"
                                    required
                                />
                           
                            </div>
                            
                          
                          
                        </form>

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

export default ModalEditBMI