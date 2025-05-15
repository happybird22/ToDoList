import React, { useReducer, useState } from 'react';
import { todoReducer, initialState } from './reducers/todoReducer';
import TodoItem from './components/TodoItem';
import './App.css';

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [newTodo, setNewTodo] = useState(
    daysOfWeek.reduce((obj, day) => ({ ...obj, [day]: "" }), {})
  );

  const handleAddTodo = (day, e) => {
    e.preventDefault();
    const text = newTodo[day].trim();
    if (!text) return;
    dispatch({ type: "ADD_TODO", payload: { day, text } });
    setNewTodo({ ...newTodo, [day]: "" });
  };

  return (
    <div className='app-container'>
      <h1>Weekly Todo Planner</h1>
      {daysOfWeek.map((day) => (
        <section key={day} className='"day-section'>
          <h2>{day}</h2>
          <form onSubmit={(e) => handleAddTodo(day, e)}>
            <input 
            type="text"
            placeholder={`Add new todo for ${day}`}
            onChange={(e) =>
              setNewTodo({ ...newTodo, [day]: e.target.value })
            } 
            />
            <button type='submit'>Add</button>
          </form>
          <ul>
            {state[day].map((todo) => (
              <TodoItem key={todo.id} todo={todo} day={day} dispatch={dispatch} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default App
