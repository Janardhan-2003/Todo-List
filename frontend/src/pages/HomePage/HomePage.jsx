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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, <span className="text-blue-600">{userName}</span>
          </h1>
          <p className="text-gray-600 text-lg">Stay organized and get things done</p>
        </div>

        {/* Todo Input Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
              />
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-sm hover:shadow-md active:scale-95"
              onClick={addTask}
            >
              <Plus className="h-5 w-5" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
              </div>
              {tasks.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {tasks.filter(task => task.completed).length} of {tasks.length} completed
                  </span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(tasks.filter(task => task.completed).length / tasks.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-500 mb-6">Create your first task to get started on your productivity journey</p>
              <div className="inline-flex items-center text-sm text-gray-400">
                <span>Press Enter or click Add Task to create one</span>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
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
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {tasks.length > 0 && (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{tasks.filter(task => task.completed).length}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{tasks.filter(task => !task.completed).length}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;