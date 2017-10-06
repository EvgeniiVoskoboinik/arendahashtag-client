import {ModuleWithProviders} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {PostListComponent} from './post-list/post-list.component';
import {WallPostResultComponent} from './wall-post-result/wall-post-result.component';

const ROUTES = [
  {path: '', component: HomeComponent},
  {path: 'find', component: PostListComponent},
  {path: 'post_result', component: WallPostResultComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot([...ROUTES]);
