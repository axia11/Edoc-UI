import { Component, Input, OnInit } from '@angular/core';
import { UploadDocumentService } from './_service/upload-document.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {
  tabs: any[] = [];
  SelectedTab = 0;

  @Input() data: any;
  constructor(
    private apiservice: UploadDocumentService
  ) { }

  ngOnInit(): void {
  }

  closeOverlay() {
    this.apiservice.close();
  }

  selectTab(index: number) {
    this.SelectedTab = index;
  }
}
