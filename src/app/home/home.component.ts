import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {HOME_ANIMATIONS} from './home.animation';
import {AdStateItem} from '../shared/interfaces/common';
import {AD_TYPES, ADVERTISER_TYPES, LEASE_TERMS, PROPERTY_TYPES, ROOMS_COUNT, CITIES} from '../shared/ad-state-items';

export type TabKey = string;

export interface Tab {
  name: string;
  key: TabKey;
  buttonTitle: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.template.html',
  styleUrls: ['./home.component.scss'],
  animations: HOME_ANIMATIONS,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {

  cities = CITIES;
  adTypes = AD_TYPES;
  propertyTypes = PROPERTY_TYPES;
  advertiserTypes = ADVERTISER_TYPES;
  leaseTerms = LEASE_TERMS;
  roomsCount = ROOMS_COUNT;

  selectedCity: string|number[];
  selectedAdType: string|number[];
  selectedLeaseTerm: string|number[];
  selectedPropertyType: string|number[];
  selectedRoomsCounts: string|number[] = [];
  selectedAdvertiserTypes: string|number[] = [];

  dropdownPlaceholder = 'Не выбрано';

  get isRentSelected(): boolean {
    return this.selectedAdType &&
      (this.selectedAdType[0] === AD_TYPES[0].id || this.selectedAdType[0] === AD_TYPES[1].id);
  }
  get ispropertyContainsRooms(): boolean {
    return this.selectedPropertyType &&
      (this.selectedPropertyType[0] === PROPERTY_TYPES[0].id || this.selectedPropertyType[0] === PROPERTY_TYPES[1].id);
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

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  onTabSelected(key: string) {
    this.selectedTab = this.tabs.find(tab => tab.key === key);
  }

  onSelectedChange(item: any) {
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

}
