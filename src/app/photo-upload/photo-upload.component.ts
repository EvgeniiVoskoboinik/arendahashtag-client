import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input, ChangeDetectorRef} from '@angular/core';

export interface FileObj {
  file: File;
  data?: any;
  width?: number;
  height?: number;
  loading?: boolean;
  attachment?: string;
}

@Component({
             selector: 'app-photo-upload',
             templateUrl: './photo-upload.template.html',
             styleUrls: ['./photo-upload.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PhotoUploadComponent{
  @Input() selectedFiles: FileObj[];

  @Output() selectedFilesChange = new EventEmitter<FileObj[]>();

  HEIGHT = 100;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  getWidth(file: FileObj): number {
    const MIN_WIDTH = 25;
    let koeff = file.height / this.HEIGHT;

    return Math.max(file.width / koeff, MIN_WIDTH);
  }

  get fileInputTitle(): string {
    if (!this.selectedFiles || !this.selectedFiles.length) {
      return 'Выбрать фотографии (максимум 10)';
    }
    if (this.selectedFiles.length === 1) {
      return this.selectedFiles[0].file.name;
    }
    return `Выбрано фотографий: ${this.selectedFiles.length}`;
  }

  onFilesChange(event: any) {
    if (!this.selectedFiles) this.selectedFiles = [];

    let files = event.target.files;
    // if user was browsing files and nothing select - do nothing
    if (files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      let reader = new FileReader();
      let fileObj: FileObj = {
        file: file,
      };
      this.selectedFiles.push(fileObj);

      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = () => {
          fileObj.data = image.src;
          fileObj.width = image.width;
          fileObj.height = image.height;

          this.changeDetectorRef.detectChanges();
        };
      };

      reader.readAsDataURL(file);
    });
    this.selectedFilesChange.emit(this.selectedFiles);
  }

  deleteFile(index: number) {
    this.selectedFiles.splice(index, 1);
    this.selectedFilesChange.emit(this.selectedFiles);
  }
}
