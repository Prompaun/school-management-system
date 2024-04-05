import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeftRight,BsFillTrashFill } from "react-icons/bs";
import { Button, Modal,Spinner } from 'react-bootstrap';
function ModalEditVaccine({show,setShow,Student_id}) {

    
    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };


    const handleSaveButton = () => {
    //    if (CheckInput()){
        console.log("OptionalVac",OptionalVac)
        alert("Save")
        setShow(false);
    //    }
      
    }

    
    //วัคซีนพื้นฐาน จำเป็น 8 ชนิด
    const [EPI_program,setEPI_program] = useState([
        {id:1,Vaccine:"วัคซีนป้องกันวัณโรค (BCG Vaccine)",value:true},
        {id:2,Vaccine:"วัคซีนตับอักเสบบี (Hepatitis B Vaccine : HBV)",value:true},
        {id:3,Vaccine:"วัคซีนคอตีบ-บาดทะยัก-ไอกรน (Diphtheria, Tetanus, Pertussis : DPT)",value:true},
        {id:4,Vaccine:"วัคซีนโปลิโอ (Polio)",value:true},
        {id:5,Vaccine:"วัคซีนหัด-หัดเยอรมัน-คางทูม (Measles mumps rubella vaccine : MMR)",value:true},
        {id:6,Vaccine:"วัคซีนไข้สมองอักเสบเจอี (Japanese encephalitis virus : JE)",value:true},
        {id:7,Vaccine:"วัคซีนป้องกันไข้หวัดใหญ่ (Influenza Vaccine)",value:false},
        {id:8,Vaccine:"วัคซีนเอชพีวี (HPV)",value:false},

    ])

    const handleVaccineClick = (id) => {
        setEPI_program(
          EPI_program.map((row) => {
            if (row.id === id) {
                console.log("row.value",!row.value)
              return {...row, value:!row.value };
            }
            // console.log("row.value",!row.value)
            return row;
          })
        );
     }
    //วัคซีนทางเลือก ข้อมูลเพิ่มจะถือว่าฉีดแล้ว
    const [OptionalVaccine,setOptionalVaccine] = useState([
        {id:1,Vaccine:"วัคซีนโรต้าไวรัส (Rotavirus)"},
        {id:2,Vaccine:"วัคซีนไข้เลือดออก (Dengue Vaccine)"},
        {id:3,Vaccine:"วัคซีนป้องกันโรคอีสุกอีใส  (Varicella vaccine)"},
    
    ])
    const handleDeleteRow = (id) => {
        console.log("row.id",id)
        setOptionalVaccine(OptionalVaccine.filter((row) => row.id!== id));
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
       
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleSaveButton}>
            Save
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalEditVaccine