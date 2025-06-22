import { inject, Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, tap } from 'rxjs';

import { TabsService } from '../services/tabs.service';
import * as tabsActions from '../actions/tabs.actions';

@Injectable()
export class TabsEffects {
  private tabsService: TabsService = inject(TabsService);
  private actions$: Actions = inject(Actions);

  getTabs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tabsActions.tabsGet),
      switchMap(() =>
        this.tabsService.getTabs().pipe(
          map((tabs) => tabsActions.tabsGetSuccess({ tabs })),
          catchError((error) => of(tabsActions.tabsGetError({ error })))
        )
      )
    )
  );

  addTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tabsActions.tabsAdd),
      mergeMap(({ tab }) =>
        this.tabsService.addTab(tab).pipe(
          map((newTab) => tabsActions.tabsAddSuccess({ tab: newTab })),
          catchError((error) => of(tabsActions.tabsAddError({ error })))
        )
      )
    )
  );

  deleteTab$ = createEffect(() =>
    this.actions$.pipe(
      ofType(tabsActions.tabsRemove),
      switchMap(({ id }) =>
        this.tabsService.deleteTab(id).pipe(
          map(() => tabsActions.tabsRemoveSuccess({ id })),
          catchError((error) => of(tabsActions.tabsRemoveError({ error })))
        )
      )
    )
  );
}
