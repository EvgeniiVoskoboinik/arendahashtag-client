import {
  Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, NgZone,
} from '@angular/core';
import {AD_FORM_ANIMATIONS} from './ad-form.animation';
import {AD_TYPES, ADVERTISER_TYPES, LEASE_TERMS, PROPERTY_TYPES, ROOMS_COUNT} from '../shared/ad-state-items';
import {Router} from '@angular/router';
import {AdStateStore, EditValueAction, Actions, AdState} from '../shared/redux';
import {CitiesReq} from '../shared/interfaces/vk.api.interfaces';
import {VK_API_VERSION, VkApiService} from '../shared/services/vk.api.service';
import {CreatePostService} from './create-post.service';

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
  providers: [CreatePostService],
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

  private files: FileList;

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
    private createPostService: CreatePostService,
  ) {
    this.adStateStore.state$
      .subscribe(state => {
        this.adState = state;
      });
  }

  loadAttachments() {
    this.attachmentsLoading = true;
    this.createPostService.loadAttachments(this.files)
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

  private postAd() {
    this.loading = true;
    this.createPostService.post(this.adState, this.attachments)
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

  private findAd() {
    this.router.navigate(['/find']);
  }


  onTabSelected(key: string) {
    if (this.errorMsg) this.errorMsg = null;
    this.selectedTab = this.tabs.find(tab => tab.key === key);
  }

  onSelectedChange(key: string, value: any) {
    this.changeStateValue(key, value);
  }

  onClickNext() {
    if (!this.isCorrectInputs()) {
      this.errorMsg = 'Не все обязательные поля заполнены';
      return;
    }

    if (!this.attachmentsLoaded) {
      this.errorMsg = 'Вы забыли загрузить фотографии';
      return;
    }

    this.loading = true;
    this.changeDetectorRef.detectChanges();
    if (this.selectedTab.key === 'create') {
      this.postAd();
    } else {
      this.findAd();
    }
  }

  private isCorrectInputs(): boolean {
    if (this.isRentSelected && !this.adState.leaseTerm) return false;

    return Boolean(
      this.adState.city
      && this.adState.adType
      && this.adState.propertyType
    );
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

  onFileChange(files: FileList) {
    this.files = files;

    if (!files.length) {
      this.attachments = null;
      this.attachmentsLoaded = true;
    } else {
      this.attachmentsLoaded = false;
    }
  }

  ngOnInit() {
    this.onCitySearchChange();
  }
}
