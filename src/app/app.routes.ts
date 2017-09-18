import {ModuleWithProviders} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {PostListComponent} from './post-list/post-list.component';

const ROUTES = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'find', component: PostListComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot([...ROUTES]);
