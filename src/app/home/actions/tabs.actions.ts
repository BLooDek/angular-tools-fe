import { createAction, props } from '@ngrx/store';
import { ITab } from '../reducers/tabs.reducer';

export const tabsGet = createAction('[Tabs] Get Tabs');
export const tabsGetSuccess = createAction(
  '[Tabs] Get Tabs Success',
  props<{ tabs: ITab[] }>()
);
export const tabsGetError = createAction(
  '[Tabs] Get Tabs Error',
  props<{ error: any }>()
);

export const tabsAdd = createAction('[Tabs] Add Tab', props<{ tab: ITab }>());
export const tabsAddSuccess = createAction(
  '[Tabs] Add Tab Success',
  props<{ tab: ITab }>()
);
export const tabsAddError = createAction(
  '[Tabs] Add Tab Error',
  props<{ error: any }>()
);
export const tabsRemove = createAction(
  '[Tabs] Remove Tab',
  props<{ id: string }>()
);
export const tabsRemoveSuccess = createAction(
  '[Tabs] Remove Tab Success',
  props<{ id: string }>()
);
export const tabsRemoveError = createAction(
  '[Tabs] Remove Tab Error',
  props<{ error: any }>()
);
