export const initialState = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
};

const updateTodoList = (todoList, action) => {
    switch (action.type) {
        case "ADD_TODO_ITEM":
            return [
                {
                    id: Date.now(),
                    text: action.payload.text,
                    completed: false,
                    editing: false
                },
                ...todoList
            ];
        case "COMPLETE_TODO_ITEM":
            return todoList.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case "DELETE_TODO_ITEM":
            return todoList.filter((todo) => todo.id !== action.payload.id);
        case "START_EDITING_ITEM":
            return todoList.map((todo) =>
                todo.id === action.payload.id ? { ...todo, editing: true } : todo
            );
        case "SAVE_EDIT_ITEM":
            return todoList.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, text: action.payload.text, editing: false }
                    : todo
            );
        case "CANCEL_EDIT_ITEM":
            return todoList.map((todo) =>
            todo.id === action.payload.id ? { ...todo, editing: false } : todo
        );
        default:
            return todoList;
    }
};

export const todoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                [action.payload.day]: updateTodoList(state[action.payload.day], {
                    type: "ADD_TODO_ITEM",
                    payload: { text: action.payload.text }
                })
            };

        case "TOGGLE_COMPLETE":
            return {
                ...state,
                [action.payload.day]: updateTodoList(state[action.payload.day], {
                    type: "COMPLETE_TODO_ITEM",
                    payload: { id: action.payload.id}
                })
            };

        case "DELETE_TODO":
            return {
                ...state,
                [action.payload.day]: updateTodoList(state[action.payload.day], {
                    type: "DELETE_TODO_ITEM",
                    payload: { id: action.payload.id}
                })
            };

        case "START_EDITING":
            return {
                ...state,
                [action.payload.day]: updateTodoList(state[action.payload.day], {
                    type: "START_EDITING_ITEM",
                    payload: { id: action.payload.id}
                })
            };

        case "SAVE_EDIT":
            return {
                ...state,
                [action.payload.day]: updateTodoList(state[action.payload.day], {
                    type: "SAVE_EDIT_ITEM",
                    payload: { id: action.payload.id, text: action.payload.text }
                })
            };

        case "CANCEL_EDIT":
            return {
                ...state,
                [action.payload.day]: updateTodoList(state[action.payload.day], {
                    type: "CANCEL_EDIT_ITEM",
                    payload: { id: action.payload.id }
                })
            };

        default:
            return state;
    }
};