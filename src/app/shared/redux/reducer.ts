import {Injectable} from '@angular/core';
import {AdState, AdAction, EditValueAction} from './interfaces';

export enum Actions{
  SetValue,
}

@Injectable()
export class AdReducer{

  private [Actions.SetValue](state: AdState, action: EditValueAction): AdState {
    return {
      ...state,
      [action.key]: action.value,
    };
  }

  reduce(state: AdState, action: AdAction): AdState {
    let reducerAction = this[action.type];
    return reducerAction ?  reducerAction(state, action) : state;
  }
}
