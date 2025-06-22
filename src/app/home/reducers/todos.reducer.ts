import { createFeature } from '@ngrx/store';

import { Todo } from '../models/todo.interface';

interface State {
  error: string | null;
  loading: boolean;
  todos: Todo[];
}

const initialState: State = {
  error: null,
  loading: false,
  todos: [],
};

export const todosReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case '[Todos] Get Todos':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case '[Todos] Get Todos Success':
      return {
        ...state,
        loading: false,
        todos: action.todos,
      };
    case '[Todos] Get Todos Error':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case '[Todos] Add Todo':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case '[Todos] Add Todo Success':
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.todo],
      };
    case '[Todos] Add Todo Error':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case '[Todos] Update Todo':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case '[Todos] Update Todo Success':
      return {
        ...state,
        loading: false,
        todos: state.todos.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        ),
      };
    case '[Todos] Update Todo Error':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const todosFeature = createFeature({
  name: 'todos',
  reducer: todosReducer,
});
