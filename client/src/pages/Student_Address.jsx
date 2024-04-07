import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Parent_Information(props) {
  

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  async function getStudentAddressoByID(Student_ID) {
    try {
            const response = await axios.get('http://localhost:8080/personnel-get-student-address-by-student-id', {
                params: {
                    Student_ID: Student_ID
                }
            });
            return response.data;
        }   catch (error) {
            console.error('Error fetching year by student ID:', error);
            throw error;
        }
    };

  const [HouseholdData,setHouseholdData] = useState(
    [
        // {
        //   House_No : "11/1",
        //   Moo : "5",
        //   Soi : "อ่อนนุช 11",
        //   Road : "สุขุมวิท",
        //   Province : "กรุงเทพมหานคร",
        //   District : "ประเวศ",
        //   Sub_District : "สวนหลวง", 
        //   HouseReg_file : "" //link drive gg
        // }
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
        try {
            const StudentAddress = await getStudentAddressoByID(props.studentID_prop);
            console.log('StudentAddress:', StudentAddress);

            setHouseholdData(StudentAddress);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  fetchData();
  }, []);

  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Kanit, sans-serif',
      }}>

      {HouseholdData.length === 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', margin: '10px', fontSize: '18px' }}>
                <div className="container mt-5 d-flex flex-column align-items-center">
                    <span className="ms-3 mb-0" style={{ color: 'gray' }}>ไม่พบข้อมูลที่อยู่ของนักเรียนท่านนี้</span>
                </div>
            </div>
            
        ) : (
        <>
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
                      id="House_No" 
                      name="House_No" 
                      value={HouseholdData[0].House_No} 
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
                      id="Moo"
                      name="Moo"
                      value={HouseholdData[0].Moo} 
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
                      id="Soi"
                      name="Soi"
                      value={HouseholdData[0].Soi} 
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
                    id="Sub_District" 
                    name="Sub_District" 
                    value={HouseholdData[0].Sub_District} 
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
      </>
      )}
    </div>
  );
}

export default Parent_Information;
