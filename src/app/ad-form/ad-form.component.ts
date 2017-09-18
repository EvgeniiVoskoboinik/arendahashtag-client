import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {AD_FORM_ANIMATIONS} from './ad-form.animation';
import {AD_TYPES, ADVERTISER_TYPES, LEASE_TERMS, PROPERTY_TYPES, ROOMS_COUNT, CITIES} from '../shared/ad-state-items';
import {AdState} from '../shared/interfaces/common';
import {VkApiService} from '../shared/services/vk.api.service';
import {Router} from '@angular/router';


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

  cities = CITIES;
  adTypes = AD_TYPES;
  propertyTypes = PROPERTY_TYPES;
  advertiserTypes = ADVERTISER_TYPES;
  leaseTerms = LEASE_TERMS;
  roomsCount = ROOMS_COUNT;

  adState: AdState = {
    city: null,
    adType: null,
    leaseTerm: null,
    propertyType: null,
    roomsCount: null,
    advertiser: null,
  };

  dropdownPlaceholder = 'Не выбрано';


  get isRentSelected(): boolean {
    return this.adState.adType &&
      (this.adState.adType[0] === AD_TYPES[0].id || this.adState.adType[0] === AD_TYPES[1].id);
  }
  get ispropertyContainsRooms(): boolean {
    return this.adState.propertyType &&
      (this.adState.propertyType[0] === PROPERTY_TYPES[0].id || this.adState.propertyType[0] === PROPERTY_TYPES[1].id);
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
  selectedTab: Tab = this.tabs[0];

  constructor(
    private sharedService: SharedService,
    private vkApiService: VkApiService,
    private router: Router,
  ) {
  }



  private postAd() {

  }

  private findAd() {
    this.router.navigate(['/find'], {
      queryParams: this.adState,
    });
  }


  onTabSelected(key: string) {
    this.selectedTab = this.tabs.find(tab => tab.key === key);
  }

  onSelectedChange(item: any) {
  }

  onClickNext() {
    if (this.selectedTab.key === 'create') {
      this.postAd();
    } else {
      this.findAd();
    }
  }

  ngOnInit() {

  }
}
