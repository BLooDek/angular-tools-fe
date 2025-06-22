import { MatSnackBar } from '@angular/material/snack-bar';
import { inject, Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

import { TodosService } from '../services/todos.service';
import * as todosActions from '../actions/todos.actions';

@Injectable()
export class TabsEffects {
  private todoService: TodosService = inject(TodosService);
  private actions$: Actions = inject(Actions);

  getTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.getTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          map((todos) => todosActions.getTodosSuccess({ todos })),
          catchError((error) => of(todosActions.getTodosError({ error })))
        )
      )
    )
  );

  addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.updateTodo),
      mergeMap(({ todo }) =>
        this.todoService.addTodo(todo).pipe(
          map((newTodo) => todosActions.updateTodoSuccess({ todo: newTodo })),
          catchError((error) => of(todosActions.updateTodoError({ error })))
        )
      )
    )
  );

  updateTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todosActions.updateTodo),
      switchMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map((newTodo) => todosActions.updateTodoSuccess({ todo: newTodo })),
          catchError((error) => of(todosActions.updateTodoError({ error })))
        )
      )
    )
  );
}
