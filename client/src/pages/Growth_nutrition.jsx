import React from 'react';

const Growth_nutrition = () => {

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  return (
    <>
      <div className="Growth-nutrition" style={{ ...fontStyle }}>
          <div className="box box1" style={{ position: 'relative' }}>
          <h3 className="ms-3 mb-0"style={{ fontWeight:'bold' }}>ข้อมูลสุขภาพ</h3>
            <div className="nested-box">
            <p className="ms-1 mb-0">วันที่ตรวจสุขภาพ :</p>
            <p className="ms-1 mb-0">อายุ (ปี-เดือน) :</p>
            <p className="ms-1 mb-0">น้ำหนัก (kg.) :</p>
            <p className="ms-1 mb-0">ส่วนสูง (cm.) :</p>
            </div>


          </div>

          <div className="box box2" style={{ position: 'relative' }}>
          <p className="ms-3 mb-0"style={{ fontWeight:'bold' }}>กราฟน้ำหนักตามเกณฑ์ส่วนสูง</p>
            <div className="graph">
              
            </div>
          </div>
          
          <div className="box box3" style={{ position: 'relative' }}>
          <p className="ms-3 mb-0"style={{ fontWeight:'bold' }}>กราฟส่วนสูงตามเกณฑ์อายุ</p>
            <div className="graph">
              
            </div>
          </div>
          
          <div className="box box4" style={{ position: 'relative' }}>
          <p className="ms-3 mb-0"style={{ fontWeight:'bold' }}>กราฟน้ำหนักตามเกณฑ์อายุ</p>
            <div className="graph">
              
            </div>
          </div>
          
        </div>
          
     
    </>
  );
};

export default Growth_nutrition;
