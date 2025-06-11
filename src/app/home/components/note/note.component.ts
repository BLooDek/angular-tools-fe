import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Note } from '../../../shared/models/note.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    FormsModule,
    A11yModule,
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() note!: Note;
  @Output() deleteNote = new EventEmitter<string>();
  @Output() updateNote = new EventEmitter<Note>();

  showConfirmation = false;
  editMode = false;
  editedNote: Note = { id: '', title: '', content: '', tabId: '' };
  ngOnInit(): void {
    this.editedNote = { ...this.note };
  }

  onDeleteClick(): void {
    this.showConfirmation = true;
  }

  onConfirmDelete(): void {
    this.deleteNote.emit(this.note.id);
    this.showConfirmation = false;
  }

  onCancelDelete(): void {
    this.showConfirmation = false;
  }

  onDblClick(): void {
    this.editMode = true;
    this.editedNote = { ...this.note };
  }

  onSave(): void {
    this.updateNote.emit(this.editedNote);
    this.editMode = false;
  }

  onCancelEdit(): void {
    this.editMode = false;
    this.editedNote = { ...this.note };
  }
}
