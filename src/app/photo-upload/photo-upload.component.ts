import {Component, ChangeDetectionStrategy, Output, EventEmitter, Input} from '@angular/core';

@Component({
             selector: 'app-photo-upload',
             templateUrl: './photo-upload.template.html',
             styleUrls: ['./photo-upload.style.scss'],
             changeDetection: ChangeDetectionStrategy.OnPush,
           })
export class PhotoUploadComponent{
  @Input() selectedFiles: FileList;
  @Output() fileChange = new EventEmitter<FileList>();

  constructor() {}

  get inputErr(): boolean {
    return this.selectedFiles && this.selectedFiles.length > 5;
  }

  get fileInputTitle(): string {
    if (!this.selectedFiles || !this.selectedFiles.length) {
      return 'Выбрать фотографии (не более 5)';
    }
    if (this.selectedFiles.length === 1) {
      return this.selectedFiles[0].name;
    }
    if (this.inputErr) {
      return 'Слишком много фотографий (не более 5)';
    }
    return `Выбрано фотографий: ${this.selectedFiles.length}`;
  }

  onFileChange(event: any) {
    let files = event.target.files;
    // if user was browsing files and nothing select - do nothing
    if (files.length === 0) return;

    this.selectedFiles = files;
    this.fileChange.emit(files);
  }

  clearFiles() {
    this.selectedFiles = null;
    this.fileChange.emit(this.selectedFiles);
  }
}
