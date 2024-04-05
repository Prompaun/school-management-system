import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Button, Modal,Spinner } from 'react-bootstrap';
import axios from 'axios';

function ModalEditHealth({show, setShow, Student_id, HealthCheckUp}) {

    const [Eyesight,setEyesight] = useState("");
    const [InputEyesight,setInputEyesight] = useState("");
    const [Hearing,setHearing] = useState("");
    const [InputHearing,setInputHearing] = useState("");
    const [Mouth,setMouth] = useState("");
    const [InputMouth,setInputMouth] = useState("");

    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };
    
    // ฟังก์ชันสำหรับเพิ่มข้อมูลใหม่ลงในฐานข้อมูล Health_Check
    async function addHealthCheck(data) {
        try {
            const response = await axios.post('http://localhost:8080/add-health-check', data);
            return response.data;
        } catch (error) {
            console.error('Error adding health check data:', error);
            throw error;
        }
    }

    // ฟังก์ชันสำหรับอัปเดตข้อมูลในฐานข้อมูล Health_Check ด้วย ID ที่ระบุ
    async function updateHealthCheck(id, data) {
        try {
            const response = await axios.put(`http://localhost:8080/update-health-check/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error updating health check data:', error);
            throw error;
        }
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


    const handleInputEyesightChange = (event) => {
        setInputEyesight(event.target.value);
    }
    const handleEyesightChange = (event) => {
        setEyesight(event.target.value);
    }
    const handleInputHearingChange = (event) => {
        setInputHearing(event.target.value);
   
    }
    const handleHearingChange = (event) => {
        setHearing(event.target.value);
    }
    const handleInputMouthChange = (event) => {
        setInputMouth(event.target.value);
   
    }
    const handleMouthChange = (event) => {
        setMouth(event.target.value);
    }
   

    const [ShowEyesight,setShowEyesight] = useState(false);

    useEffect(() => {
        if (Eyesight){
            setEyesight(Eyesight)
            console.log(Eyesight,"Eyesight")
        }
    }, [Eyesight])

    useEffect(() => {
        if (Eyesight ==="ผิดปกติ"){
            setShowEyesight(true)

        }
        else {
            setShowEyesight(false)
            setInputEyesight("");
        }
    }, [Eyesight])
// ---------------------------------------------------------------------------------------------
    const [ShowHearing,setShowHearing] = useState(false);

    useEffect(() => {
        if (Hearing){
            setHearing(Hearing)
            console.log(Hearing,"Hearing")
        }
    }, [Hearing])

    useEffect(() => {
        if (Hearing ==="ผิดปกติ"){
            setShowHearing(true)

        }
        else {
            setShowHearing(false)
            setInputHearing("");
        }
    }, [Hearing])
// ---------------------------------------------------------------------------------------------
        const [ShowMouth,setShowMouth] = useState(false);

        useEffect(() => {
            if (Mouth){
                setMouth(Mouth)
                console.log(Mouth,"Mouth")
            }
        }, [Mouth])

        useEffect(() => {
            if (Mouth ==="ผิดปกติ"){
                setShowMouth(true)

            }
            else {
                setShowMouth(false)
                setInputMouth("");
            }
        }, [Mouth])
// ---------------------------------------------------------------------------------------------

        const handleSaveButton = () => {
               if (CheckInput()){
                    console.log('InputEyesight', InputEyesight);
                    console.log('InputMouth',InputMouth);
                    console.log('InputHearing',InputHearing);
                    console.log('HealthCheckUp[0]',HealthCheckUp[0]);

                    const EyeExamination = Eyesight === 'ปกติ' ? Eyesight : InputEyesight;
                    const HearingExamination = Hearing === 'ปกติ' ? Hearing : InputHearing;
                    const MouthExamination = Mouth === 'ปกติ' ? Mouth : InputMouth;
                    console.log('MouthExamination',MouthExamination);
                    const fetchData = async () => {
                        try {
                            const HealthCheckData = {
                                Student_ID: Student_id,
                                Date: formatDate(new Date()),
                                EyeExamination: EyeExamination,
                                Hearing: HearingExamination,
                                OralHealth: MouthExamination
                            };

                            
                            // if (HealthCheckUp[0].id) {
                            //     const updatedData = await updateHealthCheck(HealthCheckUp[0].id, HealthCheckData);
                            //     console.log(updatedData);
                            // } else {
                                const addedData = await addHealthCheck(HealthCheckData);
                            // }
                        } catch (error) {
                            console.error('Error fetching Data:', error);
                        }
                    };
                    fetchData();
                    alert("Save")
                    setShow(false);
                }
            }
         const CheckInput = () => {
            if (Eyesight==="" || Mouth==="" || Hearing==="") {
                alert("กรุณากรอกข้อมูลให้ครบถ้วน")
                return false;
            }
            if (Eyesight==="ผิดปกติ") {
                if (InputEyesight==="") {
                    alert("กรุณากรอกข้อมูลให้ครบถ้วน")
                    return false;
                }
               
            }
            if (Mouth==="ผิดปกติ") {
                
                if (InputMouth==="") {
                    alert("กรุณากรอกข้อมูลให้ครบถ้วน")
                    return false;
                }
             
            }
            if (Hearing==="ผิดปกติ") {
                
                if (InputHearing==="") {
                    alert("กรุณากรอกข้อมูลให้ครบถ้วน")
                    return false;
                }
        
            }
            return true;
         }
        
  return (
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
      <h5 className="modal-title">การตรวจสุขภาพตา หูและช่องปาก</h5>
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
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>การตรวจสายตา :  </span>
                                </label>
                            </div>
                                
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Eyesight" id="normal" 
                                value="ปกติ" 
                                checked={Eyesight === 'ปกติ'}
                                onChange={handleEyesightChange}
                                style={{border:"1px solid"}} 
                                />
                                
                                <label className="form-check-label custom-body" style={{ fontSize: '18px', flexWrap: "wrap" }}>
                                ปกติ
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Eyesight" id="abnormal" 
                                value="ผิดปกติ" 
                                checked={Eyesight === 'ผิดปกติ'} 
                                onChange={handleEyesightChange}
                                style={{border:"1px solid"}} 
                                />
                                <label className="form-check-label custom-body" style={{ fontSize: '18px', flexWrap: "wrap" }}>
                                ผิดปกติ
                                </label>
                            </div>
                            {ShowEyesight && (
                                <div className="align-items-center" style={{ maxWidth:"100%"}}>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="InputEyesight"
                                    name="InputEyesight"
                                    value={InputEyesight}
                                    onChange={handleInputEyesightChange}
                                    style={{border:"1px solid"}}
                                    required
                                /></div>
                            )}
                           <br />
{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                            <div className="mb-3 d-flex align-items-center"style={{ marginTop: '10px'}} >
                            <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-5" style={{ marginRight: '10px', fontFamily: 'Kanit, sans-serif', fontSize: '18px',fontWeight:"bold" }}>การได้ยิน : </span>
                                </label>
                                </div>
                                
                                 </div>
                                 <div className="form-check">
                                <input className="form-check-input" type="radio" name="Hearing" id="normal" 
                                value="ปกติ" 
                                checked={Hearing === 'ปกติ'}
                                onChange={handleHearingChange}
                                style={{border:"1px solid"}} 
                                />
                                
                                <label className="form-check-label custom-body" style={{ fontSize: '18px', flexWrap: "wrap" }}>
                                ปกติ
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Hearing" id="abnormal" 
                                value="ผิดปกติ" 
                                checked={Hearing === 'ผิดปกติ'} 
                                onChange={handleHearingChange}
                                style={{border:"1px solid"}} 
                                />
                                <label className="form-check-label custom-body" style={{ fontSize: '18px', flexWrap: "wrap" }}>
                                ผิดปกติ
                                </label>
                            </div>
                            {ShowHearing && (
                                <div className="align-items-center" style={{ maxWidth:"100%"}}>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="InputHearing"
                                    name="InputHearing"
                                    value={InputHearing}
                                    onChange={handleInputHearingChange}
                                    style={{border:"1px solid"}}
                                    required
                                /></div>
                            )}
                            <br />
                          {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
                            <div className="mb-3 d-flex align-items-center"style={{ marginTop: '10px'}} >
                            <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-5" style={{ marginRight: '10px', fontFamily: 'Kanit, sans-serif', fontSize: '18px',fontWeight:"bold" }}>สุขภาพช่องปาก : </span>
                                </label>
                                </div>
                                
                                 </div>
                                 <div className="form-check">
                                <input className="form-check-input" type="radio" name="Mouth" id="normal" 
                                value="ปกติ" 
                                checked={Mouth === 'ปกติ'}
                                onChange={handleMouthChange}
                                style={{border:"1px solid"}} 
                                />
                                
                                <label className="form-check-label custom-body" style={{ fontSize: '18px', flexWrap: "wrap" }}>
                                ปกติ
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="Mouth" id="abnormal" 
                                value="ผิดปกติ" 
                                checked={Mouth === 'ผิดปกติ'} 
                                onChange={handleMouthChange}
                                style={{border:"1px solid"}} 
                                />
                                <label className="form-check-label custom-body" style={{ fontSize: '18px', flexWrap: "wrap" }}>
                                ผิดปกติ
                                </label>
                            </div>
                            {ShowMouth && (
                                <div className="align-items-center" style={{ maxWidth:"100%"}}>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="InputMouth"
                                    name="InputMouth"
                                    value={InputMouth}
                                    onChange={handleInputMouthChange}
                                    style={{border:"1px solid"}}
                                    required
                                /></div>
                            )}
                          
                        </form>

                        </Modal.Body>
      <Modal.Footer>
       
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleSaveButton}>
            Save
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalEditHealth