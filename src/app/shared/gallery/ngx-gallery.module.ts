import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { NgxGalleryArrowsComponent } from './ngx-gallery-arrows.component';
import { NgxGalleryImageComponent } from './ngx-gallery-image.component';
import { NgxGalleryThumbnailsComponent } from './ngx-gallery-thumbnails.component';
import { NgxGalleryPreviewComponent } from './ngx-gallery-preview.component';
import { NgxGalleryComponent } from './ngx-gallery.component';

export class CustomHammerConfig extends HammerGestureConfig  {
    overrides = <any>{
        'pinch': { enable: false },
        'rotate': { enable: false },
    };
}

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        NgxGalleryArrowsComponent,
        NgxGalleryImageComponent,
        NgxGalleryThumbnailsComponent,
        NgxGalleryPreviewComponent,
        NgxGalleryComponent,
    ],
    exports: [
        NgxGalleryComponent,
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: CustomHammerConfig,
        },
    ],
})
export class NgxGalleryModule { }
