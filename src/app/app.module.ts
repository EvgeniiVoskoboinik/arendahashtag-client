import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {HttpModule} from '@angular/http';
import {SharedModule} from './shared/shared.module';

import { routing } from './app.routes';

import {UiKitModule} from './ui-kit/ui-kit.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {VkAuthComponent} from './vk-auth/vk-auth.component';
import {DropdownComponent} from './shared/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    HeaderComponent,
    VkAuthComponent,

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
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
