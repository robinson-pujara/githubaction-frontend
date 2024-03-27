import React from 'react';
import TodoItem from './TodoItem';
import styles from './TodoList.module.css'; 

interface TodoListProps {
  todos: Array<{
    id: number;
    title: string;
    description?: string;
    is_completed: boolean;
  }>;
  deleteTodo: (id: number) => void;
  setCurrentTodo: (todo: TodoListProps['todos'][0]) => void;
  toggleCompletion: (id: number) => void; 
}


const TodoList: React.FC<TodoListProps> = ({ todos, deleteTodo, setCurrentTodo, toggleCompletion }) => {
  return (
    <div className={styles.todoList}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          setCurrentTodo={setCurrentTodo}
          toggleCompletion={toggleCompletion}
        />
      ))}
    </div>
  );
};

export default TodoList;

