import React, { useState } from "react";

const TodoItem = ({ todo, dispatch }) => {
    const [editText, setEditText] = useState(todo.text);

    const handleSave = () => {
        if (editText.trim() !== "") {
            dispatch({
                type: "SAVE_EDIT",
                payload: { id: todo.id, text: editText },
            });
        }
    };

    return (
        <li>
            {todo.editing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            ) : (
                <>
                <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() =>
                    dispatch({ type: "TOGGLE_COMPLETE", payload: todo.id })
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
                 onClick={() => dispatch({ type: "START_EDITING", payload: todo.id })}
                >
                    Edit
                </button>
                <button
                onClick={() =>
                    dispatch({ type: "DELETE_TODO", payload: todo.id })
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