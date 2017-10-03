import {Component, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';

@Component({
             selector: 'app-photo-upload',
             templateUrl: './photo-upload.template.html',
             styleUrls: ['./photo-upload.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PhotoUploadComponent{
  @Output() fileChange = new EventEmitter<FileList>();

  constructor() {}

  onFileChange(event: any) {
    this.fileChange.emit(event.target.files);
  }
}
