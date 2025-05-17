import { Routes } from '@angular/router';
import { HomeComponent } from './home/components/home/home.component';
import { QueryBuilderComponent } from './query-builder/components/query-builder/query-builder.component';
import { TableComponent } from './table/components/table/table.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'query-builder', component: QueryBuilderComponent },
  { path: 'grid', component: TableComponent },
];
