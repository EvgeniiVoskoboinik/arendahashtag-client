import {Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone} from '@angular/core';
import {
  BaseRes, FeedSearchReq, FeedSearchRes, SearchRes, WallSearchReq,
  WallSearchRes,
} from '../shared/interfaces/vk.api.interfaces';
import {GROUP_ID, VK_API_VERSION, VkApiService} from '../shared/services/vk.api.service';
import {AdStateStore, AdState} from '../shared/redux';
import {FeedItem} from '../shared/interfaces/feedItem';
import {BaseComponent} from '../shared/base-component';
import {Router} from '@angular/router';

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
    private router: Router,
    private zone: NgZone,
  ) {
    super();

    this.adStateStore.state$
      .takeUntil(this.destroyed$)
      .subscribe(state => {
        if (!state) {
          return this.router.navigate(['/']);
        }

        this.adState = state;
        this.loadPosts();
      });
  }

  private loadPosts() {
    let feedSearchParams: FeedSearchReq = {
      q: this.vkApiService.createSearchQuery(this.adState),
      extended: 1,
      v: VK_API_VERSION,
      count: 200,
    };

    let wallSearchParams: WallSearchReq = {
      owner_id: GROUP_ID,
      query: this.vkApiService.createSearchQuery(this.adState),
      extended: 1,
      v: VK_API_VERSION,
      count: 100,
    };

    VK.Api.call('wall.search', wallSearchParams, (data: BaseRes<WallSearchRes>) => {
      this.zone.run(() => {
        let {error, response} = data;

        if (error) {
          console.error(error.error_msg);
          // need stop loader and show notification
          return;
        }

        this.mergePosts(response);
      });
    });

    VK.Api.call('newsfeed.search', feedSearchParams, (data: BaseRes<FeedSearchRes>) => {
      this.zone.run(() => {

        let {error, response} = data;

        if (error) {
          console.error(error.error_msg);
          // need stop loader and show notification
          return;
        }

        this.mergePosts(response);
      });
    });
  }

  private mergePosts(data: SearchRes) {
    if (!this.posts) {
      this.posts = data.items.map(x => FeedItem.createFromDto(x, data.groups, data.profiles));
    } else {
      let uniqueItems = data.items.filter(item => {
        return !this.posts.some(post => post.id === item.id && post.ownerId === item.owner_id);
      });

      if (uniqueItems.length) {
        let newPosts = uniqueItems.map(x => FeedItem.createFromDto(x, data.groups, data.profiles));

        this.posts = this.posts.concat(newPosts)
          .sort((a, b) => b.date - a.date);
      }
    }

    this.changeDetectorRef.detectChanges();
  }
}
