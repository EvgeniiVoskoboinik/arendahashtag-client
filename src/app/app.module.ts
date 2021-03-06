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
import {AdFormComponent} from './ad-form/ad-form.component';
import {PostComponent} from './post/post.component';
import {PostListComponent} from './post-list/post-list.component';
import {WallPostResultComponent} from './wall-post-result/wall-post-result.component';
import {DropdownComponent} from './shared/dropdown/dropdown.component';
import {PhotoUploadComponent} from './photo-upload/photo-upload.component';
import { NgxGalleryModule } from './shared/gallery/ngx-gallery.module';
import {FooterComponent} from './footer/footer.component';
import {AdFormService} from './ad-form/ad-form.service';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    HeaderComponent,
    VkAuthComponent,
    AdFormComponent,
    PostComponent,
    PostListComponent,
    WallPostResultComponent,
    PhotoUploadComponent,
    FooterComponent,

    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    HttpModule,
    NgxGalleryModule,

    UiKitModule,
    routing,
    SharedModule,
  ],
  providers: [AdFormService],
  bootstrap: [AppComponent],
})
export class AppModule { }
