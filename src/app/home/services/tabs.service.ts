import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MAIN_URL } from '../../shared/constants/app';
import { ITab, TabPayload } from '../reducers/tabs.reducer';

@Injectable({
  providedIn: 'root',
})
export class TabsService {
  constructor(private http: HttpClient) {}

  getTabs(): Observable<ITab[]> {
    return this.http.get<ITab[]>(`${MAIN_URL}/tabs`);
  }

  addTab(tab: TabPayload): Observable<ITab> {
    return this.http.post<ITab>(`${MAIN_URL}/tabs`, tab);
  }

  deleteTab(id: string): Observable<void> {
    return this.http.post<void>(`${MAIN_URL}/tabs/remove`, { id });
  }
}
