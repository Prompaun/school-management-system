import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Parent_Information() {
  

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };
  const [HouseholdData,setHouseholdData] = useState(
    [
        {
          Address_Number : "11/1",
          Village : "5",
          Alley : "อ่อนนุช 11",
          Road : "สุขุมวิท",
          Province : "กรุงเทพมหานคร",
          District : "ประเวศ",
          Subdistrict : "สวนหลวง", 
          HouseReg_file : "" //link drive gg
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            <label className="col-form-label"style={{flexWrap: 'wrap' }}>บ้านเลขที่ :</label>
            </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input 
                    type="text" 
                    className="form-control"
                    id="Address_Number" 
                    name="Address_Number" 
                    value={HouseholdData[0].Address_Number} 
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
           
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>หมู่ที่ :</label>
              </div>
              <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Village"
                    name="Village"
                    value={HouseholdData[0].Village} 
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
            <label className="col-form-label" style={{flexWrap: 'wrap' }}>ซอย :</label>
            </div>
            <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Alley"
                    name="Alley"
                    value={HouseholdData[0].Alley} 
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                    />
 </div>
 </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>ถนน :</label>
            </div>
            <div className="align-items-center"style={{maxWidth:"100%"}}> 
                <input
                    type="text"
                    className="form-control"
                    id="Road"
                    name="Road"
                    value={HouseholdData[0].Road} 
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
                        
            </div>
        
        </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif'}}>            
        <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
           
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>จังหวัด :</label>
              </div>
              <div className="align-items-center" style={{maxWidth:"100%"}}>
                <input 
                    type="text" 
                    className="form-control"
                    id="Province" 
                    name="Province" 
                    value={HouseholdData[0].Province}  
                    readOnly 
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>

            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
              <label className="col-form-label"style={{flexWrap: 'wrap' }}>เขต/อำเภอ :</label>
              </div>
              <div className="align-items-center" style={{maxWidth:"100%"}}>
                <input
                    type="text"
                    className="form-control"
                    id="District"
                    name="District"
                    value={HouseholdData[0].District}
                    readOnly
                    style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                />
            </div>
            </div>
            <div style={{ fontSize: '18px'}}> 
            <div className="align-items-center">
            
            <label className="col-form-label"style={{flexWrap: 'wrap' }}>แขวง/ตำบล :</label>
            </div>
            <div className="align-items-center" style={{maxWidth:"100%"}}>
              <input 
                  type="text" 
                  className="form-control"
                  id="Subdistrict" 
                  name="Subdistrict" 
                  value={HouseholdData[0].Subdistrict} 
                  readOnly 
                  style={{ backgroundColor: '#DCDCDC', color: 'black'}}
                  // style={{ backgroundColor: '#DCDCDC', color: 'black', borderColor: '#808080' }}
              />
          </div>
          </div>
            
          </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px',  fontFamily: 'Kanit, sans-serif',fontSize:"18px"}}>
          <div className="align-items-center">
          <label className="col-form-label">สำเนาทะเบียนบ้าน  </label>
                <button 
                    type="submit" 
                    className="btn btn-custom" 
                    style={{
                    ...fontStyle, 
                    color: 'white', 
                    fontSize: '18px', 
                    textAlign: 'center', 
                    // marginTop: '10px', 
                    margin: '5px',
                    
                    backgroundColor: '#EE82EE',
                    width: 'auto', // กำหนดความกว้าง
                    height: 'auto',  // กำหนดความสูง
                    // fontSize:"18px"
                    }}
                    onClick={() => window.open(HouseholdData[0].HouseReg_file)}
                >
                    <span>file</span>
                </button>
            </div>
        </div>
        
        </div>

    </div>
  );
}

export default Parent_Information;
