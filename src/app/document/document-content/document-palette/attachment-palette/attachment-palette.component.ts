import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractPaletteComponent } from '../abstract-palette.component';
import { oc } from 'src/app/shared/app-utils';
import { DomSanitizer } from '@angular/platform-browser';
import { AttachmentSizeType, sizeValues, ATTACHMENT_SIZE_CHOICES } from 'src/app/document/shared/attachmet-size-type';
import { UploadService } from 'src/app/shared/service/upload.service';
import { AppStoreService } from 'src/app/shared/service/app.store.service';

@Component({
  selector: 'app-attachment-palette',
  templateUrl: './attachment-palette.component.html',
  styleUrls: ['./attachment-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => AttachmentPaletteComponent),
                 multi: true
               }
         ]
})
export class AttachmentPaletteComponent extends AbstractPaletteComponent {
  selectedFile = null;
  width = 20;
  AttachmentSizeType = AttachmentSizeType;
  attachmentSizeType = null;
  ATTACHMENT_SIZE_CHOICES = ATTACHMENT_SIZE_CHOICES;

  constructor(private sanitizer: DomSanitizer,
              private uploadService: UploadService,
              private appStoreService: AppStoreService){
    super();
  }

  selectAttachmentSizeType(){
    const imageSize = sizeValues(this.attachmentSizeType);
    this.element.attachment.width = imageSize.width;
    this.element.attachment.height = imageSize.height;
    this.onChange(this.element);
  }

  get selectedFileUrl() {
    return this.selectedFile && this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile)) || '';
  }

  onFileChange($event){
    const files = $event.srcElement.files;
    if (oc(files).length) {
      const file = files[0];
      this.selectedFile = file;
    }
  }

  onWidthChange(width){
    this.element.attachment.width = width;
    this.onChange(this.element);
  }

  onHeightChange(height){
    this.element.attachment.height = height;
    this.onChange(this.element);
  }

  uploadImage(){
    this.appStoreService.startLoading();
    this.uploadService.uploadFile(this.selectedFile, this.element.attachment.width, this.element.attachment.height)
    .subscribe(savedAttachment => {
      this.element.attachment = savedAttachment;
      this.onChange(this.element);
    }, error =>{},
    () => {
      this.appStoreService.stopLoading();
    });
  }

  removeImage(){
    // TODO: remove image from db
    this.selectedFile = null;
  }
}
