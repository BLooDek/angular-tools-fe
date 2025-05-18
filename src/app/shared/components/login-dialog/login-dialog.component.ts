import { Component, inject, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginUser, registerUser } from '../../actions/auth.actions';
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable, Subscription, withLatestFrom } from 'rxjs';
import { authFeature } from '../../reducers/auth.reducer';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-dialog',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatButtonModule,
    MatDialogActions,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
})
export class LoginDialogComponent {
  authLoading$: Observable<boolean>;
  userLoggedIn$: Observable<boolean>;
  registerForm: FormGroup;
  private subs: Subscription[] = [];
  private dialogRef: MatDialogRef<LoginDialogComponent> = inject(
    MatDialogRef<LoginDialogComponent>
  );
  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
    this.authLoading$ = store.select(authFeature.selectLoading);
    this.userLoggedIn$ = store.select(authFeature.selectIsLoggedIn);
    this.subs.push(
      this.userLoggedIn$
        .pipe(withLatestFrom(this.authLoading$))
        .subscribe(([isLoggedIn, isLoading]) => {
          if (isLoggedIn && !isLoading) {
            this.onClose();
          }
        })
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub?.unsubscribe());
  }

  onSubmit(): void {
    this.store.dispatch(loginUser({ ...this.registerForm.value }));
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
