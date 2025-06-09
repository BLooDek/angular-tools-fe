import { createFeature, createReducer, on } from '@ngrx/store';
import * as tabActions from '../actions/tabs.actions';
export interface ITab {
  type: string;
  title: string;
  id?: string;
}

interface State {
  error: string | null;
  loading: boolean;
  tabs: ITab[];
}

const initialState: State = {
  error: null,
  loading: false,
  tabs: [],
};

export const tabsReducer = createReducer(
  initialState,
  on(tabActions.tabsGet, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(tabActions.tabsGetSuccess, (state, { tabs }) => ({
    ...state,
    loading: false,
    tabs: tabs,
  })),
  on(tabActions.tabsAdd, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(tabActions.tabsAddSuccess, (state, { tab }) => ({
    ...state,
    loading: false,
    tabs: [...state.tabs, tab],
  })),
  on(
    tabActions.tabsAddError,
    tabActions.tabsRemoveError,
    tabActions.tabsGetError,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
    })
  ),
  on(tabActions.tabsRemove, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(tabActions.tabsRemoveSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    tabs: state.tabs.filter((tab) => tab.id !== id),
  }))
);

export const tabsFeature = createFeature({
  name: 'tabs',
  reducer: tabsReducer,
});
