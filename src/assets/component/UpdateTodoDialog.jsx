import React, { useState, useEffect, useRef } from "react";

// - isOpen: boolean, xác định xem hộp thoại có hiển thị hay không.
// - onClose: hàm, được gọi khi người dùng muốn đóng hộp thoại.
// - onUpdate: hàm, được gọi khi người dùng xác nhận cập nhật todo.
// - currentTodo: đối tượng chứa thông tin của todo hiện tại cần cập nhật.

const UpdateTodoDialog = ({ isOpen, onClose, onUpdate, currentTodo }) => {
  // Khai báo trạng thái cho tên todo và thông báo lỗi
  const [todoName, setTodoName] = useState(""); // Tên của todo hiện tại
  const [error, setError] = useState(""); // Thông báo lỗi nếu tên todo không hợp lệ
  const inputRef = useRef(null); // Tham chiếu đến input để có thể lấy tiêu điểm

  // Sử dụng useEffect để cập nhật tên todo và lấy tiêu điểm vào input khi hộp thoại mở
  useEffect(() => {
    if (isOpen) {
      setTodoName(currentTodo.text); // Đặt tên todo từ currentTodo
      inputRef.current.focus(); // Lấy tiêu điểm vào input khi isOpen là true
    }
  }, [isOpen, currentTodo]); // Chạy lại khi isOpen hoặc currentTodo thay đổi

  // Hàm xử lý khi người dùng nhấn nút lưu
  const handleUpdate = () => {
    if (!todoName) {
      setError("Please enter todo name!!"); // Nếu tên todo rỗng, hiển thị thông báo lỗi
    } else {
      onUpdate(currentTodo.index, todoName); // Gọi hàm onUpdate với chỉ số và tên todo mới
      setTodoName(""); // Đặt lại tên todo về rỗng
      setError(""); // Xóa thông báo lỗi
      onClose(); // Đóng hộp thoại
    }
  };

  return (
    // Nếu isOpen là true, hiển thị nội dung của hộp thoại
    isOpen && (
      <div className="dialog">
        <h2>Cập nhật todo</h2> {/* Tiêu đề của hộp thoại */}
        <input
          ref={inputRef} // Gán tham chiếu cho input
          type="text"
          value={todoName} // Giá trị của input là tên todo
          onChange={(e) => setTodoName(e.target.value)} // Cập nhật tên todo khi người dùng nhập
          style={{ borderColor: error ? "red" : "black" }} // Đổi màu viền nếu có lỗi
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
        <button onClick={handleUpdate}>Lưu</button>{" "}
        {/* Nút để xác nhận cập nhật todo */}
        <button onClick={onClose}>Đóng</button>{" "}
        {/* Nút để hủy, gọi hàm onClose */}
      </div>
    )
  );
};

// Xuất đối tượng UpdateTodoDialog để có thể sử dụng ở các thành phần khác trong ứng dụng.
export default UpdateTodoDialog;
