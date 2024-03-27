import React, { useState, useEffect } from 'react';
import './TodoForm.module.css'; // Make sure you have the corresponding CSS file

interface Todo {
  id: number;
  title: string;
  description?: string;
  is_completed: boolean;
}

interface TodoFormProps {
  addTodo: (todo: { title: string; description?: string; is_completed: boolean }) => void;
  currentTodo: Todo | null;
  updateTodo: (id: number, todo: { title: string; description?: string; is_completed: boolean }) => void;
  clearCurrent: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, currentTodo, updateTodo, clearCurrent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description || '');
      setIsCompleted(currentTodo.is_completed);
    } else {
      setTitle('');
      setDescription('');
      setIsCompleted(false);
    }
  }, [currentTodo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) return;

    const todoData = {
      title,
      description,
      is_completed: isCompleted,
    };

    if (currentTodo) {
      updateTodo(currentTodo.id, todoData);
    } else {
      addTodo(todoData);
    }

    clearForm();
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setIsCompleted(false);
    clearCurrent();
  };

  return (
    <form onSubmit={handleSubmit} className="todoForm">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="inputTitle"
      />
      <textarea
        placeholder="Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
    
        className="inputDescription"
        />
        <div className="checkboxContainer">
          <label>
            Completed:
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="inputCheckbox"
            />
          </label>
        </div>
        <div className="formActions">
          <button type="submit" className="submitButton">
            {currentTodo ? 'Update Todo' : 'Add Todo'}
          </button>
          {currentTodo && (
            <button type="button" onClick={clearForm} className="cancelButton">
              Cancel
            </button>
          )}
        </div>
      </form>
    );
  };
  
  export default TodoForm;
  