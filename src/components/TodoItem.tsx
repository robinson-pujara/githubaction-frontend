import React from 'react';
import styles from './TodoItem.module.css'; // Ensure you have this CSS module

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    description?: string;
    is_completed: boolean;
  };
  deleteTodo: (id: number) => void;
  setCurrentTodo: (todo: TodoItemProps['todo']) => void;
  toggleCompletion: (id: number) => void; // Add a function for toggling completion status
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, deleteTodo, setCurrentTodo, toggleCompletion }) => {
  const { id, title, description, is_completed } = todo;

  return (
    <div className={styles.todoItem}>
      <div className={styles.todoContent}>
        <h3 className={is_completed ? styles.completed : ''}>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <div className={styles.actions}>
        <button onClick={() => setCurrentTodo(todo)}>Edit</button>
        <button onClick={() => deleteTodo(id)}>Delete</button>
        <label className={styles.toggleCompletion}>
          <input
            type="checkbox"
            checked={is_completed}
            onChange={() => toggleCompletion(id)} // Toggle completion status on change
          /> Completed
        </label>
      </div>
    </div>
  );
};

export default TodoItem;
