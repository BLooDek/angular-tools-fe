import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Note } from '../../shared/models/note.interface';
import { MAIN_URL } from '../../shared/constants/app';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  getNotes(tabId: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${MAIN_URL}/notes/${tabId}`);
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${MAIN_URL}/notes`, note);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(`${MAIN_URL}/notes`, note);
  }
  removeNote(id: string): Observable<void> {
    return this.http.post<void>(`${MAIN_URL}/notes/remove`, { id });
  }
}
