import { createAction, props } from '@ngrx/store';

import { Todo } from '../models/todo.interface';

export const getTodos = createAction(
  '[Todos] Get Todos',
  props<{ tabId: string }>()
);

export const getTodosSuccess = createAction(
  '[Todos] Get Todos Success',
  props<{ todos: Todo[] }>()
);
export const getTodosError = createAction(
  '[Todos] Get Todos Error',
  props<{ error: any }>()
);

export const addTodo = createAction(
  '[Todos] Add Todo',
  props<{ todo: Todo }>()
);
export const addTodoSuccess = createAction(
  '[Todos] Add Todo Success',
  props<{ todo: Todo }>()
);
export const addTodoError = createAction(
  '[Todos] Add Todo Error',
  props<{ error: any }>()
);

export const updateTodo = createAction(
  '[Todos] Update Todo',
  props<{ todo: Todo }>()
);
export const updateTodoSuccess = createAction(
  '[Todos] Update Todo Success',
  props<{ todo: Todo }>()
);
export const updateTodoError = createAction(
  '[Todos] Update Todo Error',
  props<{ error: any }>()
);
