import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedService} from './shared.service';
import {VkApiService} from './services/vk.api.service';

@NgModule({
            imports: [
              CommonModule,
            ],
            declarations: [],
            exports: [],
            entryComponents: [],
          })
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: this,
      providers: [
        VkApiService,
        SharedService,
      ],
    };
  }
}
