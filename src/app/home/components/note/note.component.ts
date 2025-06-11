import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Note } from '../../../shared/models/note.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
})
export class NoteComponent {
  @Input() note!: Note;
  @Output() deleteNote = new EventEmitter<string>();

  showConfirmation = false;

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
}
