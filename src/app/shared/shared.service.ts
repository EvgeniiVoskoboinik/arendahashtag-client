import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {VkLoginStatus} from './interfaces';


@Injectable()
export class SharedService{

  private _vkUser = new BehaviorSubject<any>(null);
  vkUser$ = this._vkUser.asObservable();
  get vkUser(): any {
    return this._vkUser.getValue();
  }
  set vkUser(user: any) {
    this._vkUser.next(user);
  }

  private _vkLoginStatus = new BehaviorSubject<VkLoginStatus>(null);
  vkLoginStatus$ = this._vkLoginStatus.asObservable();
  get vkLoginStatus(): VkLoginStatus {
    return this._vkLoginStatus.getValue();
  }
  set vkLoginStatus(status: VkLoginStatus) {
    this._vkLoginStatus.next(status);
  }


  constructor() {
    this.getLoginStatus();
  }

  private getLoginStatus() {
    VK.Auth.getLoginStatus((res: VkLoginStatus) => {
      console.log(res);
      this.vkLoginStatus = res;
    });
  }


}
