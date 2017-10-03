import {Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import {SharedService} from '../shared/shared.service';
import {FeedItem} from '../shared/interfaces/feedItem';
import {NgxGalleryImage, NgxGalleryOptions} from '../shared/gallery';

@Component({
             selector: 'app-post',
             templateUrl: './post.template.html',
             styleUrls: ['./post.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PostComponent implements OnInit, OnChanges{
  @Input() post: FeedItem;

  galleryOptions: NgxGalleryOptions[] = [
    { 'image': false, 'height': '100px' },
    { 'breakpoint': 500, 'width': '100%' },
  ];
  galleryImages: NgxGalleryImage[];

  constructor(
    private sharedService: SharedService,
  ) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    let {post} = changes;

    if (post && post.currentValue) {
      let attachments = this.post.attachments;

      if (attachments && attachments.length) {
        this.galleryImages = attachments
          .filter(attachment => attachment.photo)
          .map(attachment => {
            let photo = attachment.photo;

            let photoSizes = Object.keys(photo)
              .filter(key => key.includes('photo'))
              .map(key => key.split('_').pop())
              .sort();

            return {
              small: photo[`photo_${photoSizes[0]}`],
              big: photo[`photo_${photoSizes[photoSizes.length - 1]}`],
              description: photo.text,
            };
          });
      }
    }
  }
}
