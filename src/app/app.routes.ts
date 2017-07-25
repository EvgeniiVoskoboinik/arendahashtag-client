import {ModuleWithProviders} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';


const ROUTES = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot([...ROUTES]);
