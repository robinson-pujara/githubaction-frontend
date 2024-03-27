import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css'; // Global styles

interface Todo {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (todo: Omit<Todo, 'id' | 'is_completed'>) => {
    try {
      await axios.post('http://localhost:3000/api/todos', todo);
      fetchTodos(); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };
  
  const updateTodo = async (id: number, updatedTodo: Omit<Todo, 'id'> & { is_completed: boolean }) => {
    try {
      await axios.put(`http://localhost:3000/api/todos/${id}`, updatedTodo);
      fetchTodos(); 
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/todos/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    }
  };
  
  

  const toggleCompletion = async (id: number) => {
    const todoToUpdate = todos.find(todo => todo.id === id);
    if (todoToUpdate) {
      try {
        const updatedTodo = { ...todoToUpdate, is_completed: !todoToUpdate.is_completed };
        await axios.put(`http://localhost:3000/api/todos/${id}`, updatedTodo);
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      } catch (error) {
        console.error('Error toggling completion status:', error);
      }
    }
  };
  
  
  

  return (
    <div className="app">
      <h1>Todo List</h1>
      <TodoForm addTodo={addTodo} currentTodo={currentTodo} updateTodo={updateTodo} clearCurrent={() => setCurrentTodo(null)} />
      <TodoList todos={todos} deleteTodo={deleteTodo} setCurrentTodo={setCurrentTodo} toggleCompletion={toggleCompletion} />

    </div>
  );
};

export default App;
