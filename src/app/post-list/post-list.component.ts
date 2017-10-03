import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {FeedSearchReq, FeedSearchRes} from '../shared/interfaces/vk.api.interfaces';
import {VK_API_VERSION, VkApiService} from '../shared/services/vk.api.service';
import {AdStateStore, AdState} from '../shared/redux';
import {FeedItem} from '../shared/interfaces/feedItem';
import {BaseComponent} from '../shared/base-component';

@Component({
             selector: 'app-post-list',
             templateUrl: './post-list.template.html',
             styleUrls: ['./post-list.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PostListComponent extends BaseComponent{
  private adState: AdState;
  posts: FeedItem[];

  constructor(
    private vkApiService: VkApiService,
    private adStateStore: AdStateStore,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    super();

    this.adStateStore.state$
      .takeUntil(this.destroyed$)
      .subscribe(state => {
        this.adState = state;
        this.loadPosts();
      });
  }

  private loadPosts() {
    let params: FeedSearchReq = {
      q: this.vkApiService.createSearchQuery(this.adState),
      extended: 1,
      v: VK_API_VERSION,
      count: 200,
    };

    VK.Api.call('newsfeed.search', params, (data: FeedSearchRes) => {
      let res = data.response;
      this.posts = res.items.map(x => FeedItem.createFromDto(x, res.groups, res.profiles));
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    });
  }
}
