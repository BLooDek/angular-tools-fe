import { createFeature, createReducer, on } from '@ngrx/store';

import { Note } from '../../shared/models/note.interface';
import * as notesAction from '../actions/notes.actions';

interface State {
  error: string | null;
  loading: boolean;
  notes: Note[];
}
export const initialState: State = {
  error: null,
  loading: false,
  notes: [],
};

const notesReducer = createReducer(
  initialState,
  on(notesAction.notesGet, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(notesAction.notesGetSuccess, (state, { notes }) => ({
    ...state,
    loading: false,
    notes: notes,
  })),
  on(notesAction.notesAdd, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(notesAction.notesAddSuccess, (state, { note }) => ({
    ...state,
    loading: false,
    notes: [...state.notes, note],
  })),
  on(
    notesAction.notesAddError,
    notesAction.notesRemoveError,
    notesAction.notesGetError,
    notesAction.notesUpdateError,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  ),
  on(notesAction.notesUpdate, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(notesAction.notesUpdateSuccess, (state, { note }) => ({
    ...state,
    loading: false,
    notes: state.notes.map((n) => (n.id === note.id ? note : n)),
  })),
  on(notesAction.notesRemove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(notesAction.notesRemoveSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    notes: state.notes.filter((note) => note.id !== id),
  }))
);
export const notesFeature = createFeature({
  name: 'notes',
  reducer: notesReducer,
});
