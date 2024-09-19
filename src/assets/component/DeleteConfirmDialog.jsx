import React from "react";
const DeleteConfirmDialog = ({ isOpen, onClose, onDelete }) => {
  return (
    // Nếu isOpen là true, hiển thị hộp thoại xác nhận
    isOpen && (
      <div className="dialog">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this todo?</p>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    )
  );
};

export default DeleteConfirmDialog;
