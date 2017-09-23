import {Component, ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {FeedItem, FeedSearchReq} from '../shared/interfaces/vk.api.interfaces';
import {VkApiService} from '../shared/services/vk.api.service';
import {Subject} from 'rxjs';
import {AdStateStore, AdState} from '../shared/redux';


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
    };

    VK.Api.call('newsfeed.search', params, data => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
