import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone,
} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {AD_FORM_ANIMATIONS} from './ad-form.animation';
import {AD_TYPES, ADVERTISER_TYPES, LEASE_TERMS, PROPERTY_TYPES, ROOMS_COUNT} from '../shared/ad-state-items';
import {Router} from '@angular/router';
import {AdStateStore, EditValueAction, Actions, AdState} from '../shared/redux';
import {CitiesReq, CreateWallPostReq} from '../shared/interfaces/vk.api.interfaces';
import {VK_API_VERSION, VkApiService} from '../shared/services/vk.api.service';

export type TabKey = string;

export interface Tab {
  name: string;
  key: TabKey;
  buttonTitle: string;
}

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.template.html',
  styleUrls: ['./ad-form.style.scss'],
  animations: AD_FORM_ANIMATIONS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdFormComponent implements OnInit{

  cities;
  adTypes = AD_TYPES;
  propertyTypes = PROPERTY_TYPES;
  advertiserTypes = ADVERTISER_TYPES;
  leaseTerms = LEASE_TERMS;
  roomsCount = ROOMS_COUNT;

  adState: AdState;
  dropdownPlaceholder = 'Не выбрано';


  get isRentSelected(): boolean {
    return this.adState.adType &&
      (this.adState.adType[0] === AD_TYPES[0] || this.adState.adType[0] === AD_TYPES[1]);
  }
  get ispropertyContainsRooms(): boolean {
    return this.adState.propertyType &&
      (this.adState.propertyType[0] === PROPERTY_TYPES[0] || this.adState.propertyType[0] === PROPERTY_TYPES[1]);
  }

  tabs: Tab[] = [
    {
      key: 'find',
      name: 'Найти объявление',
      buttonTitle: 'Найти',
    },
    {
      key: 'create',
      name: 'Подать объявление',
      buttonTitle: 'Продолжить',
    },
  ];
  selectedTab: Tab;

  constructor(
    private sharedService: SharedService,
    private router: Router,
    private adStateStore: AdStateStore,
    private changeDetectorRef: ChangeDetectorRef,
    private vkApiService: VkApiService,
    private zone: NgZone,

  ) {
    this.adStateStore.state$
      .subscribe(state => {
        this.adState = state;
      });
  }

  private postAd() {
    let params: CreateWallPostReq = {
      message: this.vkApiService.createWallPostMessage(this.adState),
      v: VK_API_VERSION,
    };

    VK.Api.call('wall.post', params, data => {
      let {error, response} = data;

      if (error) return;

      this.zone.run(() => {
        this.adStateStore.dispatch({type: Actions.ResetState});
        this.router.navigate(['/post_result'], {
          queryParams: response,
        });
      });
    });

  }

  private findAd() {
    this.router.navigate(['/find']);
  }


  onTabSelected(key: string) {
    this.selectedTab = this.tabs.find(tab => tab.key === key);
  }

  onSelectedChange(key: string, value: any) {
    this.changeStateValue(key, value);
  }

  onClickNext() {
    if (this.selectedTab.key === 'create') {
      this.postAd();
    } else {
      this.findAd();
    }
  }

  private changeStateValue(key: string, value: any) {
    let action: EditValueAction = {
      type: Actions.SetValue,
      key,
      value,
    };
    this.adStateStore.dispatch(action);
  }

  onCitySearchChange(str?: string) {
    let params: CitiesReq = {
      country_id: 1,
      v: VK_API_VERSION,
      count: 50,
    };
    if (str) {
      params.q = str;
    }

    VK.Api.call('database.getCities', params, data => {
      this.cities = data.response.items.map(x => {
        let description = '';
        if (x.area) description = `${x.area}, `;
        if (x.region) description += x.region;

        return {
          id: x.id,
          title: x.title,
          tag: VkApiService.createCityHashtag(x),
          description: description.trim(),
        };
      });
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnInit() {
    this.onCitySearchChange();
  }
}
