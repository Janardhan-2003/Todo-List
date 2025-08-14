import React from "react";
import { useState } from "react";
import { Plus } from "lucide-react";
import {v4 as uuidv4} from "uuid";
import Header from "../../components/Header";
import TasksList from "../../components/TasksList";


const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        {
          id: uuidv4(),
          title: newTask,
          completed: false,
          createdAt: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
        },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    const filteredTaks = tasks.filter((each) => each.id !== taskId);
    setTasks(filteredTaks);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <Header />
      <div>
        <h1>Welcome User</h1>
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

      {tasks.length===0 ? (
        <div className="text-center text-slate-500 mt-6">
          No tasks available. Please add a task to get started.
        </div>
      ):

      
      (<TasksList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />)}
    </>
  );
};

export default HomePage;
