import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeftRight,BsFillTrashFill } from "react-icons/bs";
import { Button, Modal,Spinner } from 'react-bootstrap';
function ModalHistoryHealth({show,setShow,Student_id}) {

    
    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const handleSaveButton = () => {
    //    if (CheckInput()){
        alert("Save")
        setShow(false);
    //    }
      
    }
    const [congenital_disease,setcongenital_disease] = useState ([
        {
          id:1,
          congenital_disease:"ภูมิแพ้อากาศ"
        },
        {
          id:2,
          congenital_disease:"โลหิตจาง"
        }
      ]);
      const [Diseases,setDiseases] = useState ([
        {
          id:1,
          Diseases:"โรคอีสุกอีใส"
      }
      ]);
      const [allergic,setallergic] = useState ([
        {
          id:1,
          allergic:"แพ้อาหารทะเล"
      }
      ]);
      const [accident,setaccident] = useState ([
        {
          id:1,
          accident:"ผ่าตัด"
      }
      ]);

    

    const handleDeleteRow = (id) => {
        setcongenital_disease(congenital_disease.filter((row) => row.id!== id));
      };
      const handleDeleteRowDisease = (id) => {
        setDiseases(Diseases.filter((row) => row.id!== id));
      };

      const handleDeleteRowallergic = (id) => {
        setallergic(allergic.filter((row) => row.id!== id));
      };

      const handleDeleteRowaccident = (id) => {
        setaccident(accident.filter((row) => row.id!== id));
      };
    let nextId = 0;
    const [Addcongenital_disease, setAddcongenital_disease] = useState('');
    const [ListNewcongenital_disease, setListNewcongenital_disease] = useState([]);
   
    const [AddDiseases, setAddDiseases] = useState('');
    const [ListNewDiseases, setListNewDiseases] = useState([]);

    const [Addallergic, setAddallergic] = useState('');
    const [ListNewallergic, setListNewallergic] = useState([]);

    const [Addaccident, setAddaccident] = useState('');
    const [ListNewaccident, setListNewaccident] = useState([]);
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
      <h5 className="modal-title">ประวัติการเจ็บป่วย</h5>
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
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '22px' ,fontWeight:"bold"}}>โรคประจำตัว :  </span>
                                </label>
                            </div>
                            <br />
                            {congenital_disease.length===0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        
                                    <span style={{ color: 'gray', textAlign: 'center' }}>ไม่มีประวัติโรคประจำตัว</span>
                                  <br />
                                </div>

                                ) : ( 
                            <>
                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                                    <th rowSpan="1">รายละเอียด</th>
                                    {/* <th rowSpan="1">สถานะ</th> */}
                                    <th rowSpan="2">ลบ</th>
                                </tr>
                                </thead>

                                <tbody>
                                {congenital_disease.map((item,index) => (
                                    <tr key={index} style={{ height: "50px" }}>
                                    <td className="text-start expand" style={{fontSize:"18px"}}>{index+1}. {item.congenital_disease}</td>
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
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>เพิ่มโรคประจำตัว :  </span>
                                </label>
                            </div>
                        
                        <div className="row"style={{marginTop:"10px"}}>
                            <div className="col-10">
                                <input
                                type="text"
                                className="form-control"
                                value={Addcongenital_disease}
                                onChange={e => setAddcongenital_disease(e.target.value)}
                                
                                />
                            </div>
                            <div className="col-2">
                            <button className="btn btn-primary" onClick={() => {
                                if (Addcongenital_disease.trim().length > 0) {
                                    setListNewcongenital_disease([
                                    ...ListNewcongenital_disease,
                                    { id: nextId++, name: Addcongenital_disease }
                                    ]);
                                }
                                }}>Add</button>
                            </div>
                            </div>
                        <ul>
                            {ListNewcongenital_disease.map(congenital_disease => (
                            <li key={congenital_disease.id}>{congenital_disease.name}</li>
                            ))}
                        </ul>
    {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '22px' ,fontWeight:"bold"}}>โรคที่เคยเป็น :  </span>
                                </label>
                            </div>
                            <br />
                            {Diseases.length===0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        
                                    <span style={{ color: 'gray', textAlign: 'center' }}>ไม่มีประวัติโรคที่เคยเป็น</span>
                                  <br />
                                </div>

                                ) : ( 
                            <>
                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                                    <th rowSpan="1">รายละเอียด</th>
                                    {/* <th rowSpan="1">สถานะ</th> */}
                                    <th rowSpan="2">ลบ</th>
                                </tr>
                                </thead>

                                <tbody>
                                {Diseases.map((item,index) => (
                                    <tr key={index} style={{ height: "50px" }}>
                                    <td className="text-start expand" style={{fontSize:"18px"}}>{index+1}. {item.Diseases}</td>
                                    <td >
                                                <span className="actions"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => handleDeleteRowDisease(item.id)}
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
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>เพิ่มโรคที่เคยเป็น :  </span>
                                </label>
                            </div>
                        
                        <div className="row"style={{marginTop:"10px"}}>
                            <div className="col-10">
                                <input
                                type="text"
                                className="form-control"
                                value={AddDiseases}
                                onChange={e => setAddDiseases(e.target.value)}
                                
                                />
                            </div>
                            <div className="col-2">
                            <button className="btn btn-primary" onClick={() => {
                                if (AddDiseases.trim().length > 0) {
                                    setListNewDiseases([
                                    ...ListNewDiseases,
                                    { id: nextId++, name: AddDiseases }
                                    ]);
                                }
                                }}>Add</button>
                            </div>
                            </div>
                        <ul>
                            {ListNewDiseases.map(Diseases => (
                            <li key={Diseases.id}>{Diseases.name}</li>
                            ))}
                        </ul>
                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                <div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '22px' ,fontWeight:"bold"}}>อาหาร/ยา/สารที่แพ้ :  </span>
                                </label>
                            </div>
                            <br />
                            {allergic.length===0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        
                                    <span style={{ color: 'gray', textAlign: 'center' }}>ไม่มีประวัติอาหาร/ยา/สารที่แพ้</span>
                                  <br />
                                </div>

                                ) : ( 
                            <>
                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                                    <th rowSpan="1">รายละเอียด</th>
                                    {/* <th rowSpan="1">สถานะ</th> */}
                                    <th rowSpan="2">ลบ</th>
                                </tr>
                                </thead>

                                <tbody>
                                {allergic.map((item,index) => (
                                    <tr key={index} style={{ height: "50px" }}>
                                    <td className="text-start expand" style={{fontSize:"18px"}}>{index+1}. {item.allergic}</td>
                                    <td >
                                                <span className="actions"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => handleDeleteRowallergic(item.id)}
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
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>เพิ่มอาหาร/ยา/สารที่แพ้ :  </span>
                                </label>
                            </div>
                        
                        <div className="row"style={{marginTop:"10px"}}>
                            <div className="col-10">
                                <input
                                type="text"
                                className="form-control"
                                value={Addallergic}
                                onChange={e => setAddallergic(e.target.value)}
                                
                                />
                            </div>
                            <div className="col-2">
                            <button className="btn btn-primary" onClick={() => {
                                if (Addallergic.trim().length > 0) {
                                    setListNewallergic([
                                    ...ListNewallergic,
                                    { id: nextId++, name: Addallergic }
                                    ]);
                                }
                                }}>Add</button>
                            </div>
                            </div>
                        <ul>
                            {ListNewallergic.map(allergic => (
                            <li key={allergic.id}>{allergic.name}</li>
                            ))}
                        </ul>
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

<div className="d-flex align-items-center">
                                <label>
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '22px' ,fontWeight:"bold"}}>การผ่าตัด/อุบัติเหตุร้ายแรง:  </span>
                                </label>
                            </div>
                            <br />
                            {accident.length===0 ? (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '20px', justifyContent: 'center', alignItems: 'center' }}>
                        
                                    <span style={{ color: 'gray', textAlign: 'center' }}>ไม่มีประวัติการผ่าตัด/อุบัติเหตุร้ายแรง</span>
                                  <br />
                                </div>

                                ) : ( 
                            <>
                        <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                            <thead>
                                <tr style={{ height: '50px', backgroundColor: '#FFFFFF', fontWeight: 'bold', fontSize: '18px' }}>
                                    <th rowSpan="1">รายละเอียด</th>
                                    {/* <th rowSpan="1">สถานะ</th> */}
                                    <th rowSpan="2">ลบ</th>
                                </tr>
                                </thead>

                                <tbody>
                                {accident.map((item,index) => (
                                    <tr key={index} style={{ height: "50px" }}>
                                    <td className="text-start expand" style={{fontSize:"18px"}}>{index+1}. {item.accident}</td>
                                    <td >
                                                <span className="actions"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => handleDeleteRowaccident(item.id)}
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
                                    <span className="col-form-label me-3"style={{ marginRight: '10px',marginLeft: '0px', fontSize: '18px' ,fontWeight:"bold"}}>เพิ่มการผ่าตัด/อุบัติเหตุร้ายแรง :  </span>
                                </label>
                            </div>
                        
                        <div className="row"style={{marginTop:"10px"}}>
                            <div className="col-10">
                                <input
                                type="text"
                                className="form-control"
                                value={Addaccident}
                                onChange={e => setAddaccident(e.target.value)}
                                
                                />
                            </div>
                            <div className="col-2">
                            <button className="btn btn-primary" onClick={() => {
                                if (Addaccident.trim().length > 0) {
                                    setListNewaccident([
                                    ...ListNewaccident,
                                    { id: nextId++, name: Addaccident }
                                    ]);
                                }
                                }}>Add</button>
                            </div>
                            </div>
                        <ul>
                            {ListNewaccident.map(accident => (
                            <li key={accident.id}>{accident.name}</li>
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

export default ModalHistoryHealth