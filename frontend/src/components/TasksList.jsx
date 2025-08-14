import {Trash2} from "lucide-react";

const TasksList = (props) => {
  const { tasks, toggleTaskCompletion, deleteTask } = props;

  return (
    <div className="bg-slate-100 p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-xl font-semibold text-slate-800 mt-6 mb-4">Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`p-4 flex flex-col rounded-lg ${
              task.completed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <div className="flex items-center justify-between w-full">
            <div className="flex gap-2 wrap-anywhere">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
            />
            <span className="text-slate-950 font-medium">{task.title}</span>
            </div>
            
            <button
              className="cursor-pointer text-sm text-red-500 hover:text-red-700 ml-4"
              onClick={() => deleteTask(task.id)}
            >
              <span className="text-red-500 ml-4">
                <Trash2 className="h-4 w-4" />
              </span>
            </button>
            </div>
            <div className="flex justify-between items-center">
            <span className="ml-4 mt-4 text-sm text-slate-500">
              {task.completed ? "Completed" : "Pending"}
            </span>
            <p className="ml-6 mt-4 text-sm text-slate-500">Created at {task.createdAt}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
