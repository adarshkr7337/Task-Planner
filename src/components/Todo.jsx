import React, { useState } from "react";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      if (inputValue !== "") {
        setTasks([...tasks, { id: Date.now(), text: inputValue }]);
        setInputValue("");
      }
    }
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditMode(taskId);
    setEditInput(taskToEdit.text);
  };

  const handleEditSubmit = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editInput } : task
      )
    );
    setEditMode(null);
    setEditInput("");
  };

  return (
    <div className="flex justify-center  min-h-screen bg-gray-300 p-4">
    
      <div className="border-2 border-red-500 rounded-lg p-5 w-full sm:w-96 h-4/5 flex flex-col items-center max-h-screen sm:max-h-96">
        <h1 className="font-semibold text-lg sm:text-xl mb-4">Todo App</h1>

       
        <div className="flex flex-col sm:flex-row sm:space-x-2 mb-4 w-full">
          <input
            type="text"
            placeholder="Add task here..."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            className="border rounded px-2 py-1 w-full mb-2 sm:mb-0"
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        
        <div className="overflow-y-auto w-full max-h-64 sm:max-h-80">
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex justify-between items-center border border-gray-300 font-semibold p-2 rounded"
              >
                {editMode === task.id ? (
                  <div className="flex space-x-2 w-full">
                    <input
                      type="text"
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                    <button
                      onClick={() => handleEditSubmit(task.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center w-full">
                    <span>{task.text}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(task.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
