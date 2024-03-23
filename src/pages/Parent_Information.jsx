import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Parent_Information() {
  

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  //ข้อมูลที่ใช้โชว์บิดา มารดา
  const [ParentData,setStudentData] = useState(
    [
        {
          name_father : "สมใจ",
          lastname_father : "ปรารถนา",
          DOB_father : "12/05/1999",
          Nationality_father : "ไทย",
          Occupation_father : "ธุกิจส่วนตัว",
          Workplace_father : "บริษัทสมใจปรารถนา",
          Phone_father : "0600000000", 
          name_mother : "สมพร",
          lastname_mother : "ปรารถนา",
          DOB_mother : "21/07/1999",
          Nationality_mother : "ไทย",
          Occupation_mother : "ธุกิจส่วนตัว",
          Workplace_mother : "บริษัทสมใจปรารถนา",
          Phone_mother : "0600000002", 

        }
    ]
  );

  //รับค่ามาว่าผู้ปกครองเป็นใคร
  const [WhoAreParent,setWhoAreParent] = useState("บิดา");
  //ฟังก์ชันโชว์ส่วนของข้อมูลผู้ปกครองที่เป็นบิดา มารดา บิดาและมารดา
  const [ShowWhoAreParent,setShowWhoAreParent] = useState(false);
  
  useEffect(() => {
   
    if (WhoAreParent==="อื่นๆ") {
        setShowWhoAreParent(false);
        setShowParentData(true);
    }
    else {
        setShowWhoAreParent(true);
        setShowParentData(false);
    }

    }, [WhoAreParent]);

    //ฟังก์ชันโชว์ส่วนของข้อมูลผู้ปกครองที่เป็นอื่นๆ
const [ShowParentData,setShowParentData]=useState(false);

//ข้อมูลที่ใช้โชว์เมื่อผู้ปกครองเป็นอื่นๆ
  const [OtherParentData,setOtherParentData] = useState(
    [
        {
          name_parent : "-",
          lastname_parent : "-",
          DOB_parent : "-",
          Nationality_parent : "-",
          Occupation_parent : "-",
          Workplace_parent : "-",
          Phone_parent : "-", 
          Parent_relation :"-"
        }
    ]
  );

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Kanit, sans-serif',
      }}>
       
       <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
            <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                    <label htmlFor="father_data" className="col-form-labe">ข้อมูลบิดา</label>
            </div>
        </div>
        <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="name_father" className="col-form-label">ชื่อ</label>
                </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="name_father" 
                    name="name_father" 
                    value={ParentData[0].name_father}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="lastname_father" className="col-form-label">นามสกุล</label>
                </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="lastname_father"
                    name="lastname_father"
                    value={ParentData[0].lastname_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                </div>         
            </div>
            </div>
       
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="DOB_father" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="DOB_father"
                    name="DOB_father"
                    value={ParentData[0].DOB_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
                
            </div>
        </div>
                  
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Nationality_father" className="col-form-label">สัญชาติ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Nationality_father" 
                    name="Nationality_father" 
                    value={ParentData[0].Nationality_father}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black' }} 
                />
            </div>
            
        </div>
        
                  
                  <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Occupation_father" className="col-form-label">อาชีพ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Occupation_father"
                    name="Occupation_father"
                    value={ParentData[0].Occupation_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
                  
                  <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Workplace_father" className="col-form-label">สถานที่ทำงาน</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Workplace_father"
                    name="Workplace_father"
                    value={ParentData[0].Workplace_father}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
            </div>
        
        </div>
                  
            <div style={{ fontSize: '18px'}}> 
                <div className="align-items-center">
                    <label htmlFor="Phone_father" className="col-form-label">โทรศัพท์</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                    <input 
                        type="text" 
                        className="form-control"
                        id="Phone_father" 
                        name="Phone_father" 
                        value={ParentData[0].Phone_father}
                        readOnly 
                        style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                    />
                </div>
            </div>
    </div>
    <br />

    <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>        
        <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
                    <div className="align-items-center">
                            <label htmlFor="mother_data" className="col-form-label">ข้อมูลมารดา</label>
                        </div>
                
            </div>
        
            </div>
            <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="name_mother" className="col-form-label">ชื่อ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="name_mother" 
                    name="name_mother" 
                    value={ParentData[0].name_mother} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="lastname_mother" className="col-form-label">นามสกุล</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="lastname_mother"
                    name="lastname_mother"
                    value={ParentData[0].lastname_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                        
            </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="DOB_mother" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="DOB_mother"
                    name="DOB_mother"
                    value={ParentData[0].DOB_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
              
            </div>
            </div>
            <div style={{ fontSize: '18px'}}>
            <div className="align-items-center">
                <label htmlFor="Nationality_mother" className="col-form-label">สัญชาติ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Nationality_mother" 
                    name="Nationality_mother" 
                    value={ParentData[0].Nationality_mother} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
        
            </div>
           
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Occupation_mother" className="col-form-label">อาชีพ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Occupation_mother"
                    name="Occupation_mother"
                    value={ParentData[0].Occupation_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Workplace_mother" className="col-form-label">สถานที่ทำงาน</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Workplace_mother"
                    name="Workplace_mother"
                    value={ParentData[0].Workplace_mother}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
            </div>
            </div>
        
            <div style={{ fontSize: '18px'}}> 
        
            <div className="align-items-center">
                <label htmlFor="Phone_mother" className="col-form-label">โทรศัพท์</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Phone_mother" 
                    name="Phone_mother" 
                    value={ParentData[0].Phone_mother}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
            </div>

        </div>
        </div>
        
       <br />
       <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>        
        <div className="d-flex align-items-center" style={{fontWeight:"bold",fontSize:"20px"}}>
            <div className="align-items-center">
                    <label htmlFor="data_parent" className="col-form-label">ข้อมูลผู้ปกครอง</label>
                </div>
        </div>
        </div>
        {ShowWhoAreParent && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
            <div style={{ fontSize: '18px'}}> 
                <div className="align-items-center">
                    <label htmlFor="who_are_parent" className="col-form-label">ผู้ปกครองเป็น</label>
                    </div>
                    <div className="align-items-center"style={{maxWidth:"100%"}}> 
                    <input 
                        type="text" 
                        className="form-control"
                        id="who_are_parent" 
                        name="who_are_parent" 
                        value={WhoAreParent}
                        readOnly 
                        style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                        // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                    />
                </div>
                </div>
            </div>
        )}

     {ShowParentData && (
        <>

        <div className="d-flex flex-column"style={{fontFamily: 'Kanit, sans-serif'}}>   

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="name_parent" className="col-form-label">ชื่อ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="name_parent" 
                    name="name_parent" 
                    value={OtherParentData[0].name_parent}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="lastname_parent" className="col-form-label">นามสกุล</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="lastname_parent"
                    name="lastname_parent"
                    value={OtherParentData[0].lastname_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                        
            </div>
     
            </div>
           
            </div> 
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>  
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="DOB_parent" className="col-form-label">วัน/เดือน/ปีเกิด</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="DOB_parent"
                    name="DOB_parent"
                    value={OtherParentData[0].DOB_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
                
            </div>
        </div>
        <div style={{ fontSize: '18px'}}>
            <div className="align-items-center">
                <label htmlFor="Nationality_parent" className="col-form-label">สัญชาติ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Nationality_parent" 
                    name="Nationality_parent" 
                    value={OtherParentData[0].Nationality_parent}
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
        
            </div>
           
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Occupation_parent" className="col-form-label">อาชีพ</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Occupation_parent"
                    name="Occupation_parent"
                    value={OtherParentData[0].Occupation_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
                <label htmlFor="Workplace_parent" className="col-form-label">สถานที่ทำงาน</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Workplace_parent"
                    name="Workplace_parent"
                    value={OtherParentData[0].Workplace_parent}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
            </div>
            </div>
        
            <div style={{ fontSize: '18px'}}> 
        
            <div className="align-items-center">
                <label htmlFor="Phone_parent" className="col-form-label">โทรศัพท์</label>
                </div>
                <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Phone_parent" 
                    name="Phone_parent" 
                    value={OtherParentData[0].Phone_parent} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                />
            </div>
            </div>

            <div style={{ fontSize: '18px'}}> 
                <div className="align-items-center">
                    <label htmlFor="Parent_relation" className="col-form-label">เกี่ยวข้องเป็น</label>
                    </div>
                    <div className="align-items-center"style={{maxWidth:"100%"}}> 
                    <input 
                        type="text" 
                        className="form-control"
                        id="Parent_relation" 
                        name="Parent_relation" 
                        value={OtherParentData[0].Parent_relation} 
                        readOnly 
                        style={{ backgroundColor: '#DCDCDC', color: 'black'}} 
                    />
                </div>
            </div>
            </div>
            
        </div></>
        )}
    
        </div>
    </div>
    </div>
  );
}

export default Parent_Information;
