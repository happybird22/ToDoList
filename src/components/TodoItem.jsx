import React, { useState } from "react";

const TodoItem = ({ todo, day, dispatch }) => {
    const [editText, setEditText] = useState(todo.text);

    const handleSave = () => {
        if (editText.trim() !== "") {
            dispatch({
                type: "SAVE_EDIT",
                payload: { day, id: todo.id, text: editText },
            });
        }
    };

    return (
        <li className="todo-item">
            {todo.editing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button
                    onClick={() =>
                        dispatch({ type: "CANCEL_EDIT", payload: { day, id: todo.id } })
                    }
                    >
                    Cancel 
                    </button>
                </>
            ) : (
                <>
                <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                    dispatch({ 
                        type: "TOGGLE_COMPLETE", 
                        payload: { day, id: todo.id }
                     })
                } 
                />
                <span
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    marginLeft: "8px",
                    marginRight: "8px",
                }}
                >
                    {todo.text}
                </span>
                <button
                 onClick={() => 
                    dispatch({ 
                        type: "START_EDITING", 
                        payload: { day, id: todo.id }
                    })
                }
                >
                    Edit
                </button>
                <button
                onClick={() =>
                    dispatch({ 
                        type: "DELETE_TODO", 
                        payload: { day, id: todo.id }
                     })
                }
                disabled={!todo.completed}
                style={{ marginLeft: "6px" }}
                >
                    Delete
                </button>
                </>
    )
}
        </li >
    );
};

export default TodoItem;