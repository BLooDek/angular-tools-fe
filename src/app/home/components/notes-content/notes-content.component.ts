import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject, input, InputSignal, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Note } from '../../../shared/models/note.interface';
import { notesFeature } from '../../reducers/notes.reducer';
import { notesUpdate } from '../../actions/notes.actions';
import { notesAdd, notesRemove } from '../../actions/notes.actions';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-notes-content',
  imports: [CommonModule, ReactiveFormsModule, NoteComponent],
  templateUrl: './notes-content.component.html',
  styleUrl: './notes-content.component.scss',
})
export class NotesContentComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly fb = inject(FormBuilder);

  tabId = input('');
  notes$: Observable<Note[]> = this.store.select(notesFeature.selectNotes);
  noteForm!: FormGroup;
  isFormActive = false;

  ngOnInit(): void {
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
      const newNote: Note = {
        title,
        content,
        tabId: this.tabId(),
      };
      this.store.dispatch(notesAdd({ note: newNote }));
      this.noteForm.reset();
      this.isFormActive = false;
    }
  }
  onUpdateNote($event: Note) {
    this.store.dispatch(
      notesUpdate({ note: { ...$event, tabId: this.tabId() } })
    );
  }

  onDeleteNote(id: string): void {
    this.store.dispatch(notesRemove({ id }));
  }
}
