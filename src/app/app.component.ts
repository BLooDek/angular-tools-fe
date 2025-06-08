import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavMainComponent } from './shared/components/nav-main/nav-main.component';
import { Store } from '@ngrx/store';
import { checkToken } from './shared/actions/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-tools-fe';

  constructor(private store: Store) {
    store.dispatch(checkToken());
  }
}
