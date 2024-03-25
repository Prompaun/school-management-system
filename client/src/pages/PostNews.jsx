import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Link ,useNavigate} from 'react-router-dom';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";
import Modal_loading from '../components/Modal_loading';
import Modal_success from '../components/Modal_success';
function PostNews() {
  const fontStyle = {
    fontFamily: 'Kanit, sans-serif',
    textDecoration: 'none'
  };
  const [Newstitle, setNewstitle] = useState("");
  const [NewsContent, setNewsContent] = useState("");
  const [NewsURL, setNewsURL] = useState("");
  const titleRef = useRef();
  const contentRef = useRef();
  const navigate = useNavigate();

  const handleNewstitleChange = (e) => {
    setNewstitle(e.target.value);
  };

  const handleNewsContentChange = (e) => {
    setNewsContent(e.target.value);
  };

  const handleNewsURLChange = (e) => {
    setNewsURL(e.target.value);
  };

  const handleSubmitform = (event) => {
    if (CheckInputData()) {
    //   navigate("/");
        // setShowLoadingModal(true);
        setShowSuccessModal(true);
    }

    return true;
  };

  const CheckInputData = () => {
    if (titleRef.current.value === "") {
      alert("กรุณากรอกหัวข้อของข่าวสาร");
      titleRef.current.focus();
      titleRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => titleRef.current.focus(), 100);
      return  false;
    }
    if (contentRef.current.value === "") {
      alert("กรุณากรอกเนื้อหาของข่าวสาร");
      contentRef.current.focus();
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => contentRef.current.focus(), 100);
      return  false; 
    }

    return true;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [NewsData, setNewsData] = useState([
    {id:1, title: "ประกาศรับสมัครนักเรียนใหม่", content: "รับสมัครนักเรียนใหม่ แผนการเรียน English Program (EP)",link:""},
    {id:2, title: "ระเบียบการลงทะเบียนสำหรับผู้ใช้ใหม่", content: "ขั้นตอนการลงทะเบียนเข้าสู่ระบบ",link:"https://shorturl.at/xDVZ6"},

]);
// const [obj,setObj] = useState([
//     {
//         title: "ประกาศรับสมัครนักเรียนใหม่",
//         content: "รับสมัครนักเรียนใหม่ แผนการเรียน English Program (EP)",
//         link:"",
//         DateTime : "12-10-2565"
//     },
//     {
//         title: "ระเบียบการลงทะเบียนสำหรับผู้ใช้ใหม่",
//         content: "ขั้นตอนการลงทะเบียนเข้าสู่ระบบ",
//         link:"https://shorturl.at/xDVZ6",
//         DateTime : "12-10-2565"
//     }
//   ]);

