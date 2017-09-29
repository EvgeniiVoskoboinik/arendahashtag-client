import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {} from '../shared/interfaces';
import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../shared/base-component';
import  {FeedItem} from '../shared/interfaces/feedItem';
import  {SharedService} from '../shared/shared.service';


@Component({
             selector: 'app-wall-post-result',
             templateUrl: './wall-post-result.template.html',
             styleUrls: ['./wall-post-result.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class WallPostResultComponent extends BaseComponent{
  postId: number;

  get postLink(): string {
    if (!this.sharedService.vkUserData) return null;

    let ownerId = this.sharedService.vkUserData.session.mid;

    if (ownerId == null || this.postId == null) return null;

    return FeedItem.getWallPostLink(ownerId, this.postId);
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private sharedService: SharedService,
  ) {
    super();

    this.route.queryParams
      .takeUntil(this.destroyed$)
      .subscribe(params => {
        this.postId = params.post_id;
      });
  }
}
