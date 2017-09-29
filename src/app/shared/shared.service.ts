import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {VkStatus} from './interfaces';


@Injectable()
export class SharedService{

  private _vkUserData = new BehaviorSubject<VkStatus>(null);
  vkUserData$ = this._vkUserData.asObservable();
  get vkUserData(): VkStatus {
    return this._vkUserData.getValue();
  }
  set vkUserData(status: VkStatus) {
    this._vkUserData.next(status);
  }

  constructor() {
    this.getLoginStatus();
  }

  private getLoginStatus() {
    VK.Auth.getLoginStatus((res: VkStatus) => {
      console.log(res);

      /* if need get user data */
      // if (res.status === 'connected') {
      //   VK.Api.call('users.get', {}, data => {});
      // }
      this.vkUserData = res;
    });
  }


}
