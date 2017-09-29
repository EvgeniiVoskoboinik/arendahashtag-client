import {Injectable} from '@angular/core';
import {AdState, AdAction, EditValueAction} from './interfaces';
import {ADVERTISER_TYPES, ROOMS_COUNT} from '../ad-state-items';

export const INITIAL_STATE: AdState = {
  city: null,
  adType: null,
  leaseTerm: null,
  propertyType: null,
  roomsCount: [ROOMS_COUNT[0]],
  advertiser: [ADVERTISER_TYPES[0]],
  description: '',
};

export enum Actions{
  SetValue,
  ResetState,
}

@Injectable()
export class AdReducer{

  private [Actions.SetValue](state: AdState, action: EditValueAction): AdState {
    return {
      ...state,
      [action.key]: action.value,
    };
  }
  private [Actions.ResetState](): AdState {
    return Object.assign({}, INITIAL_STATE);
  }

  reduce(state: AdState, action: AdAction): AdState {
    let reducerAction = this[action.type];
    return reducerAction ?  reducerAction(state, action) : state;
  }
}
