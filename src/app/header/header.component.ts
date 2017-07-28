import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
             selector: 'app-header',
             templateUrl: './header.template.html',
             styleUrls: ['./header.style.scss'],
             // changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class HeaderComponent {
  constructor() {

  }
}
