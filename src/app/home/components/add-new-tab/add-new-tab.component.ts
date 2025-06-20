import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { authFeature } from '../../../shared/reducers/auth.reducer';
import { tabsFeature } from '../../reducers/tabs.reducer';
import { tabsAdd, tabsGet } from '../../actions/tabs.actions';

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
export class AddNewTabComponent implements OnInit, OnDestroy {
  private store: Store = inject(Store);
  isLoggedIn$ = this.store.select(authFeature.selectIsLoggedIn);
  tabsLoading$ = this.store.select(tabsFeature.selectLoading);
  private readonly fb = inject(FormBuilder);
  private readonly subs: Subscription[] = [];
  types = ['notes'];
  form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    type: ['notes', [Validators.required]],
  });

  ngOnInit(): void {
    this.subs.push(
      this.isLoggedIn$.subscribe((isLoggedIn) => {
        this.store.dispatch(tabsGet());
        isLoggedIn ? this.form.enable() : this.form.disable();
      })
    );
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  addTab() {
    const { title, type } = this.form.value as { title: string; type: string };
    this.store.dispatch(tabsAdd({ tab: { title, type } }));
    this.form.reset({ title: '', type: 'notes' });
  }
}
