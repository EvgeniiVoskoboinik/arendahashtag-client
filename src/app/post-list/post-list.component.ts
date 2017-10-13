import {Component, ChangeDetectionStrategy, ChangeDetectorRef, NgZone} from '@angular/core';
import {
  BaseRes, FeedSearchReq, SearchRes, WallGetReq, WallSearchReq,
} from '../shared/interfaces/vk.api.interfaces';
import {GROUP_ID, VK_API_VERSION, VkApiService} from '../shared/services/vk.api.service';
import {AdStateStore, AdState} from '../shared/redux';
import {FeedItem} from '../shared/interfaces/feedItem';
import {BaseComponent} from '../shared/base-component';
import {Router} from '@angular/router';
import {GROUPS_MAP} from '../shared/services/groups-map';
import {Observable} from 'rxjs';

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
    Observable.zip(
      Observable.fromPromise(this.getNewsFeeds()),
      Observable.fromPromise(this.getPostsFromGroup()),
      Observable.fromPromise(this.getPostsFromGroups()),
    )
    .subscribe((arr: [SearchRes, SearchRes, SearchRes]) => {
      arr.forEach(x => this.mergePosts(x));
      this.changeDetectorRef.detectChanges();
    }, err => {
      console.error(err);
    });
  }

  private getNewsFeeds(): Promise<SearchRes> {
    let feedSearchParams: FeedSearchReq = {
      q: this.vkApiService.createSearchQuery(this.adState),
      extended: 1,
      v: VK_API_VERSION,
      count: 200,
    };

    return new Promise((resolve, reject) => {
      VK.Api.call('newsfeed.search', feedSearchParams, (data: BaseRes<SearchRes>) => {
        this.zone.run(() => {
          let {error, response} = data;
          if (error) {
            console.error(error.error_msg);
            return resolve();
          }
          resolve(response);
        });
      });
    });
  }
  private getPostsFromGroup(): Promise<SearchRes> {
    let wallSearchParams: WallSearchReq = {
      owner_id: GROUP_ID,
      query: this.vkApiService.createSearchQuery(this.adState),
      extended: 1,
      v: VK_API_VERSION,
      count: 100,
    };

    return new Promise((resolve, reject) => {
      VK.Api.call('wall.search', wallSearchParams, (data: BaseRes<SearchRes>) => {
        this.zone.run(() => {
          let {error, response} = data;
          if (error) {
            console.error(error.error_msg);
            return resolve();
          }
          resolve(response);
        });
      });
    });
  }
  private getPostsFromGroups(): Promise<SearchRes> {
    return new Promise((resolve, reject) => {
      let {propertyType, adType, city} = this.adState;
      if (propertyType || adType || !city) return resolve();

      let groupsMapKey = city.length ? city[0].tag.slice(1).toLowerCase() : null;
      if (!groupsMapKey) return resolve();

      let groupId = GROUPS_MAP[groupsMapKey];
      if (!groupId) return resolve();

      let wallSearchParams: WallGetReq = {
        owner_id: groupId,
        extended: 1,
        v: VK_API_VERSION,
        count: 100,
      };

      VK.Api.call('wall.get', wallSearchParams, (data: BaseRes<SearchRes>) => {
        this.zone.run(() => {
          let {error, response} = data;
          if (error) {
            console.error(error.error_msg);
            return resolve();
          }
          resolve(response);
        });
      });
    });
  }

  private mergePosts(data: SearchRes) {
    if (!data) return;

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
