import { inject, Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../services/notes.service';
import * as notesActions from '../actions/notes.actions';

@Injectable()
export class NotesEffects {
  private notesService: NotesService = inject(NotesService);
  private actions$: Actions = inject(Actions);

  getNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notesActions.notesGet),
      switchMap(({ tabId }) =>
        this.notesService.getNotes(tabId).pipe(
          map((notes) => notesActions.notesGetSuccess({ notes })),
          catchError((error) => of(notesActions.notesGetError({ error })))
        )
      )
    )
  );

  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notesActions.notesAdd),
      concatMap(({ note }) =>
        this.notesService.addNote(note).pipe(
          map((newNote) => notesActions.notesAddSuccess({ note: newNote })),
          catchError((error) => of(notesActions.notesAddError({ error })))
        )
      )
    )
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notesActions.notesUpdate),
      concatMap(({ note }) =>
        this.notesService.updateNote(note).pipe(
          map((updatedNote) =>
            notesActions.notesUpdateSuccess({ note: updatedNote })
          ),
          catchError((error) => of(notesActions.notesUpdateError({ error })))
        )
      )
    )
  );

  removeNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(notesActions.notesRemove),
      concatMap(({ id }) =>
        this.notesService.removeNote(id).pipe(
          map(() => notesActions.notesRemoveSuccess({ id })),
          catchError((error) => of(notesActions.notesRemoveError({ error })))
        )
      )
    )
  );
}
