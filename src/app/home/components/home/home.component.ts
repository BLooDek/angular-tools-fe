import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, first, map, Observable } from 'rxjs';

import { LoginDialogComponent } from '../../../shared/components/login-dialog/login-dialog.component';
import { NotesContentComponent } from '../notes-content/notes-content.component';
import { TodosContentComponent } from '../todos-content/todos-content.component';
import { authFeature } from '../../../shared/reducers/auth.reducer';
import { AddNewTabComponent } from '../add-new-tab/add-new-tab.component';
import { notesGet } from '../../actions/notes.actions';
import { getTodos } from '../../actions/todos.actions';
import { tabsFeature } from '../../reducers/tabs.reducer';
import { tabsGet, tabsRemove } from '../../actions/tabs.actions';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    AddNewTabComponent,
    NotesContentComponent,
    TodosContentComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.isLoggedIn$.pipe(filter((e) => !!e)).subscribe((isLoggedIn) => {
      this.store.dispatch(tabsGet());
    });
  }
  private store: Store = inject(Store);
  private dialog: Dialog = inject(Dialog);
  private matDialog: MatDialog = inject(MatDialog);
  isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  tabsLoading$ = this.store.select(tabsFeature.selectLoading);
  tabs$ = this.store.select(tabsFeature.selectTabs);
  tabsValidRemove$ = this.tabs$.pipe(map((tabs) => tabs.length > 0));
  selected = new FormControl(0);
  selectedTabId = new FormControl('');

  removeTab(id: string) {
    this.store.dispatch(tabsRemove({ id }));
  }
  onOpenLogin() {
    // this.dialog.open(LoginDialogComponent, {
    //   width: '400px',
    // });
    this.matDialog.open(LoginDialogComponent);
  }
  setSelectedTab($event: number) {
    this.selected.setValue($event);
    this.tabs$
      .pipe(
        first(),
        filter((e) => e !== null && e.length > 0)
      )
      .subscribe((tabs) => {
        const { type, id } = tabs?.[$event] ?? {};

        this.dispatchLoad(type, id);
        this.selectedTabId.setValue(tabs?.[$event]?.id ?? null);
      });
  }

  dispatchLoad(type: string, id: string) {
    if (type === 'notes') {
      this.store.dispatch(notesGet({ tabId: id }));
    } else if (type === 'todos') {
      this.store.dispatch(getTodos({ tabId: id }));
    }
  }
}
