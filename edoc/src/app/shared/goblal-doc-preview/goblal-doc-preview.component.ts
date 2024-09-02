import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoblalDocPreviewService } from './_service/goblal-doc-preview.service';

@Component({
  selector: 'app-goblal-doc-preview',
  templateUrl: './goblal-doc-preview.component.html',
  styleUrls: ['./goblal-doc-preview.component.scss']
})
export class GoblalDocPreviewComponent implements OnInit {
  public pdfURL: any;
  DocName: any;
  UploadBy: any;
  UploadDate: any;
  prefix: any;
  URL: any;
  Docname: any;
  copySuccess = false;
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  constructor(
    public dialogRef: MatDialogRef<GoblalDocPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dsr: DomSanitizer,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private apiService: GoblalDocPreviewService
  ) { }
  headerForm = this.fb.group({
    ShareId: [null] // Set initial value
  })
  ngOnInit(): void {
    this.pdfURL = this.dsr.bypassSecurityTrustResourceUrl(this.data.pdfURL);
    // console.log(this.data, 'dialog data');
    this.DocName = this.data.realName
    this.Docname = this.data.fileName
    this.UploadBy = this.data.UploadBy
    this.UploadDate = this.data.UploadDate
    this.prefix = this.data.realName.split('.').pop();
    this.URL = this.data.pdfURL.split(".com/").pop();
    this.apiService.preViewDoc(this.Docname).subscribe(data => {
      this.headerForm.get('ShareId').patchValue(data.response)

    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  shareurl() {
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe(result => {
      // this.headerForm1.reset();
    });
  }
  copyText() {
    const ShareId = this.headerForm.get('ShareId')?.value;
    if (ShareId) {
      navigator.clipboard.writeText(ShareId)
      this.copySuccess = true;
      setTimeout(() => {
        this.copySuccess = false;
      }, 3000);
    }
  }

  download() {
    this.apiService.downloadAttachment(this.data.fileName).subscribe(data => {
      if (data) {
        window.open(data.response, '_self');
      }
    });
  }

}
