import React, { useState } from 'react';

// import Navbar from '../components/Navbar'
import Medical_History from '../pages/Medical_History';
import Vaccinated from '../pages/Vaccinated';
import Health_Checkup from '../pages/Health_Checkup';
import Result_health_data from '../pages/Result_health_data';
import Growth_nutrition from '../pages/Growth_nutrition';

const Tab_health = () => {

    const linkStyle = {
        color: 'gray',
        textDecoration: 'none'
      };
    
    const fontStyle = {
        color: 'white',
        fontFamily: 'Kanit, sans-serif',
        textDecoration: 'none'
      };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [activeTab, setActiveTab] = useState('menu1');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };
    return (
        
        
        <div class="card" style={{width: 'auto', height: 'auto'}}>
          <div class="card-header">
                <ul class="nav nav-tabs card-header-tabs">
                    <li class="nav-item">
                    <a
                        class={`nav-link ${activeTab === 'menu1' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        href="#menu1"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                        onClick={() => handleTabChange('menu1')}
                        >Overview
                    </a>
                    </li>
                    <li class="nav-item">
                    <a
                        class={`nav-link ${activeTab === 'menu2' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        href="#menu2"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                        onClick={() => handleTabChange('menu2')}
                        >ประวัติการเจ็บป่วย</a>
                    </li>
                    <li class="nav-item">
                    <a
                        class={`nav-link ${activeTab === 'menu3' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        href="#menu3"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                        onClick={() => handleTabChange('menu3')}
                        >การให้ภูมิคุ้มกัน</a>
                    </li>
                    <li class="nav-item">
                    <a
                        class={`nav-link ${activeTab === 'menu4' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        href="#menu4"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                        onClick={() => handleTabChange('menu4')}
                        >การตรวจสุขภาพ</a>
                    </li>
                    <li class="nav-item">
                    <a
                        class={`nav-link ${activeTab === 'menu5' ? 'active' : ''}`}
                        data-bs-toggle="tab"
                        href="#menu5"
                        style={{ fontFamily: 'Kanit, sans-serif' }}
                        onClick={() => handleTabChange('menu5')}
                        >การเจริญเติบโตและภาวะโภชนาการ</a>
                    </li>
                    
                </ul>
            </div>
            <div class="card-body" > 
                <div class="tab-content">
                    <div class={`tab-pane container ${activeTab === 'menu1' ? 'active' : ''}`} id="menu1" ><Result_health_data/></div>
                    <div class={`tab-pane container ${activeTab === 'menu2' ? 'active' : ''}`} id="menu2"><Medical_History/></div>
                    <div class={`tab-pane container ${activeTab === 'menu3' ? 'active' : ''}`} id="menu3"><Vaccinated/></div>
                    <div class={`tab-pane container ${activeTab === 'menu4' ? 'active' : ''}`} id="menu4"><Health_Checkup/></div>
                    <div class={`tab-pane container ${activeTab === 'menu5' ? 'active' : ''}`} id="menu5"><Growth_nutrition/></div>
                </div>
            </div>
            </div>
           
      
    );
};

export default Tab_health;
