export const todoReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                {
                    id: Date.now(),
                    text: action.payload,
                    completed: false,
                    editing: false,
                },
                ...state,
            ];

        case "TOGGLE_COMPLETE":
            return state.map((todo) =>
            todo.id === action.payload
        ? { ...todo, completed: !todo.completed }
        : todo
    );

    case "DELETE_TODO":
        return state.filter((todo) => todo.id !== action.payload);

    case "START_EDITING":
        return state.map((todo) =>
        todo.id === action.payload ? { ...todo, editing: true } : todo
    );

    case "SAVE_EDIT":
        return state.map((todo) =>
        todo.id === action.payload ? { ...todo, editing: false } : todo
    );

    default:
        return state;
    }
};