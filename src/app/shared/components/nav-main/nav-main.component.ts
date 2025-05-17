import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
  pages: { link: string; name: string }[] = [
    { link: './', name: 'Home' },
    { link: 'query-builder', name: 'Query Builder' },
    { link: 'grid', name: 'Table' },
  ];

  constructor(private matDialog: MatDialog) {}

  onOpenRegister(): void {
    this.matDialog.open(RegisterDialogComponent);
  }
}
