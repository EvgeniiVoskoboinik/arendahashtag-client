import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone, Input, OnChanges, SimpleChanges,
} from '@angular/core';
import {AD_FORM_ANIMATIONS} from './ad-form.animation';
import {AD_TYPES, ADVERTISER_TYPES, LEASE_TERMS, PROPERTY_TYPES, ROOMS_COUNT} from '../shared/ad-state-items';
import {Router} from '@angular/router';
import {AdStateStore, EditValueAction, Actions, AdState} from '../shared/redux';
import {AdFormService} from './ad-form.service';
import {FileObj} from '../photo-upload/photo-upload.component';

const MAX_ATTACHMENTS_SIZE = 52428800; // 50Mb
export type TabKey = string;

export interface Tab {
  name: string;
  key: TabKey;
}

@Component({
  selector: 'app-ad-form',
  templateUrl: './ad-form.template.html',
  styleUrls: ['./ad-form.style.scss'],
  animations: AD_FORM_ANIMATIONS,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdFormComponent implements OnInit, OnChanges{
  @Input() tab: string;

  cities;
  adTypes = AD_TYPES;
  propertyTypes = PROPERTY_TYPES;
  advertiserTypes = ADVERTISER_TYPES;
  leaseTerms = LEASE_TERMS;
  roomsCount = ROOMS_COUNT;

  adState: AdState;
  dropdownPlaceholder = 'Не выбрано';

  files: FileObj[];

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
      key: 'search',
      name: 'Найти объявление',
    },
    {
      key: 'create',
      name: 'Подать объявление',
    },
  ];
  selectedTab: Tab;
  errorMsg: string;
  loading: boolean = false;

  attachmentsLoading: boolean = false;
  attachmentsLoaded: boolean = true;

  private attachments: string = null;

  constructor(
    private router: Router,
    private adStateStore: AdStateStore,
    private changeDetectorRef: ChangeDetectorRef,
    private zone: NgZone,
    private adFormService: AdFormService,
  ) {
    this.adStateStore.state$
      .subscribe(state => {
        this.adState = state;
      });
  }

  loadAttachments() {
    this.attachmentsLoading = true;
    this.adFormService.loadAttachments(this.files)
      .then(attachments => {
        this.zone.run(() => {
          if (this.errorMsg) this.errorMsg = null;

          this.attachments = attachments;
          this.attachmentsLoading = false;
          this.attachmentsLoaded = true;
          this.changeDetectorRef.detectChanges();
        });
      }, error => {
        console.error(error.error_msg);
        this.attachmentsLoading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  postAd() {
    if (!this.attachmentsLoaded) {
      this.errorMsg = 'Вы забыли загрузить фотографии';
      return;
    }

    this.loading = true;
    this.changeDetectorRef.detectChanges();

    this.adFormService.post(this.adState, this.attachments)
      .then(data => {
        this.zone.run(() => {
          this.adStateStore.dispatch({type: Actions.ResetState});
          this.router.navigate(['/post_result'], {
            queryParams: data,
          });
        });
      }, error => {
        console.error(error.error_msg);
        this.loading = false;
        this.changeDetectorRef.detectChanges();
      });
  }

  findAd() {
    this.router.navigate(['/find']);
  }

  onTabSelected(key: string) {
    if (this.errorMsg) this.errorMsg = null;
    this.selectedTab = this.tabs.find(tab => tab.key === key);
    this.router.navigate([`/`], {
      queryParams: {a: this.selectedTab.key},
    });
  }

  onSelectedChange(key: string, value: any) {
    this.changeStateValue(key, value);
  }

  private changeStateValue(key: string, value: any) {
    if (this.errorMsg) this.errorMsg = null;

    let action: EditValueAction = {
      type: Actions.SetValue,
      key,
      value,
    };
    this.adStateStore.dispatch(action);
  }

  onCitySearchChange(str?: string) {
    this.adFormService.getCities(str).then((cities: any) => {
      this.zone.run(() => {
        this.cities = cities;
        this.changeDetectorRef.detectChanges();
      });
    }, error => {
      console.error(error.error_msg);
    });
  }

  onFileChange(files: FileObj[]) {
    this.files = files;

    if (!files || !files.length) {
      this.attachments = null;
      this.attachmentsLoaded = true;
      return;
    }

    let size = Array.from(files)
      .map(file => file.file.size)
      .reduce((cur, prev) => cur + prev);

    if (size >= MAX_ATTACHMENTS_SIZE) {
      this.errorMsg = 'Суммарный размер фотографий не должен быть больше 50 Мб';
      return;
    }

    this.attachmentsLoaded = false;
  }

  ngOnInit() {
    this.onCitySearchChange(null);
  }

  ngOnChanges(changes: SimpleChanges) {
    let {tab} = changes;

    if (tab && tab.currentValue) {
      this.selectedTab = this.tabs.find(x => x.key === this.tab);
    }
  }
}
