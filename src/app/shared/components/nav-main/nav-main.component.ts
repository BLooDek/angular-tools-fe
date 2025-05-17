import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-nav-main',
  imports: [
    CommonModule,
    RouterLink,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
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
}
