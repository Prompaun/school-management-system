import React from 'react';

const Medical_History = () => {

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  return (
    // <div className="card mx-auto mt-5" style={{ ...fontStyle, width: '1000px', boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
    //   <div className="card-body">
        <div className="Medical_History" style={{ ...fontStyle }}>
          <div className="box box1" style={{ position: 'relative' }}>
            โรคประจำตัว
            <span style={{ position: 'absolute', padding: '20px', top: 0, right: 0 }}>
              <i
                className="fs-5 bi-search"
              ></i>
            </span>
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, right: 0 }}>แก้ไข</span>

            <div className="nested-box">
              -
            </div>

          </div>

          <div className="box box2" style={{ position: 'relative' }}>
            โรคที่เคยเป็น
            <span style={{ position: 'absolute', padding: '20px', top: 0, right: 0 }}>
              <i
                className="fs-5 bi-search"
              ></i>
            </span>
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, right: 0 }}>แก้ไข</span>
            <div className="nested-box">
              -
            </div>
          </div>
          
          <div className="box box3" style={{ position: 'relative' }}>
            อาหาร/ยา/สารที่แพ้
            <span style={{ position: 'absolute', padding: '20px', top: 0, right: 0 }}>
              <i
                className="fs-5 bi-search"
              ></i>
            </span>
            <span style={{ position: 'absolute', padding: '20px', bottom: 0, right: 0 }}>แก้ไข</span>
            <div className="nested-box">
              -
            </div>
          </div>
          
          <div className="box box4" style={{ position: 'relative' }}>
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
          </div>
          
        </div>
    //   </div>
    // </div>
  );
};

export default Medical_History;
