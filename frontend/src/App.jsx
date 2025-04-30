import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null); // track editing

  const fetchTasks = async () => {
    const res = await axios.get('https://task-manager-2-i2qb.onrender.com');
    setTasks(res.data);
  };

  const addOrUpdateTask = async () => {
    if (!text.trim()) return;

    if (editingId) {
      await axios.put(`https://task-manager-2-i2qb.onrender.com/${editingId}`, { text });
      setEditingId(null);
    } else {
      await axios.post('https://task-manager-2-i2qb.onrender.com', { text });
    }

    setText('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://task-manager-2-i2qb.onrender.com/${id}`);
    fetchTasks();
  };

  const startEdit = (task) => {
    setText(task.text);
    setEditingId(task._id);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full  "
          placeholder="Enter a task"
        />
        <button
          onClick={addOrUpdateTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="bg-white shadow p-2 flex justify-between items-center"
          >
            <span>{task.text}</span>
            <div className="space-x-2">
              <button
                onClick={() => startEdit(task)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;






