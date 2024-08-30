import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  constructor(
    public dialogRef: MatDialogRef<GoblalDocPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dsr: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.pdfURL = this.dsr.bypassSecurityTrustResourceUrl(this.data.pdfURL);
    // console.log(this.data, 'dialog data');
    this.DocName = this.data.realName
    this.Docname = this.data.fileName
    this.UploadBy = this.data.UploadBy
    this.UploadDate = this.data.UploadDate
    this.prefix = this.data.realName.split('.').pop();
    this.URL = this.data.pdfURL.split(".com/").pop();
  }
  
  closeDialog(): void {
    this.dialogRef.close();
  }

}
