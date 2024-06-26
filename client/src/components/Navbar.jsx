import logoImage from '../images/IMG_5416.png';
import React, { useEffect, useState } from 'react';
import { Button,Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import personCircle from '../assets/person-circle.svg';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import { Link ,useNavigate} from 'react-router-dom';
import {gapi} from 'gapi-script';

const Navbar = ({user, studentUser,Role}) => {
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

    navigate("/")
    window.location.reload()
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

    // useEffect(() => {

    //   console.log("ClassifyRole",ClassifyRole);
    // }, [ClassifyRole]);

        // useEffect(() => {
    //   setUser(user);
    // }, [user]);

    // useEffect(() => {

    //   console.log("ClassifyRole",ClassifyRole);
    // }, [ClassifyRole]);
    const navigate = useNavigate();
    const ClientID = process.env.CLIENT_ID;
        useEffect(() => {
            const initClient = () => {
            gapi.client.init({
                cliendId: ClientID,
                scope: ''
            })
        }
        gapi.load("client:auth2", initClient)
        },[])
    
        const onSuccess = (res) => {
          // const email = res.profileObj.email;
          if(res){
              
              updateProfile(null);
          }
          
          navigate("/")
          window.location.reload()
      };
     


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
            {user && Role==="Student" ? (
               <span className='nav-link' style={{display: 'flex', alignItems: 'center'}}>
                
               <Link to={Path()} style={{...linkStyle,marginRight:"15px"}} >
                 เลือกเมนู
               </Link>
             
         <Dropdown>
               <Dropdown.Toggle variant="none" id="dropdown-user" style={{display: 'flex', alignItems: 'center'}}>
                 <span style={{marginRight: '10px'}}>
               
                 {user.imageUrl ? (
                     <img
                      
                       src={user.imageUrl}
                    
                       alt=""
                       className="avatar"
                     />
                   ) : (
                     <img
                       
                       src={personCircle}
                       alt=""
                       className="avatar"
                       style={{ filter: 'brightness(0) invert(1)' }}
                     />
                   )}
                 </span>
                
               </Dropdown.Toggle>
    
               <Dropdown.Menu>
               
                 <Dropdown.Item>
                 <span>
                   {/* {user.email} */}
                   {user.name}
                   {/* {user.email} */}
                 </span>
                 </Dropdown.Item>
                 <Dropdown.Item onClick={logout}>Log Out</Dropdown.Item>
               </Dropdown.Menu>
             </Dropdown>
            </span>
            ) : user && Role !== "Student"? (
             
    
            <span className='nav-link' style={{display: 'flex', alignItems: 'center'}}>
                        
            <Link to={Path()} style={{...linkStyle,marginRight:"15px"}} >
              เลือกเมนู
            </Link>
    
            <Dropdown>
            <Dropdown.Toggle variant="none" id="dropdown-user" style={{display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: '10px'}}>
              {/* {user.photos[0].value ? ( */}
              {user.imageUrl ? (
                  <img
                
                    src={user.imageUrl}
                
                    alt=""
                    className="avatar"
                  />
                ) : (
                  <img
                    // src={user.photos[0].value}
                    src={personCircle}
                    alt=""
                    className="avatar"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                )}
              </span>
              {/* <span>
                {user.displayName}+
    
              </span> */}
            </Dropdown.Toggle>
    
            <Dropdown.Menu>
            
              <Dropdown.Item>
              <span>
                {/* {user.email} */}
                {user.name}
                </span>
                <br />
                <span>
    
                {user.email}
              </span>
              </Dropdown.Item>
              <Dropdown.Item>
              <GoogleLogout
                  clientId={ClientID} 
                  buttonText='Log Out'
                  onLogoutSuccess={onSuccess}
                  style={{fontFamily:'Kanit, sans-serif'}}
                />
              </Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </span>
            ) : (
              <span className='nav-link'>
                <Link to='/Login' style={{...linkStyle, marginLeft: '10px' }}>Log in</Link>
              </span>
            )}
              
              
            </div>
          </div>
        </nav>
      );
    }
    
    export default Navbar