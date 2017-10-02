import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {HOME_ANIMATIONS} from './home.animation';
import {SharedService} from '../shared/shared.service';
import {VkStatus} from '../shared/interfaces/vk.api.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.template.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
  animations: HOME_ANIMATIONS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

  get needAuth(): boolean {
    let status = this.sharedService.vkUserData;
    return status && !status.session;
  }

  get vkUSerData(): VkStatus {
    return this.sharedService.vkUserData;
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private sharedService: SharedService,
    ) {
      this.sharedService.vkUserData$
        .skip(1)
        .subscribe(__ => {
          this.changeDetectorRef.detectChanges();
        });
    }
}
