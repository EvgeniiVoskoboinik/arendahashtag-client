import {Injectable} from '@angular/core';
import {AdReducer} from './reducer';
import {AdState, AdAction} from './interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AdStateStore{
  private readonly adStateSubject = new BehaviorSubject<AdState>(null);

  state$ = this.adStateSubject.asObservable();
  get state(): AdState {
    return this.adStateSubject.getValue();
  }

  constructor(private reducer: AdReducer) {}

  private validateAction(action: AdAction) {
    if (!action || typeof action !== 'object' || Array.isArray(action)) {
      throw new Error('Action must be an object!');
    }
    if (typeof action.type === 'undefined') {
      throw new Error('Action must have a type!');
    }
  }

  dispatch(action: AdAction): void {
    this.validateAction(action);
    let state: AdState = this.reducer.reduce(this.state, action);
    this.adStateSubject.next(state);
  }
}
