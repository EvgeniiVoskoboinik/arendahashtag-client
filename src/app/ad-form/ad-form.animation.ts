import {AnimationEntryMetadata} from '@angular/core';
import {style, state, animate, transition, trigger} from '@angular/animations';

export const AD_FORM_ANIMATIONS: AnimationEntryMetadata[] = [
  trigger('slideLeft', [
    transition(':enter', [
      style({ transform: 'translateX(-50px)'}),
      animate('1s ease-out', style({transform: 'translateX(0)'})),
    ]),
    // transition(':leave', [
    //   style({ transform: 'translateY(0)'}),
    //   animate('.5s ease-out', style({transform: 'translateY(-50px)'})),
    // ]),
  ]),
  trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: '0'}),
      animate('.5s ease-out', style({ opacity: '1'})),
    ]),
    transition(':leave', [
      style({ opacity: '1'}),
      animate('.5s ease-out', style({ opacity: '0'})),
    ]),
  ]),
];
