import React from 'react'
import { Button, Modal,Spinner } from 'react-bootstrap';

function Modal_loading({show,setShow}) {

    const handleClose = () => {
        setShow(false);
      };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      size="sm"
      style={{ fontFamily: 'Kanit, sans-serif' }}
    >
      <Modal.Body>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Spinner animation="border" role="status" />
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Modal_loading