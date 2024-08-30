import { Component, OnInit } from '@angular/core';
import { DocTitleService } from '../doc-title/_service/doc-title.service';

@Component({
  selector: 'app-doc-companion',
  templateUrl: './doc-companion.component.html',
  styleUrls: ['./doc-companion.component.scss']
})
export class DocCompanionComponent implements OnInit {
  files: File[] = [];
  constructor(
    private apiservice: DocTitleService
  ) { }

  ngOnInit(): void {
  }
  onFilesSelected(selectedFiles: File[]): void {
    this.files = selectedFiles;
  }
}
