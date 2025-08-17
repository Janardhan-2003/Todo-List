import { Plus, Trash2, Edit2, Check, X, Clock, CheckCircle2, Circle } from "lucide-react";

const TasksList = (props) => {
  const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // "YYYY-MM-DD"
};
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
    <div className="space-y-0">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className={`group hover:bg-gray-50 transition-all duration-200 ${
            index !== tasks.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <div className="px-8 py-6">
            <div className="flex items-start gap-4">
              {/* Custom Checkbox */}
              <div className="flex-shrink-0 mt-1">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    task.completed
                      ? 'bg-green-500 border-green-500 text-white hover:bg-green-600'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {task.completed && <Check className="w-3 h-3" />}
                </button>
              </div>

              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1 min-w-0 mr-4">
                    {editingId === task.id ? (
                      <input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') saveEdit(task.id);
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-lg font-medium transition-all duration-200 ${
                          task.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-900'
                        }`}
                      >
                        {task.title}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {editingId === task.id ? (
                      <>
                        <button
                          onClick={() => saveEdit(task.id)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          title="Save changes"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => cancelEdit()}
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          title="Cancel editing"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(task.id, task.title)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                          title="Edit task"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          title="Delete task"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Task Status and Metadata */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      task.completed
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {task.completed ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          Pending
                        </>
                      )}
                    </div>
                  </div>

                  {task.createdAt && (
                    <span className="text-gray-400 text-xs">
                      Created At : {formatDate(task.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TasksList;