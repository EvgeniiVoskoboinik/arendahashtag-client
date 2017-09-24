import {Component, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {FeedSearchReq, FeedSearchRes} from '../shared/interfaces/vk.api.interfaces';
import {VkApiService} from '../shared/services/vk.api.service';
import {Subject} from 'rxjs';
import {AdStateStore, AdState} from '../shared/redux';
import {FeedItem} from '../shared/interfaces/feedItem';

@Component({
             selector: 'app-post-list',
             templateUrl: './post-list.template.html',
             styleUrls: ['./post-list.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PostListComponent implements OnDestroy{
  private adState: AdState;
  private destroyed$ = new Subject<void>();

  posts: FeedItem[];

  constructor(
    private sharedService: SharedService,
    private vkApiService: VkApiService,
    private adStateStore: AdStateStore,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.adStateStore.state$
      .takeUntil(this.destroyed$)
      .subscribe(state => {
        console.log(state);
        this.adState = state;
        this.loadPosts();
      });

  }

  private loadPosts() {
    let params: FeedSearchReq = {
      q: this.vkApiService.createSearchQuery(this.adState),
      extended: 1,
      v: 6.68,
      count: 200,
    };

    VK.Api.call('newsfeed.search', params, (data: FeedSearchRes) => {
      let res = data.response;
      this.posts = res.items.map(x => FeedItem.createFromDto(x, res.groups, res.profiles));
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
