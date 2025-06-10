import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { notesGet } from '../../actions/notes.actions';
import { tabsFeature } from '../../reducers/tabs.reducer';
import { CommonModule } from '@angular/common';
import { notesFeature } from '../../reducers/notes.reucer';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { notesAdd } from '../../actions/notes.actions';

@Component({
  selector: 'app-notes-content',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './notes-content.component.html',
  styleUrl: './notes-content.component.scss',
})
export class NotesContentComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  tabId = input('');
  notes$ = this.store.select(notesFeature.selectNotes);
  noteForm!: FormGroup;
  isFormActive = false;

  ngOnInit(): void {
    this.notes$.subscribe(console.log);
    this.store.dispatch(notesGet({ tabId: this.tabId() }));

    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: [''],
    });
  }

  activateForm(): void {
    this.isFormActive = true;
  }

  addNote(): void {
    if (this.noteForm.valid) {
      const { title, content } = this.noteForm.value;
      const newNote = {
        id: Date.now().toString(), // Re-add unique ID generation
        title,
        content,
        tabId: this.tabId(),
      };
      this.store.dispatch(notesAdd({ note: newNote }));
      this.noteForm.reset();
      this.isFormActive = false;
    }
  }
}
