import {
    Component,
    Output,
    EventEmitter,
    ContentChildren,
    QueryList,
    AfterViewInit,
    AfterContentInit,
    ChangeDetectionStrategy, Input, ChangeDetectorRef,
} from '@angular/core';
import {TabComponent} from './tab/tab.component';
import {Observable, ReplaySubject} from 'rxjs';

const ACTIVE_FONT = '32px Open Sans';

@Component({
               selector: 'app-tabset',
               templateUrl: './tabset.template.html',
               styleUrls: ['./tabset.style.scss'],
               changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class TabsetComponent implements AfterViewInit, AfterContentInit {
    @Input() selectedKey: any;
    @Output() select = new EventEmitter<any>();

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;
    selectorParams: SelectorParams;
    private fontsReady$: Observable<any>;
    private tabsReady$ = new ReplaySubject<void>(1);

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        this.fontsReady$ = Observable.fromPromise((<any>document).fonts.load(ACTIVE_FONT));
    }

    ngAfterContentInit() {
        if (this.tabs.length) {
            this.tabsReady$.next(null);
        }
    }

    ngAfterViewInit() {
        Observable.combineLatest(
            this.fontsReady$,
            Observable.merge(this.tabsReady$, this.tabs.changes),
        )
        .subscribe(() => {
          setTimeout(() => {
            this.onTabsChages();
          }, 100);
        });
    }
    private onTabsChages() {
        if (!this.tabs.length) return;

        let selectedTab = this.tabs.find(tab => tab.key === this.selectedKey);
        if (selectedTab) {
          this.selectorParams = this.getSelectorParams(selectedTab.tabElementRef.nativeElement);
          selectedTab.active = true;
          setTimeout(() => {
            this.changeDetectorRef.markForCheck();
          }, 0);
          selectedTab.changeDetectorRef.detectChanges();
        }

        this.tabs.forEach((tab, index) => {
            tab.clicked.subscribe(key => {
                key = key != null ? key : index;

                this.selectorParams = this.getSelectorParams(tab.tabElementRef.nativeElement);
                if (this.selectedKey === key) {
                    return;
                }

                this.markAsActive(key);
                this.selectedKey = key;
                this.select.emit(key);
            });
        });
    }
    private markAsActive(key: string | number) {
        this.tabs.forEach(tab => tab.active = tab.key === key);
    }

    private getSelectorParams(element: HTMLElement): SelectorParams {
        let elementRect = element.getBoundingClientRect();
        let parentRect = element.parentElement.parentElement.getBoundingClientRect();
        return {
            width: elementRect.width,
            left: elementRect.left - parentRect.left,
        };
    }
}

interface SelectorParams {
    width: number;
    left: number;
}
