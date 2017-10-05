import {ModuleWithProviders, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {InputLayoutComponent} from './input-layout/input-layout.component';
import {TabsetComponent} from './tabset/tabset.component';
import {TabComponent} from './tabset/tab/tab.component';
import {CheckboxComponent} from './checkbox/checkbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InputLayoutComponent,
    TabsetComponent,
    TabComponent,
    CheckboxComponent,
  ],
  entryComponents: [],
  exports: [
    InputLayoutComponent,
    TabsetComponent,
    TabComponent,
    CheckboxComponent,
  ],
})

export class UiKitModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: this,
      providers: [],
    };
  }
}
