import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
             selector: 'app-footer',
             templateUrl: './footer.template.html',
             styleUrls: ['./footer.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class FooterComponent {
  constructor() {
  }
}
