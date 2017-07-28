import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { routing } from './app.routes';

import {UiKitModule} from './ui-kit/ui-kit.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {DropdownComponent} from './shared/dropdown/dropdown.component';
import {HeaderComponent} from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    HeaderComponent,

    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),

    UiKitModule,
    routing,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
