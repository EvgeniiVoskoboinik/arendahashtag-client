import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {HttpModule} from '@angular/http';

import { routing } from './app.routes';

import {UiKitModule} from './ui-kit/ui-kit.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {DropdownComponent} from './shared/dropdown/dropdown.component';
import {HeaderComponent} from './header/header.component';

import {VkApiService} from './shared/services/vk.api.service';
import {HomeApiService} from './home/home.api.service';

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
    HttpModule,

    UiKitModule,
    routing,
  ],
  providers: [
    VkApiService,
    HomeApiService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
