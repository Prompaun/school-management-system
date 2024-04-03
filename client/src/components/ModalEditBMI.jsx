import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';

import { Button, Modal,Spinner } from 'react-bootstrap';
function ModalEditBMI({show,setShow,Student_id}) {

    const [Weight,setWeight] = useState("");
    const [Height,setHeight] = useState("");
    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };


    const handleInputWeightChange = (event) => {
        setWeight(event.target.value);
    }
    const handleInputHeightChange = (event) => {
      setHeight(event.target.value);
   
    }

    const handleSaveButton = () => {
       if (CheckInput()){
        alert("Save")
        setShow(false);
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
  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
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
       
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleSaveButton}>
            Save
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalEditBMI