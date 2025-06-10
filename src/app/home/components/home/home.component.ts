import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../shared/reducers/auth.reducer';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../../shared/components/login-dialog/login-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { tabsFeature } from '../../reducers/tabs.reducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { tabsAdd, tabsGet, tabsRemove } from '../../actions/tabs.actions';
import { AddNewTabComponent } from '../add-new-tab/add-new-tab.component';
import { NotesContentComponent } from '../notes-content/notes-content.component';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    this.store.dispatch(tabsGet());
  }
  private store: Store = inject(Store);
  private matDialog: MatDialog = inject(MatDialog);
  isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  tabsLoading$ = this.store.select(tabsFeature.selectLoading);
  tabs$ = this.store.select(tabsFeature.selectTabs);
  tabsValidRemove$ = this.tabs$.pipe(map((tabs) => tabs.length > 0));
  selected = new FormControl(0);

  removeTab(id: string) {
    this.store.dispatch(tabsRemove({ id }));
  }
  onOpenLogin() {
    this.matDialog.open(LoginDialogComponent);
  }
}
