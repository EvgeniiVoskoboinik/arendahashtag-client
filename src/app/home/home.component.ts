import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {HOME_ANIMATIONS} from './home.animation';

interface SelectionItem {
  id: string;
  text: string;
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



  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  updateItem(item: SelectionItem) {
    this.selectedItem = item;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
  }

}
