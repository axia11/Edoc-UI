import { Component, Input, Output, EventEmitter, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { FileUploadControl } from './../helpers/control.class';
import { FileUploadService } from './../services/file-upload.service';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmDeleteComponent } from '../../ver1-data-table/confirm-delete.component';
import { SnackbarService } from '../../_services/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
// <input matInput required placeholder="Doc No." #docNoRef="ngModel" type="text" (blur)="updateDocNo(docNoRef.value)" [(ngModel)]="docNo">

@Component({
  selector: `file-upload-list-item`,
  templateUrl: './file-upload-list-item.component.html',
  styleUrls: [`./file-upload-list-item.component.scss`]
})
export class FileUploadListItemComponent implements OnInit {

  docNo: string | null;
  showUpload = false;
  showDocNoErr = false;
  docNoCtrl = new FormControl(null, Validators.required);

  @Input() apiService;
  @Input() public index: number;
  @Input() public file;
  @Input() isEdit1: boolean;


  @Input() isView: boolean;
  @Input() public control: FileUploadControl;

  @Output() delFile: EventEmitter<any> = new EventEmitter();
  @Output() upFile: EventEmitter<any> = new EventEmitter();
  @Output() dlFile: EventEmitter<any> = new EventEmitter();
  @Output() updtFile: EventEmitter<any> = new EventEmitter();

  @ViewChild('docNoRef') docNoRef: ElementRef;

  constructor(
    private fileUploadService: FileUploadService,
    private dialog: MatDialog,
    private sb: SnackbarService
  ) { }

  ngOnInit() {
    if (this.isView) {
      this.docNoCtrl.disable();
    }
    this.docNoCtrl.setValue(this.file.item ? (this.file.item.DocumentNo || null) : null);
    this.showUpload = !this.file.item.AttId;
  }

  updateDocNo(val) {
    this.file.item.DocumentNo = this.docNoCtrl.value;
  }

  public removeFile(file: File): void {
    this.openDelDialog(file);
  }

  openDelDialog(file): void {    
    this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
      data: {
        fn: this.deleteFile.bind(this, file)
      }
    });
  }

  deleteFile(file) {
    if (file.item.serverFile) {
      this.apiService.delAttachment(file).subscribe(
        _ => this.afterDeleted(file)
      );
    } else {
      this.afterDeleted(file);
    }
  }

  afterDeleted(file) {
    this.control.removeFile(file);
    this.sb.open('Deleted Successfully', 'bg-red');
  }


  uploadFile(file): void {
    // if (!this.docNoCtrl.valid) {
    //   this.docNoCtrl.markAsDirty();
    //   this.updtDocInp();
    //   return;
    // }
    this.apiService.uploadAttachment(file).subscribe(data => {
      // this.afterUploaded(data.recordset);
      this.afterUploaded(data);

    });
    // this.upFile.emit({file: file, fn: this.afterUploaded.bind(this)});
    this.upFile.emit([file, this.afterUploaded.bind(this)]);
  }

  afterUploaded(data) {
    // this.file.item.AttId = data.AttId;
    this.file.item.VBDAttId = data.VBDAttId;
    this.file.item.serverFile = true;
    this.showUpload = false;
    // this.updtDocInp();
    this.sb.open('File Uploaded Successfully', 'bg-green');
  }

  updateFile(file): void {
    if (!this.docNoCtrl.valid) {
      this.docNoCtrl.markAsDirty();
      this.updtDocInp();
      return;
    }
    this.apiService.updateAttachment(file).subscribe(data => {
      this.afterUpdated();
      this.docNoCtrl.markAsPristine();
    });
    this.updtFile.emit([file, this.afterUpdated.bind(this)]);
  }

  afterUpdated() {
    this.updtDocInp();
    this.sb.open('Document No. updated Successfully', 'bg-green');
  }

  downloadFile(file): void {
    this.apiService.downloadAttachment(file.item.AttId);
    this.dlFile.emit(file);
  }

  updtDocInp() {
    this.docNoRef.nativeElement.focus();
    this.docNoRef.nativeElement.blur();
  }

  public calculateSize(size: number): string {
    return this.fileUploadService.calculateSize(size);
  }
}
