import { useState } from "react";
import "./App.css";
import TodoDialog from "./assets/component/TodoDialog";
import DeleteConfirmDialog from "./assets/component/DeleteConfirmDialog";
import UpdateTodoDialog from "./assets/component/UpdateTodoDialog";

function App() {
  // Khai báo trạng thái cho danh sách todo
  const [todos, setTodos] = useState([
    { text: "Go to supermarket", done: false },
    { text: "Do my homework", done: true },
    { text: "Play game", done: false },
    { text: "Read novel", done: false },
  ]);

  // Khai báo trạng thái cho các hộp thoại
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false); // Trạng thái hộp thoại tạo todo
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); // Trạng thái hộp thoại xác nhận xóa
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false); // Trạng thái hộp thoại cập nhật todo
  const [currentTodo, setCurrentTodo] = useState(null); // Todo hiện tại đang được cập nhật hoặc xóa
  const [filter, setFilter] = useState("all"); // Trạng thái bộ lọc cho danh sách todo

  // Hàm xử lý khi người dùng tạo todo mới
  const handleCreateTodo = (todoName) => {
    setTodos([...todos, { text: todoName, done: false }]); // Thêm todo mới vào danh sách
    setIsCreateDialogOpen(false); // Đóng hộp thoại tạo todo
  };

  // Hàm xử lý khi người dùng xác nhận xóa todo
  const handleDeleteTodo = () => {
    const updatedTodos = todos.filter(
      (_, index) => index !== currentTodo.index // Lọc bỏ todo có chỉ số bằng với currentTodo.index
    );
    setTodos(updatedTodos); // Cập nhật danh sách todo
    setIsDeleteDialogOpen(false); // Đóng hộp thoại xác nhận xóa
  };

  // Hàm xử lý khi người dùng cập nhật todo
  const handleUpdateTodo = (index, newName) => {
    const updatedTodos = todos.map(
      (todo, i) => (i === index ? { ...todo, text: newName } : todo) // Cập nhật tên todo nếu chỉ số khớp
    );
    setTodos(updatedTodos); // Cập nhật danh sách todo
    setIsUpdateDialogOpen(false); // Đóng hộp thoại cập nhật
  };

  // Hàm xử lý khi người dùng thay đổi trạng thái hoàn thành của todo
  const handleToggleDone = (index) => {
    const updatedTodos = todos.map(
      (todo, i) => (i === index ? { ...todo, done: !todo.done } : todo) // Đảo ngược trạng thái done của todo
    );
    setTodos(updatedTodos); // Cập nhật danh sách todo
  };

  // Lọc danh sách todo theo trạng thái
  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done; // Chỉ hiển thị todo đã hoàn thành
    if (filter === "in-progress") return !todo.done; // Chỉ hiển thị todo chưa hoàn thành
    return true; // Hiển thị tất cả todo
  });

  return (
    <div className="todo-container">
      <h1 className="title">TODO</h1>
      <div className="input-section">
        <input type="text" placeholder="Add a new todo" />{" "}
        <button
          className="create-btn"
          onClick={() => setIsCreateDialogOpen(true)} // Mở hộp thoại tạo todo
        >
          Create
        </button>
      </div>
      <div className="filter-section">
        <button
          className={filter === "all" ? "active" : ""} // Đánh dấu nút "All" nếu đang lọc tất cả
          onClick={() => setFilter("all")} // Thiết lập bộ lọc là "all"
        >
          All
        </button>
        <button
          className={filter === "in-progress" ? "active" : ""} // Đánh dấu nút "In-progress" nếu đang lọc todo chưa hoàn thành
          onClick={() => setFilter("in-progress")} // Thiết lập bộ lọc là "in-progress"
        >
          In-progress
        </button>
        <button
          className={filter === "done" ? "active" : ""} // Đánh dấu nút "Done" nếu đang lọc todo đã hoàn thành
          onClick={() => setFilter("done")} // Thiết lập bộ lọc là "done"
        >
          Done
        </button>
      </div>
      <ul className="todo-list">
        {filteredTodos.map((todo, index) => (
          <li key={index} className={todo.done ? "todo-done" : ""}>
            <span onClick={() => handleToggleDone(index)}>{todo.text}</span>{" "}
            <div>
              <button
                className="update-btn"
                onClick={() => {
                  setCurrentTodo({ text: todo.text, index }); // Thiết lập todo hiện tại để cập nhật
                  setIsUpdateDialogOpen(true); // Mở hộp thoại cập nhật
                }}
              >
                {/* bút chì để cập nhật todo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  setCurrentTodo({ index }); // Thiết lập todo hiện tại để xóa
                  setIsDeleteDialogOpen(true); // Mở hộp thoại xác nhận xóa
                }}
              >
                {/* thùng rác để xóa todo */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* tạo todo mới */}
      <TodoDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)} // Đóng hộp thoại khi người dùng nhấn nút đóng
        onCreate={handleCreateTodo} // Gọi hàm tạo todo mới
      />
      {/* Hộp thoại xác nhận xóa todo */}
      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)} // Đóng hộp thoại khi người dùng nhấn nút đóng
        onDelete={handleDeleteTodo} // Gọi hàm xóa todo
      />
      {/* cập nhật todo */}
      <UpdateTodoDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)} // Đóng hộp thoại khi người dùng nhấn nút đóng
        onUpdate={handleUpdateTodo} // Gọi hàm cập nhật todo
        currentTodo={currentTodo} // Truyền thông tin todo hiện tại để cập nhật
      />
    </div>
  );
}

export default App;
