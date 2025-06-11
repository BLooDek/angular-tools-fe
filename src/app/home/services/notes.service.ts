import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MAIN_URL } from '../../shared/constants/app';
import { Note } from '../../shared/models/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  getNotes(tabId: string): Observable<Note[]> {
    return this.http.post<Note[]>(`${MAIN_URL}/notes/get`, { tabId });
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
