import React from "react";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header";
import TasksList from "../../components/TasksList";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const navigate = useNavigate();
  const userName = Cookies.get("UserDetails")
    ? JSON.parse(Cookies.get("UserDetails")).name
    : "User";

  useEffect(() => {
    const token = Cookies.get("authToken");
    const uid = Cookies.get("userId");
    if (!token) {
      navigate("/login");
    } else if (uid) {
      fetchTodos();
    }
  }, [tasks]);

  const fetchTodos = async () => {
    const uid = Cookies.get("userId");

    if (!uid) return;
    try {
      const response = await axios.get(`http://localhost:5000/todo/${uid}`);
      setTasks(response.data); // set your state with all todos
    } catch (e) {
      console.error("Failed to fetch todos", e);
    }
  };

  const addTask = async () => {
    if (!newTask.trim()) return;

    const userUID = Cookies.get("userId");

    const payLoad = {
      uid: userUID,
      id: uuidv4(),
      title: newTask,
      completed: false,
    };

    try {
      const response = await axios.post("http://localhost:5000/todo/", payLoad);
      const createdTodo = response.data;

      setTasks((prev) => [...prev, createdTodo]);
      setNewTask("");
    } catch (e) {
      console.error("Failed to add todo-item");
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = async (taskId) => {
    const uid = Cookies.get("userId");
    try {
      await axios.put(`http://localhost:5000/todo/update/${uid}/${taskId}`, {
        title: editingText,
      });

      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, text: editingText.trim() } : task
        )
      );
      setEditingId(null);
      setEditingText("");
    } catch (e) {
      console.error("Failed to update the todo", e);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const deleteTask = async (taskId) => {
    const uid = Cookies.get("userId");

    try {
      await axios.delete(`http://localhost:5000/todo/delete/${uid}/${taskId}`);
      const filteredTaks = tasks.filter((each) => each.id !== taskId);
      setTasks(filteredTaks);
    } catch (e) {
      console.error("Todo not found to Delete.", e);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const uid = Cookies.get("userId");
    const target = tasks.find((t) => t.id === taskId);

    try {
      await axios.put(`http://localhost:5000/todo/update/${uid}/${taskId}`, {
        completed: !target.completed,
      });

      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (e) {
      console.error("Failed to toggle completion.", e);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center mt-10">
        <h1 className="text-2xl font-bold font-serif">Welcome, {userName}</h1>
        <div className="bg-white rounded-lg shadow-md p-8 w-fit mx-auto mt-10">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Todo List</h1>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent lg:w-120"
            />
            <button
              className="bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors flex items-center gap-2"
              onClick={addTask}
            >
              <Plus className="h-4 w-4" />
              Add
            </button>
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center text-slate-500 mt-6">
          No tasks available. Please add a task to get started.
        </div>
      ) : (
        <TasksList
          tasks={tasks}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
        />
      )}
    </>
  );
};

export default HomePage;
