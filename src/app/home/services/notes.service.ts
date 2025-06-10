import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { INote } from '../reducers/notes.reucer';
import { Observable } from 'rxjs';
import { MAIN_URL } from '../../shared/constants/app';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  getNotes(tabId: string): Observable<INote[]> {
    return this.http.post<INote[]>(`${MAIN_URL}/notes/get`, { tabId });
  }

  addNote(note: INote): Observable<INote> {
    return this.http.post<INote>(`${MAIN_URL}/notes`, note);
  }

  updateNote(note: INote): Observable<INote> {
    return this.http.put<INote>(`${MAIN_URL}/notes`, note);
  }
  removeNote(id: string): Observable<void> {
    return this.http.post<void>(`${MAIN_URL}/notes/remove`, { id });
  }
}
