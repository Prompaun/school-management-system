import React, { useState } from 'react';

const Card = () => {
  const [obj,setObj] = useState([
    {
        title: "ประกาศรับสมัครนักเรียนใหม่",
        content: "รับสมัครนักเรียนใหม่ แผนการเรียน English Program (EP)",
        link:"",
        DateTime : "12-10-2565"
    },
    {
        title: "ระเบียบการลงทะเบียนสำหรับผู้ใช้ใหม่",
        content: "ขั้นตอนการลงทะเบียนเข้าสู่ระบบ",
        link:"https://shorturl.at/xDVZ6",
        DateTime : "12-10-2565"
    }
  ]);

  // Add this CSS className to your CSS file
const linkText = {
  color: 'blue',
  textDecoration: 'underline',
  font:"18px"
};
  return (
    <>
      {obj.map((item, index) => (
        <div key={index} >
          <div className="row">
            <ul className="list-group shadow">
              {/* <!-- list group item--> */}
              <li className="list-group-item">
                {/* <!-- Custom content--> */}
                <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                  <div className="media-body order-2 order-lg-1">
                    <h5 className="mt-0 font-weight-bold mb-2"style={{fontSize:"22px"}}>{item.title}</h5>
                    
                    <p className="font-italic text-muted mb-0" style={{fontSize:"18px"}}>{item.content}</p>
                    
                    {item.link && (
                      
                      <a href={item.link} target="_blank" rel="noopener noreferrer"style={{...linkText}}>{item.link}</a>
        
                    )}
                    
                  {/* <img src="https://i.imgur.com/KFojDGa.jpg" alt="Generic placeholder image" width="100%" /> */}
                    
                    <div className="d-flex align-items-center justify-content-between mt-1">
                      <h6 className="font-weight-bold my-2">{item.DateTime}</h6>
                      <ul className="list-inline small">
                        <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
                      </ul>
                    </div>
                  </div>
                  {/* <img src="https://i.imgur.com/KFojDGa.jpg" alt="Generic placeholder image" width="200" className="ml-lg-5 order-1 order-lg-2"/> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </>
  );
}

export default Card;