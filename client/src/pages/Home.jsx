import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
const Home = () => {


  // const user = userDetails.user;
	// const logout = () => {
	// 	window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
	// };

  return (
    <>
      {/* <Navbar/> */}
   
      <Header header="ระบบจัดการสารสนเทศ" subhead="" />  
      
    <div className="d-flex flex-column align-items-center justify-content-center">
  
  <h1 className="mt-5 justify-content-center" >ประชาสัมพันธ์</h1>
 
  <div className="mt-5 list-group"style={{ maxWidth: '90%', height: '100vh' }}>
    {/* <li class="list-group-item"><Card /></li> */}
    <Card />
  </div>
</div>

    </>
  );
}

export default Home