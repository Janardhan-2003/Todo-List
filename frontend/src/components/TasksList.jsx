import { Plus, Trash2, Edit2, Check, X } from "lucide-react";

const TasksList = (props) => {
  const {
    tasks,
    toggleTaskCompletion,
    deleteTask,
    saveEdit,
    cancelEdit,
    startEdit,
    editingId,
    editingText,
    setEditingText,
  } = props;

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
                  className="cursor-pointer h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 mt-2"
                />

                {editingId === task.id ? (
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  <span className="text-slate-950 font-medium">
                    {task.title}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {editingId === task.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => cancelEdit()}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(task.id, task.title)}
                      className="p-1 text-slate-600 hover:bg-slate-100 rounded"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="ml-4 mt-4 text-sm text-slate-500">
                {task.completed ? "Completed" : "Pending"}
              </span>
              <p className="ml-6 mt-4 text-sm text-slate-500">
                Created at {task.createdAt}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
