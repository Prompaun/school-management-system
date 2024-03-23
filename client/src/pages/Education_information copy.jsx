import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import school_logo from "../images/IMG_5416.png";

// import Navbar from '../components/Navbar'
import Header from '../components/Header';
const Education_information = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [selectedSemester, setSelectedSemester] = useState('เลือกปีการศึกษา');
    const handleSelectChange = (event) => {
        setSelectedSemester(event.target.value);
      };

    return (
        <>
            <nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                {/* Logo and School Name */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={school_logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                    <h5 style={{ textAlign: 'right', marginLeft: '10px', marginBottom: '0' }}>โรงเรียนฤทธิยะวรรณาลัย (ประถม)</h5>
                </div>
                </Link>
                <div className="nav navbar-nav navbar-right">
                <span className='nav-link'>
                <Link
                        to = "/"
                        style={{ ...linkStyle, fontFamily: 'Kanit, sans-serif' }}>
                        เลือกเมนู
                    </Link>
                </span>
                </div>
            </div>
            </nav>

            <Header header="ระบบจัดการข้อมูลการศึกษา" subhead="" />  
             
            <div className="card w-40 mx-auto mt-5" style={{ boxShadow: '1px 2px 12px 4px rgba(0, 0, 0, 0.2)' }}>
                <div className="card-body">
                    {/* ,fontWeight: 'bold' */}
                    <div className="row" style={{ fontFamily: 'Kanit, sans-serif', fontSize: '20px', marginRight: '5px', gap: '0'}}>
                        <div className="col-sm d-flex align-items-center">
                            <label htmlFor="father_data" className="col-form-label mb-0 mx-2">Filter</label>
                        </div>
                    </div>
                    
                    <div className="row" style={{ fontFamily: 'Kanit, sans-serif', fontSize: '18px', marginRight: '5px', gap: '0'}}>
                    
                    <div className="col-sm d-flex align-items-center">
                            <label htmlFor="father_data" className="col-form-label mb-0 mx-2">ปีการศึกษา</label>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', whiteSpace: 'nowrap', fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>
                        <div className="col-sm-0 d-flex align-items-center">
                            {/* <label htmlFor="father_Occupation" className="col-form-label mb-0 mx-2">วุฒิการศึกษา</label> */}
                            <div class="dropdown px-2" style={{ width: '150px' }}> {/* กำหนดความกว้างของ dropdown ที่นี่ */}
                                <select value={selectedSemester} onChange={handleSelectChange} class="custom-select" style={{ width: '350px' }}> {/* กำหนดความกว้างของตัวเลือกใน dropdown ที่นี่ */}
                                    <option value="เลือกปีการศึกษา">เลือกปีการศึกษา</option>
                                    <option value="2560">2560</option>
                                    <option value="2561">2561</option>
                                    <option value="2562">2562</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Education_information;
