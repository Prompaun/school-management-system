import React from 'react'
import { Link } from 'react-router-dom';

import { Button, Modal,Spinner } from 'react-bootstrap';

function Modal_success({show,setShow,link,text}) {

    const handleClose = () => {
        setShow(false);
      };
  return (
    <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            size="sm"
            centered
            style={{ fontFamily: 'Kanit, sans-serif' }}
        >
        <Modal.Body className="text-center p-lg-4">
            <h4 className="text-success mt-3" style={{ fontSize: '30px'}}>
                COMPLETE
            </h4>
            {/* ระบบได้รับข้อมูลการสมัครของท่านแล้ว */}
            <p className="mt-3"style={{ fontSize: '22px' }}>{text}</p>
            <Link to= {link}>
            <Button variant="sm"style={{ fontSize: '20px' }} className="btn-success btn-same-size" onClick={handleClose}>
            Ok
            </Button></Link>
        </Modal.Body>
        </Modal>
  )
}

export default Modal_success