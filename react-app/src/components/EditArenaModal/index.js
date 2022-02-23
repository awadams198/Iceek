import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditArenaForm from "../editArenaForm/EditArenaForm";



function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);


  return (
    <>
      <button className="delete-arena-button" onClick={() => setShowModal(true)}>
        <i className="far fa-trash-alt"></i>Edit Home
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditArenaForm/>
        </Modal>
      )}
    </>
  );
}

export default SignUpFormModal;