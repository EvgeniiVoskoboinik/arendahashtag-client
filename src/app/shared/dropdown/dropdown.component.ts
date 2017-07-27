import {
  ChangeDetectorRef,
  OnInit,
  EventEmitter,
  Output,
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef, OnDestroy,
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DropdownId, DropdownItem} from './dropdown-item';
import {OnNew} from '../misc/on-new.decorator';

export const DEFAULT_SEARCH_DEBOUNCE = 50;
export const MAX_TITLES_TO_DISPLAY_FOR_MULTISELECTED = 10;

@Component({
             selector: 'app-dropdown',
             templateUrl: './dropdown.template.html',
             styleUrls: ['./dropdown.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class DropdownComponent implements OnInit, OnDestroy{

  @ViewChild('searchInput') searchInput: ElementRef;
  @ViewChild('itemsList') itemsList: ElementRef;

  /**
   * Shows this text when no items selected
   */
  @Input() placeholder: string = 'Select any';
  titlesMap: {
    [index: string]: string;
  } = {};

  /**
   * Items to show
   */
  @Input() @OnNew<DropdownComponent, DropdownItem[]>(x => x.onNewItems) items: DropdownItem[];
  @OnNew<DropdownComponent, DropdownItem[]>(x => x.onNewVisibleItems) visibleItems: DropdownItem[] = [];

  @Input() multiselection: boolean = false;
  @Input() @OnNew<DropdownComponent, string[]>(x => x.onNewMultiselected) selected: DropdownId[] = [];

  @Output() selectedChange = new EventEmitter<DropdownId[]>();

  allMultiselected: boolean = false;
  someMultiselected: boolean = false;

  expanded: boolean = false;

  /**
   * Turns on searching
   */
  @Input() searching: boolean = false;

  /**
   * Turns on client searching. Dropdown will filter items be himself.
   */
  @Input() clientSearching: boolean = false;
  /**
   * Sets debounce with which dropdown would react on typing
   */
  @Input() searchDebounce = DEFAULT_SEARCH_DEBOUNCE;
  /**
   * Sets error for search field.
   */
  @Input() searchError = '';
  /**
   * Fires when search text changes
   */
  @Output() searchChange = new EventEmitter<string>();
  search: string = '';
  searchControl = new FormControl();

  /**
   * Fires when dropdown gains focus
   */
  @Output() focus = new EventEmitter<void>();
  /**
   * Fires when dropdown loses focus
   */
  @Output() blur = new EventEmitter<void>();

  /**
   * Shows loading animation
   */
  @Input() loading: boolean = false;

  /**
   * Total number of items.
   */
  @Input() totalItems: number;


  inited: boolean = false;

  scrollInItems: boolean = false;

  get isItemSelected(): boolean {
    return Boolean(this.selected.length);
  }
  get text(): string {
    if (!this.isItemSelected) {
      return this.placeholder;
    }

    let text = this.selected.filter((__, ind) => ind < MAX_TITLES_TO_DISPLAY_FOR_MULTISELECTED)
      .map(this.getTitle).join(', ');
    if (this.selected.length >= MAX_TITLES_TO_DISPLAY_FOR_MULTISELECTED) {
      text += '...';
    }
    return text;
  }

  constructor(
    public changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  onNewItems() {
    this.prepareItems();
    this.updateTitlesMap();
    this.updateVisibleItems();
  }

  onNewVisibleItems() {
    this.visibleItems = this.visibleItems || [];
    this.updateMultiselctProperties();
  }

  ngOnInit() {
    this.inited = true;

    this.setupSearch();
    this.updateMultiselctProperties();
  }


  private setupSearch() {
    this.searchControl.valueChanges
      .skip(1)
      .debounceTime(this.searchDebounce)
      .distinctUntilChanged()
      .subscribe(search => {
        this.search = search;
        this.searchChange.emit(this.search);

        this.applySearch();
        this.changeDetectorRef.detectChanges();
      });

    this.applySearch();
  }
  private applySearch() {
    this.updateVisibleItems();
  }
  onClearSearchClick(event: MouseEvent) {
    event.stopPropagation();

    this.search = '';
  }
  onSearchEsc(event: KeyboardEvent) {
    if (this.search) {
      event.stopPropagation();
      this.search = '';
    }
  }

  private updateVisibleItems() {
    if (!this.items) {
      this.visibleItems = [];
      return;
    }

    if (!this.clientSearching) {
      this.visibleItems = this.items;
      return;
    }

    this.visibleItems = this.items.filter(x => x.title.toUpperCase().includes(this.search.toUpperCase()));
  }

  onToggleClick() {
    if (this.searchInput && this.searchInput.nativeElement) {
      setTimeout(() => {
        if (!this.loading) {
          this.searchInput.nativeElement.focus();
        }
      }, 0);
    }
  }

  onItemClick(id: DropdownId, event: MouseEvent) {
    if (this.multiselection) {
      event.stopPropagation();

      this.toggleMultiselect(id);
    } else {
      this.select(id);
    }
  }


  private select(id: DropdownId) {
    this.selected = [id];
    this.selectedChange.emit(this.selected);
  }


  onFocus() {
    this.focus.emit();
  }
  onBlur() {
  }

  onOutsideClick() {
    this.blur.emit();
  }


  onLoadingOverlayClick(event: MouseEvent) {
    event.stopPropagation();
  }


  onNewMultiselected() {
    this.selected = this.selected || [];

    this.updateMultiselctProperties();
  }
  private toggleMultiselect(id: DropdownId) {
    if (this.selected.includes(id)) {
      this.selected = this.selected.filter(x => x !== id);
    } else {
      this.selected = [...this.selected, id];
    }

    this.selectedChange.emit(this.selected);
    this.changeDetectorRef.markForCheck();
  }

  isSelected(id: DropdownId): boolean {
    return this.selected.includes(id);
  }

  private updateMultiselctProperties() {
    if (!this.multiselection) {
      return;
    }

    this.someMultiselected = this.visibleItems.some(item => this.selected.includes(item.id));
    this.allMultiselected = this.visibleItems.every(
      item => this.selected.includes(item.id));
  }

  private prepareItems() {
    if (
      this.items &&
      this.items.length &&
      this.items[0].id == null &&
      this.items[0].title == null
    ) {
      this.items = this.items.map(item => {
        return <any> {id: item, title: item};
      });
    }
  }

  private updateTitlesMap() {
    if (!this.items) {
      return;
    }

    for (let item of this.items) {
      if (typeof item.id === 'string' || typeof item.id === 'number') {
        this.titlesMap[item.id] = item.title;
      }
    }
  }
  private getTitle = (id: DropdownId): string => {
    return this.titlesMap[id] || String(id);
  };


  private getItem(id: DropdownId): DropdownItem {
    if (!this.items) {
      return null;
    }

    return this.items.find(x => x.id === id);
  }


  ngOnDestroy() {
  }

}
