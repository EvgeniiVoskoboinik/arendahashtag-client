import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {FeedItem} from '../shared/interfaces/vk.api.interfaces';


@Component({
             selector: 'app-post',
             templateUrl: './post.template.html',
             styleUrls: ['./post.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PostComponent implements OnInit{
  @Input() post: FeedItem;

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit() {

  }
}
