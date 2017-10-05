import {Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {VkStatus} from '../shared/interfaces/vk.api.interfaces';
import {AdStateStore, Actions} from '../shared/redux';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.template.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit{
  tab: string;

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
    private activatedRoute: ActivatedRoute,
    ) {
      this.sharedService.vkUserData$
        .skip(1)
        .subscribe(() => {
          this.changeDetectorRef.detectChanges();
        });
    }

    ngOnInit() {
      if (!this.adStateStore.state) {
        this.adStateStore.dispatch({type: Actions.ResetState});
      }
      this.tab = this.activatedRoute.snapshot.queryParams['a'];
    }
}
