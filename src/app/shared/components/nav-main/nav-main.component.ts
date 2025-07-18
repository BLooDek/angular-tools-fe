import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { Store } from '@ngrx/store';
import { authFeature } from '../../reducers/auth.reducer';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { logoutUser } from '../../actions/auth.actions';

@Component({
  selector: 'app-nav-main',
  imports: [
    CommonModule,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],

  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.scss',
})
export class NavMainComponent {
  private store: Store = inject(Store);
  private matDialog: MatDialog = inject(MatDialog);

  isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  userEmail$ = this.store.select(authFeature.selectEmail);
  pages: { link: string; name: string }[] = [
    { link: './', name: 'Home' },
    { link: 'query-builder', name: 'Query Builder' },
    { link: 'grid', name: 'Table' },
  ];

  onOpenRegister(): void {
    this.matDialog.open(RegisterDialogComponent);
  }
  onOpenLogin() {
    this.matDialog.open(LoginDialogComponent);
  }
  onLogout() {
    this.store.dispatch(logoutUser());
  }
}
