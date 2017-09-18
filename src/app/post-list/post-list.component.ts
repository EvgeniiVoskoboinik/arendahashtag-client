import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {FeedItem, FeedSearchReq} from '../shared/interfaces/vk.api.interfaces';
import {AdState} from '../shared/interfaces/common';
import {VkApiService} from '../shared/services/vk.api.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {Utils} from '../shared/utils';


@Component({
             selector: 'app-post-list',
             templateUrl: './post-list.template.html',
             styleUrls: ['./post-list.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PostListComponent implements OnInit, OnChanges, OnDestroy{
  @Input() adState: AdState;

  posts: FeedItem[];

  constructor(
    private sharedService: SharedService,
    private vkApiService: VkApiService,
    private route: ActivatedRoute,
  private utils: Utils,
  ) {

    this.route.queryParams
      .takeUntil(this.destroyed$)
      .subscribe(params => {
        this.adState = <AdState>this.utils.copyAndDecodeQueryParams(params);
      });

  }

  private loadPosts() {
    let params: FeedSearchReq = {
      q: this.vkApiService.createSearchQuery(this.adState),
      extended: 1,
    };

    VK.Api.call('newsfeed.search', params, data => {
      console.log(data);
    });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    let {adState} = changes;

    if (adState) {
      this.loadPosts();
    }
  }

  protected destroyed$ = new Subject<void>();

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
