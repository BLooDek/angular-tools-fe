import { createAction, props } from '@ngrx/store';
import { INote } from '../reducers/notes.reucer';

export const notesGet = createAction(
  '[Notes] Get Notes',
  props<{ tabId: string }>()
);
export const notesGetSuccess = createAction(
  '[Notes] Get Notes Success',
  props<{ notes: INote[] }>()
);
export const notesGetError = createAction(
  '[Notes] Get Notes Error',
  props<{ error: any }>()
);
export const notesAdd = createAction(
  '[Notes] Add Note',
  props<{ note: INote }>()
);
export const notesAddSuccess = createAction(
  '[Notes] Add Note Success',
  props<{ note: INote }>()
);
export const notesAddError = createAction(
  '[Notes] Add Note Error',
  props<{ error: any }>()
);
export const notesUpdate = createAction(
  '[Notes] Update Note',
  props<{ note: INote }>()
);
export const notesUpdateSuccess = createAction(
  '[Notes] Update Note Success',
  props<{ note: INote }>()
);

export const notesUpdateError = createAction(
  '[Notes] Update Note Error',
  props<{ error: any }>()
);

export const notesRemove = createAction(
  '[Notes] Remove Note',
  props<{ id: string }>()
);
export const notesRemoveSuccess = createAction(
  '[Notes] Remove Note Success',
  props<{ id: string }>()
);
export const notesRemoveError = createAction(
  '[Notes] Remove Note Error',
  props<{ error: any }>()
);
