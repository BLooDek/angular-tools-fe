import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../../shared/reducers/auth.reducer';
import { tabsFeature } from '../../../reducers/tabs.reducer';
import { tabsAdd } from '../../../actions/tabs.actions';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-new-tab',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSelectModule,
  ],
  templateUrl: './add-new-tab.component.html',
  styleUrl: './add-new-tab.component.scss',
})
export class AddNewTabComponent {
  private store: Store = inject(Store);
  isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  tabsLoading$ = this.store.select(tabsFeature.selectLoading);
  private readonly fb = inject(FormBuilder);
  types = ['notes'];
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    type: ['notes', [Validators.required]],
  });

  addTab() {
    const { title, type } = this.form.value as { title: string; type: string };
    this.store.dispatch(tabsAdd({ tab: { title, type } }));
    this.form.reset({ title: '', type: 'notes' });
  }
}
