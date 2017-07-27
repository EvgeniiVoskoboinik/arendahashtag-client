import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {HOME_ANIMATIONS} from './home.animation';
import {AdStateItem} from '../shared/interfaces/common';
import {AD_TYPES, ADVERTISER_TYPES, LEASE_TERMS, PROPERTY_TYPES, ROOMS_COUNT, CITIES} from '../shared/ad-state-items';

export type TabKey = string;

export interface Tab {
  name: string;
  key: TabKey;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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

  selectedCities: AdStateItem[] = [];
  selectedAdTypes: AdStateItem[] = [];
  selectedPropertyTypes: AdStateItem[] = [];
  selectedAdvertiserTypes: AdStateItem[] = [];
  selectedLeaseTerms: AdStateItem[] = [];
  selectedRoomsCounts: AdStateItem[] = [];

  tabs: Tab[] = [
    {
      key: 'find',
      name: 'Найти объявление',
    },
    {
      key: 'create',
      name: 'Разместить объявление',
    },
  ];
  selectedTab: Tab = this.tabs[0];

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  onTabSelected(tab: Tab) {
    this.selectedTab = tab;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

}
