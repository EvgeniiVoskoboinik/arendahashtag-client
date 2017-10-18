import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';

export interface FileObj {
  file: File;
  data: any;
  width: number;
  height: number;
  loading?: boolean;
  loaded?: boolean;
}

@Component({
             selector: 'app-photo-upload',
             templateUrl: './photo-upload.template.html',
             styleUrls: ['./photo-upload.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PhotoUploadComponent{
  @Input() selectedFiles: FileObj[];
  @Output() fileChange = new EventEmitter<FileObj[]>();

  HEIGHT = 100;

  constructor() {}

  getWidth(file: FileObj): number {
    const MIN_WIDTH = 25;
    let koeff = file.height / this.HEIGHT;

    return Math.max(file.width / koeff, MIN_WIDTH);
  }

  get fileInputTitle(): string {
    if (!this.selectedFiles || !this.selectedFiles.length) {
      return 'Выбрать фотографии';
    }
    if (this.selectedFiles.length === 1) {
      return this.selectedFiles[0].file.name;
    }
    return `Выбрано фотографий: ${this.selectedFiles.length}`;
  }

  onFileChange(event: any) {
    if (!this.selectedFiles) this.selectedFiles = [];

    let files = event.target.files;
    // if user was browsing files and nothing select - do nothing
    if (files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      let self = this;
      let reader = new FileReader();

      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          let fileObj: FileObj = {
            file: file,
            data: image.src,
            width: image.width,
            height: image.height,
          };

          self.selectedFiles.push(fileObj);
          self.fileChange.emit(self.selectedFiles);
        };
      };

      reader.readAsDataURL(file);
    });
  }

  deleteFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.fileChange.emit(this.selectedFiles);
  }
}
