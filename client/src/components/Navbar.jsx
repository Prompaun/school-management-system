import logoImage from '../images/IMG_5416.png';
import React, { useEffect, useState } from 'react';
import { Button,Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import personCircle from '../assets/person-circle.svg';

const Navbar = ({user, Role}) => {
  const apiUrl = process.env.API_URL
  const linkStyle = {
    color: 'gray',
    textDecoration: 'none'
  };

  // const onMessage = '1111'

  const containerStyle = {
    position: 'relative', // เพื่อให้สามารถใส่คำว่า "ระบบ" ลงในภาพได้
    overflow: 'hidden', // ป้องกันข้อความเลื่อนออกนอกพื้นที่ของ container
  };

  const textOverlayStyle = {
    position: 'absolute',
    top: '50%',           // จัดตำแหน่งตรงกลางด้านบน
    left: '50%',          // จัดตำแหน่งตรงกลางด้านซ้าย
    transform: 'translate(-50%, -50%)', // ย้ายข้อความลงมาจากตรงกลางด้านบนและด้านซ้าย
    color: 'white',       // สีของข้อความ
    fontSize: '28px',     // ขนาดของข้อความ
    fontWeight: 'bold',   // ตัวหนา
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // เงาข้อความ
    textAlign: 'center',
    maxWidth: '100vw', // ข้อความจะไม่ขยายเกินภาพพื้นหลัง
    whiteSpace: 'nowrap', // ข้อความจะไม่ขึ้นบรรทัดใหม่
  };

  const imageStyle = {
    filter: 'brightness(25%)',
  };
  const logout = () => {
    window.open(apiUrl + "/auth/logout", "_self");
  };

  const [Pathmenu,setPathmenu] = useState([
    {Path:"/Student_menu"},
    {Path:"/Parent_menu"},
    {Path:"/Personnel_menu"},
  ])
  const [ClassifyRole,setClassifyRole] = useState([
    // {Email:"ClassTeacher@gmail.com",Role:"ClassTeacher"},
    // {Email:"SubjectTeacher@gmail.com",Role:"SubjectTeacher"},
    // {Email:"DepartTeacher@gmail.com",Role:"Administrative"},
    // {Email:"AdminTeacher@gmail.com",Role:"Administrator"},
    // {Email:"Student@gmail.com",Role:"Student"},
    // {Email:"Parent@gmail.com",Role:"Parent"},
    {Email:"NewParent@gmail.com",Role:"NewParent"},
  ])
  const Path = () => {
   if (ClassifyRole[0].Role==="Student") {
    return Pathmenu[0].Path
   }
   if (ClassifyRole[0].Role==="Parent" || ClassifyRole[0].Role==="NewParent") {
    return Pathmenu[1].Path
   }
   if (ClassifyRole[0].Role==="ClassTeacher" || ClassifyRole[0].Role==="SubjectTeacher" || ClassifyRole[0].Role==="Administrative" ||ClassifyRole[0].Role==="Administrator"  ) {
    return Pathmenu[2].Path
   }
  };

  
  console.log('RoleRoleRoleRoleRole',Role);
  useEffect(() => {
      // if (user.Role == "Student") {
      //   setClassifyRole({Role:"Student"});
      // }
      // if (Role){
        // setClassifyRole({Role:Role});
        console.log('RoleRoleRoleRoleRole',Role);
        let a = [{Email:"NewParent@gmail.com",Role:Role}];
        // if (Role){
        setClassifyRole(a)
          
        // }
      // }
      // if (ClassifyRole[0].Role){
      //   console.log(ClassifyRole[0].Role);
      // }

    }, [Role]);

    useEffect(() => {

      console.log("ClassifyRole",ClassifyRole);
    }, [ClassifyRole]);

  return (
    <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark" style={{fontFamily:'Kanit, sans-serif'}}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          {/* Logo and School Name */}
          <div className="container d-flex flex-column align-items-center justify-content-center"style={{ flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap'}}>
          <div className="d-flex align-items-center">
            <img src={logoImage} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
            </div>
            <div style={{flexWrap: 'wrap'}}>
            <h5 style={{marginBottom: '0',flexWrap: 'wrap'}}>โรงเรียนฤทธิยะวรรณาลัย (ประถม)</h5>
            </div>
          </div>
          </div>

        </Link>
        <div className="nav navbar-nav navbar-right" stlye={{display: "flex"}}>
        {user ? (
          <span className='nav-link' style={{display: 'flex', alignItems: 'center'}}>
            
                <Link to={Path()} style={{...linkStyle,marginRight:"15px"}} >
                  เลือกเมนู
                </Link>
              
          <Dropdown>
                <Dropdown.Toggle variant="none" id="dropdown-user" style={{display: 'flex', alignItems: 'center'}}>
                  <span style={{marginRight: '10px'}}>
                  {user.photos[0].value ? (
                      <img
                        // src={personCircle}
                        src={user.photos[0].value}
                        alt=""
                        className="avatar"
                      />
                    ) : (
                      <img
                        // src={user.photos[0].value}
                        src={personCircle}
                        alt=""
                        className="avatar"
                      />
                    )}
                  </span>
                  {/* <span>
                    {user.displayName}+

                  </span> */}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {/* <Link to="/Parent_menu" style={{...linkStyle, marginLeft: '20px'}} >
                    <Dropdown.Item>เลือกเมนู</Dropdown.Item>
                  </Link> */}
                  <Dropdown.Item>
                  <span>
                    {user.displayName}
                  </span>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
        </span> ) 
            : ( //ถ้าไม่มีคน Log in
          <span className='nav-link'> 
            {/* <Link to='/Register' style={{...linkStyle, marginRight: '10px'}}>Register</Link> 
             |   */}
            <Link to='/Login' style={{...linkStyle, marginLeft: '10px'}}>Log in</Link>
          </span>

            )}
          
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar