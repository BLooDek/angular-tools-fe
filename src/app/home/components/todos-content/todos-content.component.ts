import { FormBuilder } from '@angular/forms';
import { Component, inject, input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import { getTodos } from '../../actions/todos.actions';

@Component({
  selector: 'app-todos-content',
  imports: [],
  templateUrl: './todos-content.component.html',
  styleUrl: './todos-content.component.scss',
})
export class TodosContentComponent implements OnInit, OnChanges {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  tabId = input('');

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabId'] && this.tabId()) {
    }
  }
}
