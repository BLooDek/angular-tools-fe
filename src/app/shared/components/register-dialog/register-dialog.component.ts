import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerUser } from '../../actions/auth.actions';

@Component({
  selector: 'app-register-dialog',
  imports: [MatCardModule, ReactiveFormsModule],
  templateUrl: './register-dialog.component.html',
  styleUrl: './register-dialog.component.scss',
})
export class RegisterDialogComponent {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmit(): void {
    console.log(this.registerForm.value);

    this.store.dispatch(
      registerUser({
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email,
      })
    );
  }
}
