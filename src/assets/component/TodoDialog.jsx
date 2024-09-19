import React, { useState, useEffect, useRef } from "react";

// - isOpen: boolean, xác định xem hộp thoại có hiển thị hay không.
// - onClose: hàm, được gọi khi người dùng muốn đóng hộp thoại.
// - onCreate: hàm, được gọi khi người dùng xác nhận tạo todo mới.

const TodoDialog = ({ isOpen, onClose, onCreate }) => {
  // Khai báo trạng thái cho tên todo và thông báo lỗi
  const [todoName, setTodoName] = useState(""); // Tên của todo mới
  const [error, setError] = useState(""); // Thông báo lỗi nếu tên todo không hợp lệ
  const inputRef = useRef(null); // Tham chiếu đến input để có thể lấy tiêu điểm

  // Sử dụng useEffect để tự động lấy tiêu điểm vào input khi hộp thoại mở
  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus(); // Lấy tiêu điểm vào input khi isOpen là true
    }
  }, [isOpen]); // Chạy lại khi isOpen thay đổi

  // Hàm xử lý khi người dùng nhấn nút tạo
  const handleCreate = () => {
    if (!todoName) {
      setError("Please enter todo name!!"); // Nếu tên todo rỗng, hiển thị thông báo lỗi
    } else {
      onCreate(todoName); // Gọi hàm onCreate với tên todo
      setTodoName(""); // Đặt lại tên todo về rỗng
      setError(""); // Xóa thông báo lỗi
      onClose(); // Đóng hộp thoại
    }
  };

  return (
    // Nếu isOpen là true, hiển thị nội dung của hộp thoại
    isOpen && (
      <div className="dialog">
        <h2>Create new Todo</h2> {/* Tiêu đề của hộp thoại */}
        <input
          ref={inputRef} // Gán tham chiếu cho input
          type="text"
          value={todoName} // Giá trị của input là tên todo
          onChange={(e) => setTodoName(e.target.value)} // Cập nhật tên todo khi người dùng nhập
          style={{ borderColor: error ? "red" : "black" }} // Đổi màu viền nếu có lỗi
        />
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
        {/* Hiển thị thông báo lỗi nếu có */}
        <button onClick={handleCreate}>Tạo</button>{" "}
        {/* Nút để xác nhận tạo todo */}
        <button onClick={onClose}>Đóng</button>{" "}
        {/* Nút để hủy, gọi hàm onClose */}
      </div>
    )
  );
};

export default TodoDialog;
