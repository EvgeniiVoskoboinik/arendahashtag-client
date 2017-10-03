import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {HOME_ANIMATIONS} from './home.animation';
import {SharedService} from '../shared/shared.service';
import {VkStatus} from '../shared/interfaces/vk.api.interfaces';
import {AdStateStore, Actions} from '../shared/redux';

@Component({
  selector: 'app-home',
  templateUrl: './home.template.html',
  styleUrls: ['./home.component.scss'],
  providers: [],
  animations: HOME_ANIMATIONS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit{

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
    private adStateStore: AdStateStore,
    ) {
      this.sharedService.vkUserData$
        .skip(1)
        .subscribe(__ => {
          this.changeDetectorRef.detectChanges();
        });
    }

    ngOnInit() {
      this.adStateStore.dispatch({type: Actions.ResetState});
    }
}
