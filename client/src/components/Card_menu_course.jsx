import React, { useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import general_course_icon from '../images/general_course_icon.png';
import EP_icon from '../images/EP_icon.png';
import axios from 'axios';

function Card_menu_course() {
  const [obj, setObj] = useState([
    {
      text: 'English Program (EP)',
      imageUrl: EP_icon, // แทนที่ด้วย URL รูปภาพจริง
      path: '/Enrollment_info_EP',
    },
    {
      text: 'หลักสูตรทั่วไป',
      imageUrl: general_course_icon, // แทนที่ด้วย URL รูปภาพจริง
      path: '/Enrollment_info',
    },
  ]);
  const [CourseData, setCourseData] = useState([
    // { id: 1, course: 'หลักสูตรทั่วไป', DateStart: '12/03/2024', DateEnd: '02/05/2024' },
    // { id: 2, course: 'English Program (EP)', DateStart: '30/03/2024', DateEnd: '17/04/2024' },
  ]);

  function formatDateThaiYear(dateString) {
    const parts = dateString.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parseInt(parts[2]) + 543; // เพิ่มค่า 543 เพื่อแปลงเป็น พ.ศ.
    return `${day}/${month}/${year}`;
}

  function formatDateEngYear(dateString) {
    const dob = new Date(dateString);
    const day = dob.getDate();
    const month = dob.getMonth() + 1;
    const year = dob.getFullYear() ; // เพิ่มค่า 543 เข้าไปในปีเพื่อแปลงเป็น พ.ศ.
    const formattedDOB = `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
    return formattedDOB;
  }

  async function getRecruitmentPeriod() {
    try {
        const response = await axios.get('http://localhost:8080/get-recruitment-period');
        return response.data;
      } catch (error) {
          console.error('Error fetching Recruitment Period:', error);
          throw error;
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
          try {
            const RecruitmentPeriod = await getRecruitmentPeriod();
            const mappedCourseData = RecruitmentPeriod.map(item => ({
              id: item.id,
              course: item.course,
              DateStart: formatDateEngYear(item.start_date),
              DateEnd: formatDateEngYear(item.end_date)
              }));
              setCourseData(mappedCourseData);
              // console.log(mappedCourseData);
          } catch (error) {
            console.error('Error fetching Recruitment Period:', error);
          }
      };
      fetchData();
    }, []);
 
  const findCourse = (text) => {
    // console.log('text',CourseData.find((course) => course.course.toLowerCase() === text.toLowerCase()));
    return CourseData.find((course) => course.course.toLowerCase() === text.toLowerCase());
  };
  // const [courseDates, setCourseDates] = useState({});
  const isDateInRange = (currentDate, startDate, endDate) => {
    // console.log(currentDate);
    // console.log(startDate);
    // console.log(endDate);
    const [startDay, startMonth, startYear] = startDate.split('/').map(Number);
    const [endDay, endMonth, endYear] = endDate.split('/').map(Number);
    const [day, month, year] = currentDate.split('/').map(Number);

    if (year < startYear || year > endYear) {
      return false;
    }
    if (year === startYear && month < startMonth) {
      return false;
    }
    if (year === endYear && month > endMonth) {
      return false;
    }

    const courseStartDate = new Date(year, startMonth - 1, startDay);
    const courseEndDate = new Date(year, endMonth - 1, endDay);
    const currentDateObj = new Date(year, month - 1, day);

    if (currentDateObj >= courseStartDate && currentDateObj <= courseEndDate) {
      return true;
    };
  
 
  };
  


      const currentDate = new Date().toISOString().slice(0, 10).split('-').reverse().join('/');

      // Find the first course data item that matches the card and is within the enrollment period
      const activeCourseObj = CourseData.find((course) => {
        const matchedCard = obj.find(({ text }) => course.course.toLowerCase() === text.toLowerCase());
        return matchedCard && isDateInRange(currentDate, course.DateStart, course.DateEnd);
      });

      

      const [CourseDate, setCourseDate] = useState({});

      useEffect(() => {
        if (activeCourseObj) {
          setCourseDate({
            start: activeCourseObj.DateStart,
            end: activeCourseObj.DateEnd,
          });
        }
      }, [activeCourseObj]);

    
      
      // Remove the isDateInRange condition from the filter condition
      const filteredObj = obj.filter((item) => {
        // console.log('item',item);
        const courseObj = findCourse(item.text);
        // console.log('courseObj',courseObj);
        if (courseObj && isDateInRange(currentDate, courseObj.DateStart, courseObj.DateEnd)) {
          return true;
        }
      });
  

  return (
    <>
    <div className="flex-wrap">
    {/* {filteredObj.map((item, index) => ( */}
      
        {/* {Annoucement && ( */}
          {/*  {CourseData.map((item, index) => ( */}
            <div  className="row" style={{marginBottom:"20px"}}>
              <ul className="list-group shadow">
                <li className="list-group-item">
                  {/* <!-- Custom content--> */}
                  <div className="media align-items-lg-center flex-column flex-lg-row p-3">
                  <div className="media-body order-2 order-lg-1">
                      <h5 className="mt-0 font-weight-bold mb-2" style={{ fontSize: "20px" }}>
                      <div>
                              {
                                filteredObj.length > 0
                                ?
                                (
                                  <>
                                    <span style={{ color: "red",fontWeight: "bold" ,fontSize:"26px" }}>
                                      ประกาศ :
                                    </span>
                                    {
                                      filteredObj.map((item, index) => {
                                        const currentCourse = CourseData.find((c) => c.course.toLowerCase() === item.text.toLowerCase());

                                        if (currentCourse) {
                                          const textColor = 
                                            item.text.toLowerCase() === 'หลักสูตรทั่วไป'
                                              ? 'blue'
                                              : item.text.toLowerCase() === 'english program (ep)'
                                              ? 'green'
                                              : 'initial';

                                          return (
                                            <React.Fragment key={index}>
                                              {
                                                index > 0 &&
                                                <span style={{marginLeft:"5px"}}>
                                                  <br />และ
                                                </span>
                                              }
                                              <span style={{ color: textColor,fontWeight: "bold",marginLeft:"5px"}}>
                                                {item.text}</span>
                                                
                                                <span style={{marginLeft:"5px"}}>จะเปิดรับสมัครตั้งแต่วันที่</span> 
                                                <span style={{ color: textColor,fontWeight: "bold",marginLeft:"5px" }}>
                                                {formatDateThaiYear(currentCourse.DateStart)} </span>
                                                <span style={{marginLeft:"5px"}}>จนถึงวันที่</span>
                                                <span style={{ color: textColor,fontWeight: "bold",marginLeft:"5px"}}>
                                                {formatDateThaiYear(currentCourse.DateEnd)}
                                                </span>
                                            </React.Fragment>
                                          );
                                        }

                                        return <React.Fragment key={index} />;
                                      })
                                      .filter(item => item)
                                    }
                                  </>
                                )
                                :
                                <>
                                <span style={{ color: "red",fontWeight: "bold" ,fontSize:"26px" }}>
                                  ประกาศ : 
                                </span>
                                <span style={{marginLeft:"5px"}}>
                                ยังไม่มีการเปิดรับสมัครนักเรียนใหม่ขณะนี้
                              </span>
                              </>
                              }
                            </div>
                      </h5>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
             {/* ))} */}

          {/*  )} */}
          <div className="d-flex align-items-center justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', fontFamily: 'Kanit, sans-serif'}}>
            {filteredObj.map((item, index) => (
              <div key={index} className="card-menu" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)', alignItems: 'center' }}>
                <div className="card-body">
                  <p className="card-text mt-3" style={{ textAlign: 'center',margin: "5px" }}>{item.text}</p>
                </div>
                <NavLink to={item.path}>
                  <img src={item.imageUrl} className="card-img-top" alt={item.text} style={{ width: '85%', height: 'auto', marginLeft:"20px" }} />
                </NavLink>
              </div>
            ))}
          </div>
          
     
          </div>

        </>
      );
}

export default Card_menu_course