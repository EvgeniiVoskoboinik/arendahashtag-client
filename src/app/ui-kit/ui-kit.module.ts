import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputLayoutComponent} from './input-layout/input-layout.component';
import {SearchSelectComponent} from './search-select/search-select.component';
import {OffClickDirective} from './search-select/off-click';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InputLayoutComponent,
    SearchSelectComponent,
    OffClickDirective
  ],
  entryComponents: [],
  exports: [
    InputLayoutComponent,
    SearchSelectComponent,
    OffClickDirective
  ]
})

export class UiKitModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: this,
      providers: [],
    };
  }
}
