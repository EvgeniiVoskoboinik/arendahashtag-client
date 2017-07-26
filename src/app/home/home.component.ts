import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {HOME_ANIMATIONS} from './home.animation';

interface SelectionItem {
  id: string;
  text: string;
}

export type TabKey = string | number;

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

  items: SelectionItem[] = [
    {
      id: 'msk',
      text: 'msk'
    },
    {
      id: 'spb',
      text: 'spb'
    }
  ];
  selectedItem: SelectionItem = this.items[0];

  tabs: Tab[] = [
    {
      key: 'create',
      name: 'Разместить объявление'
    },
    {
      key: 'find',
      name: 'Найти объявление'
    },
  ];
  selectedTab: Tab;

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  updateItem(item: SelectionItem) {
    this.selectedItem = item;
  }

  onTabSelected(tab: Tab) {
    this.selectedTab = tab;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

}
