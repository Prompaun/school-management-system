import React from 'react';

const Vaccinated = () => {

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  return (
    <>
     {/* <div className="card mx-auto mt-5" style={{ ...fontStyle, width: '1000px', boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
       <div className="card-body"> */}
    {/* <div className="container mt-5" style={{ ...fontStyle }}> */}
       
          {/* <h2 className="ms-3 mb-0">วัคซีนพื้นฐาน</h2> */}
        
        <div className="Dashboard-vac"style={{ ...fontStyle }}>
            
          <div className="box box1" style={{ position: 'relative' }}>
          <h2 className="ms-3 mb-0"style={{ fontWeight:'bold' }}>วัคซีนพื้นฐาน</h2>
          <br />
            Vaccinated
            {/* <span style={{ position: 'absolute', padding: '20px', top: 0, right: 0 }}>
            แก้ไข
            </span> */}
            <div className="nested-box-Vacinated">
              -
            </div>
            <br />
            Not vaccinated
            <div className="nested-box-Not-Vacinated">
              -
            </div>
          </div>
          
          <div className="box box1" style={{ position: 'relative' }}>
          <h2 className="ms-3 mb-0" style={{ fontWeight:'bold' }}>วัคซีนทางเลือก</h2>
          <br />
            Vaccinated
            {/* <span style={{ position: 'absolute', padding: '20px', top: 0, right: 0 }}>
            แก้ไข
            </span> */}
            <div className="nested-box-Vacinated">
              -
            </div>
            {/* <br />
            Not vaccinated
            <div className="nested-box-Not-Vacinated">
              -
            </div> */}
          </div>
          </div>

         

          {/* </div> */}
          
     
    </>
  );
};

export default Vaccinated;
