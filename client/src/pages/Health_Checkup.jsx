import React from 'react';
// import './Health_Checkup.scss';
//  style={{ gridColumn: 'span 1', gridRow: 'span 3' }}
const Health_Checkup = () => {

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  return (
    // <div className="card mx-auto mt-5" style={{ ...fontStyle, width: '1000px', boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
    //   <div className="card-body">
        <div className="Health_Checkup" style={{ ...fontStyle }}>
          
          <div className="box box1" style={{ position: 'relative' }}>
            การตรวจสายตา
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, left: 0 }}>แก้ไข</span>

            <span style={{ position: 'absolute', padding: '20px', bottom: 0, right: 0 }}>
              <i
                className="fs-5 bi-search"
                style={{ color: 'black', marginRight: '5px' }}
              ></i>
              ดูเพิ่มเติม
            </span>


            <div className="nested-box">
              -
            </div>

          </div>

          <div className="box box1" style={{ position: 'relative' }}>
            การได้ยิน
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, left: 0 }}>แก้ไข</span>
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, right: 0 }}>
              <i
                className="fs-5 bi-search"
                style={{ color: 'black', marginRight: '5px' }}
              ></i>
              ดูเพิ่มเติม
            </span>
            <div className="nested-box">
              -
            </div>
          </div>
          
          <div className="box box1" style={{ position: 'relative' }}>
            สภาพฟัน/สุขภาพช่องปาก
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, left: 0 }}>แก้ไข</span>
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, right: 0 }}>
              <i
                className="fs-5 bi-search"
                style={{ color: 'black', marginRight: '5px' }}
              ></i>
              ดูเพิ่มเติม
            </span>
            <div className="nested-box">
              -
            </div>
          </div>
          
          {/* <div className="box box4" style={{ position: 'relative' }}>
            การผ่าตัด/อุบัติเหตุร้ายแรง
            <span style={{ position: 'absolute', padding: '20px', top: 0, right: 0 }}>
              <i
                className="fs-5 bi-search"
              ></i>
            </span>
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, right: 0 }}>แก้ไข</span>
            <div className="nested-box">
              -
            </div>
          </div> */}
          
        </div>
    //   </div>
    // </div>
  );
};

export default Health_Checkup;