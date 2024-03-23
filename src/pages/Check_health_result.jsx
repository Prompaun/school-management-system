import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Tab_health from '../components/Tab_health';

function Check_health_result() {
    const [selectedOption, setSelectedOption] = useState('ระบุหมายเหตุ');

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
      
      return (
        <>
        {/* <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="src\images\IMG_5416.png" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" style={{ float: 'left', marginRight: '10px' }} />
            <span style={{  fontFamily: 'Kanit, sans-serif',marginLeft: '0px' }}>โรงเรียนฤทธิยะวรรณาลัย (ประถม)</span>
          </Link>
          <div className="nav navbar-nav navbar-right">
            <span className='nav-link'>
            <Link to='/Parent_menu' style={{ ...linkStyle, fontFamily: 'Kanit, sans-serif' }}>เลือกเมนู</Link>
            </span>
          </div>
        </div>
      </nav>  */}
       
      
      <Header header="ผลการตรวจสุขภาพของนักเรียน" subhead=""/>
      <br></br>
      <br></br>
    {/* <div class="container justify-content-center"> */}
    <div className="mt-2 d-flex flex-column align-items-center"style={{ height: '100vh'}}>
        <Tab_health/>
        </div> 
      <br></br>
      <br></br>
      </>
      ) 
}

export default Check_health_result