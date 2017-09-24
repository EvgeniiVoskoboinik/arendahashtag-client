import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedService} from './shared.service';
import {VkApiService} from './services/vk.api.service';
import {Utils} from './utils';
import {AdReducer} from './redux/reducer';
import {AdStateStore} from './redux/store';
import {AutosizeDirective} from './directives/autosize';

@NgModule({
            imports: [
              CommonModule,
            ],
            declarations: [
              AutosizeDirective,
            ],
            exports: [
              AutosizeDirective,
            ],
            providers: [
              VkApiService,
              SharedService,
              Utils,
              AdReducer,
              AdStateStore,
            ],
          })
export class SharedModule {}
