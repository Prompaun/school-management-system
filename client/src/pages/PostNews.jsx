import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import { Link ,useNavigate} from 'react-router-dom';
import { BsFillTrashFill, BsFillPencilFill,BsFillFloppy2Fill } from "react-icons/bs";
import Modal_loading from '../components/Modal_loading';
import Modal_success from '../components/Modal_success';
import Modal_confirm from '../components/Modal_confirm';
import { Button, Modal,Spinner } from 'react-bootstrap';

import axios from 'axios';
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

  const handleSubmitform = async (event) => {
    if (CheckInputData()) {
        setshowConfirmModal(false);
        setShowLoadingModal(true);
        if (Newstitle !== '' && NewsContent !== ''){
          const currentDate = new Date(); // สร้างวันที่และเวลาปัจจุบัน
          const formattedDate = currentDate.toISOString().split('T')[0]; // แปลงเป็น ISO 8601 และดึงวันที่ออกมา
          
          console.log(formattedDate); // ผลลัพธ์: '2024-03-29'
          await addPostNews(Newstitle, NewsContent, NewsURL, formattedDate);
        }
        try {
            const PostNews = await getPostNews();
            const mappedPostNews = PostNews.map(item => ({
                id: item.id,
                title: item.topic,
                content: item.content,
                link: item.link
            }));
            setNewsData(mappedPostNews);
            setShowLoadingModal(false);
            
        } catch (error) {
            console.error('Error fetching news:', error);
        }
        // setShowLoadingModal(false);

        setShowSuccessModal(true);
        setNewstitle("");
        setNewsContent("");
        setNewsURL("");
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
  const [NewsData, setNewsData] = useState([]);

  async function getPostNews() {
    try {
        const response = await axios.get('http://localhost:8080/get-news');
        return response.data;
      } catch (error) {
          console.error('Error fetching news:', error);
          throw error;
      }
    };

  async function addPostNews(topic, content, link, date) {
    try {
        const response = await axios.post('http://localhost:8080/add-post-news', {
            topic: topic,
            content: content,
            link: link,
            date: date
        });
        console.log('Post news added successfully');
        return response.data;
      } catch (error) {
          console.error('Error adding post news:', error);
          throw error;
      }
    }

  // async function deletePost(postId) {
  //   try {
  //       const response = await fetch(`http://localhost:8080/delete-post/${postId}`, {
  //           method: 'DELETE'
  //       });

  //       if (!response.ok) {
  //           throw new Error('Failed to delete post');
  //       }

  //         const data = await response.json();
  //         console.log(data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
  //       } catch (error) {
  //           console.error('Error deleting post:', error);
  //       }
  //     }
    async function deletePost(postId) {
      try {
          const response = await axios.delete(`http://localhost:8080/delete-post/${postId}`);
  
          if (!response.status === 200) {
              throw new Error('Failed to delete post');
          }
  
          console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
      } catch (error) {
          console.error('Error deleting post:', error);
      }
    }
    

    async function updatePost(postId, updatedData) {
      try {
          const response = await axios.put(`http://localhost:8080/update-post/${postId}`, updatedData);
  
          if (!response.data || response.data.error) {
              throw new Error('Failed to update post');
          }
  
          console.log(response.data.message); // แสดงข้อความที่ได้รับจากเซิร์ฟเวอร์
      } catch (error) {
          console.error('Error updating post:', error);
      }
    }

  useEffect(() => {
    const fetchData = async () => {
        try {
          const PostNews = await getPostNews();
          const mappedPostNews = PostNews.map(item => ({
            id: item.id,
            title: item.topic,
            content: item.content,
            link: item.link
            }));
          setNewsData(mappedPostNews);
        } catch (error) {
          console.error('Error fetching semesters:', error);
        }
    };
    fetchData();
  }, []);

//   const [NewsData, setNewsData] = useState([
//     {id:1, title: "ประกาศรับสมัครนักเรียนใหม่", content: "รับสมัครนักเรียนใหม่ แผนการเรียน English Program (EP)",link:""},
//     {id:2, title: "ระเบียบการลงทะเบียนสำหรับผู้ใช้ใหม่", content: "ขั้นตอนการลงทะเบียนเข้าสู่ระบบ",link:"https://shorturl.at/xDVZ6"},

// ]);
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
const [topic, setTopic] = useState();
const handleEditRow = async (id) => {
  setEditingId(id === editingId ? null : id);

  if (editingId === id) {
      const selectedItem = NewsData.find((item) => item.id === id);
      
      if (selectedItem.title !== '' && selectedItem.content !== '') {
          const currentDate = new Date();
          const formattedDate = currentDate.toISOString().split('T')[0];
          
          const updatedData = {
              topic: selectedItem.title,
              content: selectedItem.content,
              link: selectedItem.link,
              date: formattedDate
          };

          console.log("Updated Data", id, updatedData);
          
          try {
              await updatePost(id, updatedData);
          } catch (error) {
              console.error('Error updating post:', error);
          }
      } else {
          try {
              const PostNews = await getPostNews();
              const mappedPostNews = PostNews.map(item => ({
                  id: item.id,
                  title: item.topic,
                  content: item.content,
                  link: item.link
              }));
              setNewsData(mappedPostNews);
          } catch (error) {
              console.error('Error fetching news:', error);
          }
      }
  }
};

  
  const handleChange = (id, field, value) => {
    setNewsData(
        NewsData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleDeleteRow = (id) => {

    deletePost(id);
    setNewsData(NewsData.filter((row) => row.id !== id));
  };
  const handleCloseModal = () => {
    setshowConfirmModal(false);
  }
  const [showConfirmModal, setshowConfirmModal] = useState(false);

  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  return (
    <>
      {showConfirmModal && (
          
          <Modal
              show={showConfirmModal}
              onHide={handleCloseModal}
              backdrop="static"
              keyboard={false}
              size="sm"
              centered
              style={{ fontFamily: 'Kanit, sans-serif' }}
              >
              <Modal.Body className="text-center p-lg-4" >
                  
                
                  <p className="mt-3"style={{ fontSize: '22px' }}>ต้องการที่จะโพสต์ข่าวประชาสัมพันธ์ใช่หรือไม่</p>
             
                  <Button
                    variant="sm"
                    style={{ fontSize: "20px" }}
                    className="btn-success btn-same-size"
                    onClick={() => {
                      handleSubmitform();
                      handleCloseModal();
                    }}
                  >
                    OK
                  </Button>
                  <br />
                  <Button
                    variant="sm"
                    style={{ fontSize: "20px",marginTop:"10px"}}
                    className="btn-secondary btn-same-size"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>

                  {/* </Link> */}
              </Modal.Body>
              </Modal>

        )}    
    {showLoadingModal && (
          <Modal_loading show={showLoadingModal} setShow={setShowLoadingModal} />
    )}
    {showSuccessModal && (
          <Modal_success 
          show={showSuccessModal} 
          setShow={setShowSuccessModal} 
          // link="/" 
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
                            onClick={() => setshowConfirmModal(true)}
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