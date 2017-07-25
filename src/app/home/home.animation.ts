import {AnimationEntryMetadata} from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/animations';

export const HOME_ANIMATIONS: AnimationEntryMetadata[] = [
  trigger('slideLeft', [
    transition(':enter', [
      style({ transform: 'translateX(-50px)'}),
      animate('2s ease-out', style({transform: 'translateX(0)'})),
    ]),
  ]),
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: '0'}),
      animate('1s ease-out', style({ opacity: '1'})),
    ]),
  ]),
];
