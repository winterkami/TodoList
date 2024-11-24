import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [sortOption, setSortOption] = useState('creation'); // Default sorting
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:5000/todos';

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      const fetchedTodos = response.data.todos;
      sortTodos(fetchedTodos, sortOption);
      setError(null);
    } catch (err) {
      setError('Error fetching to-do items');
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) {
      setError('Please enter a valid to-do item');
      return;
    }
    try {
      const response = await axios.post(API_URL, { title: newTodo });
      const updatedTodos = [...todos, response.data];
      sortTodos(updatedTodos, sortOption);
      setNewTodo('');
      setError(null);
    } catch (err) {
      setError('Error adding to-do item');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      sortTodos(updatedTodos, sortOption);
      setError(null);
    } catch (err) {
      setError('Error deleting to-do item');
    }
  };

  const toggleCompletion = async (id, currentStatus) => {
    try {
      const updatedFields = { completed: !currentStatus };
      await axios.put(`${API_URL}/${id}`, updatedFields);
      fetchTodos();
    } catch (err) {
      setError('Error toggling completion status');
    }
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    sortTodos(todos, newSortOption);
  };

  const sortTodos = (todosToSort, criteria) => {
    let sortedTodos = [...todosToSort];
    if (criteria === 'title') {
      sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === 'completed') {
      sortedTodos.sort((a, b) => a.completed - b.completed);
    } else {
      sortedTodos.sort((a, b) => a.id - b.id);
    }
    setTodos(sortedTodos);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>To-Do List</h1>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new to-do"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <div className="sort-section">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="creation">Creation Order</option>
            <option value="title">Title</option>
            <option value="completed">Completion Status</option>
          </select>
        </div>
        {error && <p className="error">{error}</p>}
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span
                className={`todo-title ${todo.completed ? 'completed' : ''}`}
              >
                {todo.title}
              </span>
              <div className="actions">
                <button onClick={() => toggleCompletion(todo.id, todo.completed)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
