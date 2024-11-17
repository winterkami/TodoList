import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [sortOption, setSortOption] = useState('creation'); // Default sorting
  const [error, setError] = useState(null);

  // Base API URL
  const API_URL = 'http://localhost:5000/todos';

  // Fetch and sort to-do items when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(API_URL);
      const fetchedTodos = response.data.todos;
      sortTodos(fetchedTodos, sortOption); // Sort the fetched todos
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
      sortTodos(updatedTodos, sortOption); // Sort after adding a new todo
      setNewTodo('');
      setError(null);
    } catch (err) {
      setError('Error adding to-do item');
    }
  };

  const updateTodo = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedFields);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      sortTodos(updatedTodos, sortOption); // Sort after updating a todo
      setError(null);
    } catch (err) {
      setError('Error updating to-do item');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      sortTodos(updatedTodos, sortOption); // Sort after deleting a todo
      setError(null);
    } catch (err) {
      setError('Error deleting to-do item');
    }
  };

  const toggleCompletion = async (id, currentStatus) => {
    try {
      await updateTodo(id, { completed: !currentStatus }); // Flip the completed status
    } catch (err) {
      setError('Error toggling completion status');
    }
  };

  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    sortTodos(todos, newSortOption); // Apply sorting when the sort option changes
  };

  const sortTodos = (todosToSort, criteria) => {
    let sortedTodos = [...todosToSort];
    if (criteria === 'title') {
      sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
    } else if (criteria === 'completed') {
      sortedTodos.sort((a, b) => a.completed - b.completed);
    } else if (criteria === 'creation') {
      sortedTodos.sort((a, b) => a.id - b.id); // Assuming lower ID = earlier creation
    }
    setTodos(sortedTodos);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      {/* Add To-Do Item */}
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new to-do"
        />
        <button onClick={addTodo}>Add</button>
      </div>

      {/* Sorting Options */}
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="creation">Creation Order</option>
          <option value="title">Title</option>
          <option value="completed">Completion Status</option>
        </select>
      </div>

      {/* Display Error */}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}

      {/* Display To-Do Items */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
            >
              {todo.title}
            </span>
            <button
              onClick={() =>
                toggleCompletion(todo.id, todo.completed)
              }
            >
              {todo.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
