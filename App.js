const { useState } = React;

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Add new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEditingTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  // Confirm update to a task
  const updateTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <div id="task-manager">
      <header>Task Manager</header>

      <div className="task-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? addTask() : null)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="task-list">
        {tasks.map((task, index) => (
          <div className={`task ${task.completed ? "completed" : ""}`} key={index}>
            {editingIndex === index ? (
              // Editing mode: show input for task text and update button
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => updateTask(index)}>Update</button>
              </div>
            ) : (
              // Display mode: show task text and edit/delete buttons
              <div>
                <span onClick={() => toggleTask(index)}>{task.text}</span>
                <div>
                  <button onClick={() => toggleTask(index)}>
                    {task.completed ? "Undo" : "Complete"}
                  </button>
                  <button onClick={() => startEditingTask(index)}>Edit</button>
                  <button className="delete" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Render to the DOM
ReactDOM.render(<TaskManager />, document.getElementById("root"));
