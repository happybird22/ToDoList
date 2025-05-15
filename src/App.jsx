import { useReducer, useState } from 'react';
import { todoReducer } from './reducers/todoReducer';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(todoReducer, []);
  const [newTodo, setNewTodo] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: newTodo });
      setNewTodo("");
    }
  };

  return (
    <div className='app-container'>
      <h1>ToDo List</h1>

      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        value={newTodo}
        placeholder='Add new todo'
        onChange={(e) => setNewTodo(e.target.value)} 
        />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {state.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