const [editingId, setEditingId] = useState(null);
const handleEditRow = (id) => {
    setEditingId(id === editingId ? null : id);
   
  };
  
  const handleChange = (id, field, value) => {
    setNewsData(
        NewsData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleDeleteRow = (id) => {


    setNewsData(NewsData.filter((row) => row.id !== id));
  };
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <>

    {showLoadingModal && (
          <Modal_loading show={showLoadingModal} setShow={setShowLoadingModal} />
    )}
    {showSuccessModal && (
          <Modal_success 
          show={showSuccessModal} 
          setShow={setShowSuccessModal} 
          link="/" 
          text="ระบบได้โพสต์ข่าวประชาสัมพันธ์แล้ว"
          />
        )}
      <Header
        header="ระบบจัดการสารสนเทศ"
        subhead="บริการสำหรับบุคลากรภายในโรงเรียน"
      />
      <div
        style={{
          height: "150vh",
          fontFamily: "Kanit, sans-serif",
        }}
      >
        <div className="container">
          <div className="flex-column">
            <div className="justify-content-center">
              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
                  โพสต์ข่าวประชาสัมพันธ์
                </h2>
              </div>

              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "20px" }}>
                <div className="card" style={{ width: "100%" , boxShadow: "2px 7px 7px rgba(0, 0, 0.2, 0.1)" }}>
                  <div className="card-body">
                    <div className="form-group col-md-0 fone" style={{ padding: "10px" }}>
                      <div className="d-flex align-items-center"style={{ flexWrap: "wrap" }}>
                        <span style={{ margin: "10px", fontWeight: "bold", fontSize: "20px" }}>หัวข้อ</span>
                      </div>

                      <div className="d-flex align-items-center" style={{flexWrap: "wrap" }}>
                      <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={Newstitle}
                            onChange={handleNewstitleChange}
                            required
                            ref={titleRef}
                            style={{border: '1px solid #ccc'}}
                            />
                      </div>

                      <div className="d-flex align-items-center" style={{ flexWrap: "wrap" }}>
                        <span style={{ margin: "10px", fontWeight: "bold", fontSize: "20px" }}>เนื้อหา</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <textarea
                          className="form-control"
                          id="content"
                          name="content"
                          value={NewsContent}
                          onChange={handleNewsContentChange}
                          required
                          ref={contentRef}
                          style={{border: '1px solid #ccc'}}

                        />
                      </div>

                      <div className="d-flex align-items-center" style={{ flexWrap: "wrap" }}>
                        <span style={{ margin: "10px", fontWeight: "bold", fontSize: "20px" }}>Link URL</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control"
                          id="url"
                          name="url"
                          value={NewsURL}
                          onChange={handleNewsURLChange}
                          // required
                          style={{border: '1px solid #ccc'}}

                        />
                      </div>
                      <br />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>

                          <button 
                              type="submit" 
                              className="btn btn-primary custom-font" 
                              style={{
                              ...fontStyle, 
                              color: 'white', 
                              fontSize: '16px', 
                              textAlign: 'center', 

                              width:"100%"

                              }}
                            onClick={handleSubmitform}
                          >
                              <span>โพสต์ข่าวสาร</span>
                          </button>
                       

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container d-flex align-items-center" style={{ flexWrap: "wrap", marginTop: "40px" }}>
                <h2 className="card-heading" style={{ fontSize: "25px", fontWeight: "bold" }}>
                  จัดการข่าวสาร
                </h2>
              </div>
                <br />
              <div className="container align-items-center">
                           
                            <div className="d-flex justify-content-center" style={{ height: 'auto', overflowY: 'auto' }}>
                            <div className="table-responsive">
                            <table className="table table-bordered table-hover table-striped" style={{ borderCollapse: 'collapse', textAlign: 'center',fontFamily: 'Kanit, sans-serif' }}>
                                    <thead>
                                        <tr style={{ height: '50px',backgroundColor: '#FFFFFF', fontWeight: 'bold',fontSize:"18px"  }}>
                                            <th rowSpan="1" >โพสต์ที่</th>
                                            <th rowSpan="1">หัวข้อ</th>
                                            <th rowSpan="1" >เนื้อหา</th>
                                            <th rowSpan="1" >LinkURL</th>
                                            
                                            <th rowSpan="1">แก้ไข</th>
                                            <th rowSpan="1">ลบ</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {NewsData.map((row,index) => (
                                            <tr key={row.id} style={{ height: '50px' }}>
                                            <td >{index+1}</td>
                                            <td >
                                                {editingId === row.id ? (
                                                <textarea
                                                    type="text"
                                                    value={row.title}
                                                    onChange={(e) => handleChange(row.id, 'title', e.target.value)}
                                                />
                                                ) : (
                                                row.title
                                                )}
                                            </td>
                                            <td >
                                                {editingId === row.id ? (
                                                <textarea
                                                    type="text"
                                                    value={row.content}
                                                    onChange={(e) => handleChange(row.id, 'content', e.target.value)}
                                                />
                                                ) : (
                                                row.content
                                                )}
                                            </td>
                                            <td >
                                                {editingId === row.id ? (
                                                <textarea
                                                    type="text"
                                                    value={row.link}
                                                    onChange={(e) => handleChange(row.id, 'link', e.target.value)}
                                                />
                                                ) : (
                                                row.link
                                                )}
                                            </td>
                                            <td >
                                                <span className="actions"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                    onClick={() => handleEditRow(row.id)}
                                                >
                                                    {editingId === row.id ? <BsFillFloppy2Fill /> : <BsFillPencilFill />}
                                                </span>
                                                </td>
                                            <td >
                                                <span className="actions"
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                                onClick={() => handleDeleteRow(row.id)}
                                                >
                                                <BsFillTrashFill
                                                    className="delete-btn"
                                                />
                                                </span>
                                            </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                </table>
                                
                                <br />
                                
                            </div>
                        </div>
                        </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostNews