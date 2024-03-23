import React from 'react';
// import './Result_health_data.scss';
//  style={{ gridColumn: 'span 1', gridRow: 'span 3' }}
const Result_health_data = () => {

  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };

  return (
    <div className="Result_health_data" style={{ ...fontStyle }}>
      
        {/* <div className="card " style={{maxWidth: "300px", border: '1px solid white' }}> */}
            {/* <div className="card-body"> */}
              <div className="box box3" style={{ position: 'relative' }}>
              {/* <div className="form-group col-md-0 fone" style={{ padding: '32px', margin: '10px', whiteSpace: "nowrap" }}> */}
                ผลสรุปการตรวจสุขภาพ
                {/* <br /><br /><br /><br /><br /><br /><br /> */}
              {/* </div> */}

            </div>
          {/* </div> */}
        {/* </div> */}

      <div class="arrow-right box2" style={{ position: 'relative' }}>
      </div>

      {/* <div className="card " style={{maxWidth: "300px", border: '1px solid white' }}> */}
        {/* <div className="card-body"> */}
          <div className="box box3" style={{ position: 'relative' }}>
            การเจริญเติบโตและภาวะโภชนาการ
            {/* <br /><br /><br /><br /><br /><br /><br /> */}
          </div>
        {/* </div> */}
      {/* </div> */}
      
      <div class="arrow-right box2" style={{ position: 'relative' }}>
      </div>

      <div className="cloud box4" style={{ position: 'relative', top: '50%', transform: 'translateY(-30%)'}}>
        สุขภาพแข็งแรงดี
      </div>

    </div>
  );
};

export default Result_health_data;