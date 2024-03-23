import React, { useState, useEffect } from 'react';

function HouseholdInfo  ({  //------------------1------------------
  sendHouseNumberToEnroll,
  sendMooToEnroll,
  sendSoiToEnroll,
  sendRoadToEnroll,
  sendProvinceToEnroll,
  sendDistrictToEnroll,
  sendSubDistrictToEnroll,
  sendHouseReg_fileToEnroll
  }) {

  const [HouseNumber, setHouseNumber] = useState('');
  const [Moo, setMoo] = useState('');
  const [Soi, setSoi] = useState('');
  const [Road, setRoad] = useState('');
  const [Province, setProvince] = useState('');
  const [District, setDistrict] = useState('');
  const [SubDistrict, setSubDistrict] = useState('');
  const [HouseReg_file, setHouseReg_file] = useState('');

  // Dummy data for Provinces, Districts, and sub-Districts
  const Provinces = ['กรุงเทพมหานคร', 'นนทบุรี', 'ปทุมธานี', 'สมุทรปราการ', 'สมุทรสงคราม'];
  const DistrictOptions = {
    'กรุงเทพมหานคร': ['พระนคร', 'ดุสิต', 'หนองจอก', 'บางรัก'],
    'นนทบุรี': ['เมืองนนทบุรี', 'บางกรวย', 'ปากเกร็ด'],
    // Add more Provinces and corresponding Districts here
  };
  const SubDistrictOptions = {
    'พระนคร': ['พระบรมมหาราชวัง', 'วัดราชบพิธ', 'สำราญราษฎร์'],
    'ดุสิต': ['วชิรพยาบาล', 'สวนจตุจักร', 'อนุสาวรีย์'],
    // Add more Districts and corresponding sub-Districts here
  };

  const RoadOptions = {
    'พระบรมมหาราชวัง': ['ถนน1', 'ถนน2', 'ถนน3'],
    'วชิรพยาบาล': ['สามเสน', 'ศรีอยุธยา ', 'ราชวิถี'],
    // Add more Districts and corresponding sub-Districts here
  };

  //------------------2------------------
  useEffect(() => {
    // if (HouseNumber !== '') {
        sendHouseNumberToEnroll(HouseNumber);
    // }
}, [HouseNumber, sendHouseNumberToEnroll]);

  useEffect(() => {
    // if (Moo !== '') {
        sendMooToEnroll(Moo);
    // }
  }, [Moo, sendMooToEnroll]);

  useEffect(() => {
    // if (Soi !== '') {
        sendSoiToEnroll(Soi);
    // }
  }, [Soi, sendSoiToEnroll]);

  useEffect(() => {
    // if (Road !== '') {
        sendRoadToEnroll(Road);
    // }
  }, [Road, sendRoadToEnroll]);

  useEffect(() => {
    // if (Province !== '') {
        sendProvinceToEnroll(Province);
    // }
  }, [Province, sendProvinceToEnroll]);

  useEffect(() => {
    // if (District !== '') {
        sendDistrictToEnroll(District);
    // }
  }, [District, sendDistrictToEnroll]);

  useEffect(() => {
    // if (SubDistrict !== '') {
        sendSubDistrictToEnroll(SubDistrict);
    // }
  }, [SubDistrict, sendSubDistrictToEnroll]);

  // useEffect(() => {
    // if (HouseReg_file !== '') {
        // sendHouseReg_fileToEnroll(HouseReg_file);
    // }
  // }, [HouseReg_file, sendHouseReg_fileToEnroll]);


  //------------------3------------------
  const handleHouseNumber = (event) => {
    setHouseNumber(event.target.value);
  };

  const handleMoo = (event) => {
    setMoo(event.target.value);
  };

  const handleSoi = (event) => {
    setSoi(event.target.value);
  };

  const handleRoad = (event) => {
    setRoad(event.target.value);
  };

  const handleProvince = (event) => {
    setProvince(event.target.value);
  };

  const handleDistrict = (event) => {
    setDistrict(event.target.value);
  };

  const handleSubDistrict = (event) => {
    setSubDistrict(event.target.value);
  };

  const handleHouseReg_file = (event) => {
    setHouseReg_file(event.target.value);
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);
    setDistrict('');
    setSubDistrict('');
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);
    setSubDistrict('');
  };

  const handleSubDistrictChange = (e) => {
    const selectedSubDistrict = e.target.value;
    setSubDistrict(selectedSubDistrict);
    // setRoad('');
  };

  const allowedFileTypes = ['.pdf', '.jpg', '.jpeg', '.png'];

  // const handleFileUpload = (event) => {
  //   const HouseReg_file = event.target.Files[0];
  //   if (HouseReg_file) {
  //     const FileType = '.' + HouseReg_file.name.split('.').pop().toLowerCase();
  //     if (allowedFileTypes.includes(FileType)) {
  //       // ไฟล์ถูกต้อง ทำตามต้องการทำ
  //     } else {
  //       alert('กรุณาเลือกไฟล์ที่มีนามสกุล .pdf, .jpg, .jpeg หรือ .png เท่านั้น');
  //       // ไม่อนุญาตให้อัพโหลดไฟล์ที่มีนามสกุลไม่ถูกต้อง
  //       event.target.value = ''; // ล้างค่า input HouseReg_file ให้ว่าง
  //     }
  //   }
  // };

  const handleFileUpload = (event) => {
    event.preventDefault();
    const HouseReg_file = event.target;

    // console.log('-----------------------', HouseReg_file.files.length);

     if (HouseReg_file.files.length === 0){
      setHouseReg_file('');
      sendHouseReg_fileToEnroll('');
    }
   
    if (HouseReg_file.files && HouseReg_file.files.length > 0) {
        const file = HouseReg_file.files[0];
        const fileType = '.' + file.name.split('.').pop().toLowerCase();
        if (allowedFileTypes.includes(fileType)) {
            let fileName = '';
            if (HouseReg_file.files.length === 1) {
                fileName = file.name;
            } else {
                fileName = HouseReg_file.files.length + ' files selected';
            }
            sendHouseReg_fileToEnroll(file);
        } else {
            alert('กรุณาเลือกไฟล์ที่มีนามสกุล .pdf, .jpg, .jpeg หรือ .png เท่านั้น');
            HouseReg_file.value = '';
        }
    }
   
   

};

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Basic validation: Check if required fields are empty
    if (!HouseNumber || !Moo || !Province || !District || !SubDistrict || !Road || !Soi || !HouseReg_file) {
      alert('Please fill out all fields and upload a HouseReg_file.');
      // return;
    }
  
    // Perform form submission logic here (e.g., send data to server via API call)
    // You can also show a loading spinner during the submission process
  
    // Reset the form fields after submission
    // setHouseNumber('');
    // setMoo('');
    // setProvince('');
    // setDistrict('');
    // setSubDistrict('');
    // setRoad('');
    // setSoi('');
    // setHouseReg_file('');
  
    // Show a success message to the user
    alert('Form submitted successfully!');
  };

  const [activeTab, setActiveTab] = useState('menu1');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  ////------------------4------------------
  <HouseholdInfo
    sendHouseNumberToEnroll={sendHouseNumberToEnroll}
    sendMooToEnroll={sendMooToEnroll}
    sendSoiToEnroll={sendSoiToEnroll}
    sendRoadToEnroll={sendRoadToEnroll}
    sendProvinceToEnroll={sendProvinceToEnroll}
    sendDistrictToEnroll={sendDistrictToEnroll}
    sendSubDistrictToEnroll={sendSubDistrictToEnroll}
    sendHouseReg_fileToEnroll={sendHouseReg_fileToEnroll}
  />

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Kanit, sans-serif',
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
         
          <div className="d-flex align-items-center">
              <span style={{flexWrap: 'wrap' }}>บ้านเลขที่ :</span>
          </div>
          <div className="align-items-center"style={{maxWidth:"100%"}}> 
            <input
              type="text"
              className="form-control"
              id="HouseNumber_input"
              name="HouseNumber_input"
              placeholder="กรอกบ้านเลขที่"
              value={HouseNumber}
              // onChange={(e) => setHouseNumber(e.target.value)}
              onChange = {handleHouseNumber}
            />
          </div>
    
          <div className="d-flex align-items-center">
              <span style={{flexWrap: 'wrap' }}>หมู่ที่ :</span>
          </div>
          <div className="align-items-center"style={{maxWidth:"100%"}}> 
            <input
              type="text"
              className="form-control"
              id="Moo_input"
              name="Moo_input"
              placeholder="กรอกหมู่"
              value={Moo}
              onChange = {handleMoo}
              // onChange={(e) => setMoo(e.target.value)}
            />
          </div>
    
          <div className="d-flex align-items-center">
              <span style={{flexWrap: 'wrap' }}>ซอย :</span>
          </div>
          <div className="align-items-center"style={{maxWidth:"100%"}}> 
            <input
              type="text"
              className="form-control"
              id="Soi_input"
              name="Soi_input"
              placeholder="กรอกซอย"
              value={Soi}
              onChange = {handleSoi}
            />
          </div>
    
          <div className="d-flex align-items-center">
            <label>
              <span style={{flexWrap: 'wrap' }}>ถนน :</span>
            </label>
          </div>
          <div className="align-items-center"style={{maxWidth:"100%"}}> 
            <input
              type="text"
              className="form-control"
              id="Road_input"
              name="Road_input"
              placeholder="กรอกถนน"
              value={Road}
              onChange = {handleRoad}
            />
          </div>

        </div>
    
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', fontFamily: 'Kanit, sans-serif', fontSize: '16px', marginTop: '20px' }}>
          <div className="d-flex align-items-center">
           
              <span style={{flexWrap: 'wrap' }}>จังหวัด :</span>
              </div>
              <div class="h-screen flex flex-col justify-left sm:flex-row">
                {/* <div class="sm:w-1_3 sm:pr-3"> */}
                    <div class="dropdown" style={{ maxWidth: "100%" }}>
                        <select value={Province} onChange={handleProvinceChange} class="custom-select">
                            <option value="">กรุณาเลือกจังหวัด</option>
                            {Provinces.map((Province) => (
                                <option key={Province} value={Province}>
                                    {Province}
                                </option>
                            ))}
                        </select>
                    </div>
                {/* </div> */}
            </div>

    
          <div className="d-flex align-items-center">
            
              <span style={{flexWrap: 'wrap' }}>เขต/อำเภอ :</span>
              </div>
              <div class="h-screen flex flex-col justify-left sm:flex-row">
                 <div class="sm:w-1_3 sm:pr-3">
                    <div class="dropdown"style={{maxWidth:"100%"}} >
                      <select value={District} onChange={handleDistrictChange} class="custom-select w-full">
                        <option value="">กรุณาเลือกเขต/อำเภอ</option>
                        {DistrictOptions[Province] && DistrictOptions[Province].map((District) => (
                          <option key={District} value={District}>
                            {District}
                          </option>
                        ))}
                      </select>
                  </div>
                </div>
          </div>
    
          <div className="d-flex align-items-center"style={{ flexWrap: "wrap" }}>
            
              <span style={{  flexWrap: "wrap" }}>แขวง/ตำบล :</span>
              </div>
              <div class="h-screen flex flex-col justify-left sm:flex-row">
                 <div class="sm:w-1_3 sm:pr-3">
                    <div class="dropdown"style={{maxWidth:"100%"}} >
                        <select value={SubDistrict} onChange={handleSubDistrictChange} class="custom-select w-full">
                          <option value="">กรุณาเลือกแขวง/ตำบล</option>
                          {SubDistrictOptions[District] && SubDistrictOptions[District].map((SubDistrict) => (
                            <option key={SubDistrict} value={SubDistrict}>
                              {SubDistrict}
                            </option>
                          ))}
                        </select>
                        </div>
                </div>
          </div>
        </div>
    
        <div style={{ fontSize: '16px',marginTop:"20px"}}>
          <div className="align-items-center"style={{ marginRight: '10px' }}>
          <label className="col-form-label">อัพโหลดไฟล์สำเนาทะเบียนบ้าน :</label>
              
            </div>
              <div className="align-items-center">
              <input type="File" className="form-control" style={{maxWidth:"70%"}} onChange={handleFileUpload} accept=".pdf, .jpg, .jpeg, .png" />
          <br />
        </div>
      
      </div>
      <br></br>

      </form>
    </div>
  );
};

export default HouseholdInfo;
