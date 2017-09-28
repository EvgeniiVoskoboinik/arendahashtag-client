/* tslint:disable:max-classes-per-file */

import {Subject} from 'rxjs/Subject';
import {OnDestroy} from '@angular/core';

export class BaseComponent implements OnDestroy {
  protected destroyed$ = new Subject<void>();

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

type Constructor<T> = new(...args: any[]) => T;

interface TrackDestroyTarget {
  ngOnDestroy?(): void;
}

export function TrackDestroy<T extends Constructor<TrackDestroyTarget>>(Base: T) {
  return class extends Base implements OnDestroy {
    protected destroyed$ = new Subject<void>();

    constructor(...args: any[]) {
      super(...args);
    }

    ngOnDestroy() {
      this.destroyed$.next();
      this.destroyed$.complete();

      if (super.ngOnDestroy) super.ngOnDestroy();
    }
  };
}
