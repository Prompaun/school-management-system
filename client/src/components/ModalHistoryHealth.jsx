import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BsArrowLeftRight,BsFillTrashFill } from "react-icons/bs";
import { Button, Modal,Spinner } from 'react-bootstrap';
import axios from 'axios';

function ModalHistoryHealth({show, setShow, Student_id, congenitalDisease}) {

    
    const handleClose = () => {
        setShow(false);
      };
      const fontStyle = {
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

      const addCongenitalDiseaseInfo = async (studentId, date, congenitalDisease) => {
        try {
            const response = await axios.post('http://localhost:8080/add-congenital-disease-info', {
                Student_ID: studentId,
                Date: date,
                Congenital_Disease: congenitalDisease
            });
            console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
            return response.data; // ส่งข้อมูลที่ได้รับกลับ
        } catch (error) {
            console.error('Error adding congenital disease information:', error);
            throw error; // ส่ง error กลับเพื่อให้ UI จัดการต่อ
        }
    };
    
    const deleteCongenitalDisease = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8080/delete-congenital-disease/${id}`);
            console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
            return response.data; // ส่งข้อมูลที่ได้รับกลับ
        } catch (error) {
            console.error('Error deleting congenital disease information:', error);
            throw error; // ส่ง error กลับเพื่อให้ UI จัดการต่อ
        }
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
    

    const handleSaveButton = () => {
    //    if (CheckInput()){
        console.log('congenital_disease:', congenital_disease);
        console.log('ListNewcongenital_disease:', ListNewcongenital_disease);
        console.log('ListNewcongenital_disease.name:', ListNewcongenital_disease.name);
        setShowLoadingModal(true)
        
        if (ListNewcongenital_disease.length >= 1){
            // const fetchData = async () => {
            //     try {
            //         const addedData = await addCongenitalDiseaseInfo(Student_id, formatDate(new Date()), ListNewcongenital_disease.name);
            //     } catch (error) {
            //         console.error('Error fetching Data:', error);
            //     }
            // };
            
            // // เรียกใช้ฟังก์ชัน fetchData
            // fetchData();
            ListNewcongenital_disease.forEach(async (item) => {
                try {
                    const response = await addCongenitalDiseaseInfo(Student_id, formatDate(new Date()), item.name);
                    console.log(response.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
                } catch (error) {
                    console.error('Error adding congenital disease information:', error);
                    // จัดการข้อผิดพลาดตามต้องการ
                }
            });
        }
        
        setShowLoadingModal(false)
        setShowSuccessModal(true)
    //    }
    }

    useEffect(() => {
        setcongenital_disease(congenitalDisease);
        // console.log(congenital_disease,'congenitalDisease',congenitalDisease);
      }, []);

    const [congenital_disease,setcongenital_disease] = useState (
        [
        // {
        //   id:1,
        //   congenital_disease:"ภูมิแพ้อากาศ"
        // },
        // {
        //   id:2,
        //   congenital_disease:"โลหิตจาง"
        // }
      ]
    );
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

    //   useEffect(() => {
    //     setcongenital_disease(congenitalDisease);
    //     console.log(congenital_disease,'congenitalDisease',congenitalDisease);
    //   }, []);

    

    const handleDeleteRow = (id) => {
        setcongenital_disease(congenital_disease.filter((row) => row.id!== id));
        // console.log('id',id);
        deleteCongenitalDisease(id)
            .then((data) => {
                console.log('Congenital disease information deleted successfully:', data);
                // ทำสิ่งที่ต้องการหลังจากลบข้อมูลสำเร็จ
            })
            .catch((error) => {
                console.log('Failed to delete congenital disease information:', error, id);
                // ทำสิ่งที่ต้องการหลังจากการลบข้อมูลล้มเหลว
    });
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
    const handleListNewcongenital_disease = () => {
        if (Addcongenital_disease.trim().length > 0) {
            if (ListNewcongenital_disease.length>0){
                const lastId = ListNewcongenital_disease.length > 0? ListNewcongenital_disease[ListNewcongenital_disease.length - 1].id : null;
                setListNewcongenital_disease([
                ...ListNewcongenital_disease,
                { id: lastId+1, name: Addcongenital_disease }
                ]);
        }
        else {
            setListNewcongenital_disease([
                ...ListNewcongenital_disease,
                { id: nextId, name: Addcongenital_disease }
                ]);
        }
           
        setAddcongenital_disease('');
        }
    };


    const [AddDiseases, setAddDiseases] = useState('');
    const [ListNewDiseases, setListNewDiseases] = useState([]);
    const handleListNewDiseasese = () => {
        if (AddDiseases.trim().length > 0) {
            if (ListNewDiseases.length>0){
                const lastId = ListNewDiseases.length > 0? ListNewDiseases[ListNewDiseases.length - 1].id : null;
                setListNewDiseases([
                ...ListNewDiseases,
                { id: lastId+1, name: AddDiseases }
                ]);
        }
        else {
            setListNewDiseases([
                ...ListNewDiseases,
                { id: nextId, name: AddDiseases }
                ]);
        }
           
        setAddDiseases('');
        }
    };
    const [Addallergic, setAddallergic] = useState('');
    const [ListNewallergic, setListNewallergic] = useState([]);
    const handleListNewallergic = () => {
        if (Addallergic.trim().length > 0) {
            if (ListNewallergic.length>0){
                const lastId = ListNewallergic.length > 0? ListNewallergic[ListNewallergic.length - 1].id : null;
                setListNewallergic([
                ...ListNewallergic,
                { id: lastId+1, name: Addallergic }
                ]);
        }
        else {
            setListNewallergic([
                ...ListNewallergic,
                { id: nextId, name: Addallergic }
                ]);
        }
           
        setAddallergic('');
        }
    };

    const [Addaccident, setAddaccident] = useState('');
    const [ListNewaccident, setListNewaccident] = useState([]);
    const handleListNewaccident = () => {
        if (Addaccident.trim().length > 0) {
            if (ListNewaccident.length>0){
                const lastId = ListNewaccident.length > 0? ListNewaccident[ListNewaccident.length - 1].id : null;
                setListNewaccident([
                ...ListNewaccident,
                { id: lastId+1, name: Addaccident }
                ]);
        }
        else {
            setListNewaccident([
                ...ListNewaccident,
                { id: nextId, name: Addaccident }
                ]);
        }
           
        setAddaccident('');
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
                            <button className="btn btn-primary" onClick={handleListNewcongenital_disease}>Add</button>
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
                            <button className="btn btn-primary" onClick={handleListNewDiseasese}>Add</button>
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
                            <button className="btn btn-primary" onClick={handleListNewallergic}>Add</button>
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
                            <button className="btn btn-primary" onClick={handleListNewaccident}>Add</button>
                            </div>
                            </div>
                        <ul>
                            {ListNewaccident.map(accident => (
                            <li key={accident.id}>{accident.name}</li>
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

export default ModalHistoryHealth