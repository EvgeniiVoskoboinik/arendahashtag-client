import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {VkLoginStatus, VkUserData} from './interfaces';


@Injectable()
export class SharedService{

  private _vkUserData = new BehaviorSubject<VkUserData>(null);
  vkUserData$ = this._vkUserData.asObservable();
  get vkUserData(): VkUserData {
    return this._vkUserData.getValue();
  }
  set vkUserData(status: VkUserData) {
    this._vkUserData.next(status);
  }


  constructor() {
    this.getLoginStatus();
  }

  private getLoginStatus() {
    VK.Auth.getLoginStatus((res: VkLoginStatus) => {
      console.log(res);
      this.vkUserData = res;
    });
  }


}
