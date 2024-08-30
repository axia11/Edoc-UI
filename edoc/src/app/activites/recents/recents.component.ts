import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { GoblalDocPreviewComponent } from 'src/app/shared/goblal-doc-preview/goblal-doc-preview.component';
import { RecentsService } from './_service/recents.service';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.scss']
})
export class RecentsComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  testid: any;

  constructor(
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private apiService: RecentsService
  ) { }

  ngOnInit(): void {
  
    this.apiService.get().subscribe(data =>{
      this.testid = data.response[0].USERId
    })
  }


  files: File[] = [];

  onDragOverTable(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  onDragLeaveTable(event: DragEvent) {
    event.preventDefault();
  }

  onDropTable(event: DragEvent) {
    event.preventDefault();
    const files = event.dataTransfer.files;

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.files.push(file);
      }
    }
  }

  getFileType(fileName: string): string {
    return fileName.split('/').pop().toUpperCase();
  }

  formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
  openFilePreview(file: File) {
    const blobUrl = URL.createObjectURL(file);
    const safeUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
    const dialogRef = this.dialog.open(GoblalDocPreviewComponent, {
      width: '1480px',
      data: {
        file: file,
        fileURL: safeUrl
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      URL.revokeObjectURL(blobUrl);
    });
  }

  getFileTypes(fileName: string): string {
    if (fileName.endsWith('.jpg')) {
      return 'jpg-file';
    } else if (fileName.endsWith('.png')) {
      return 'png-file';
    } else if (fileName.endsWith('.svg')) {
      return 'svg-file';
    } else if (fileName.endsWith('.pdf')) {
      return 'pdf-file';
    } else if (fileName.endsWith('.mp4')) {
      return 'video-file';
    } else if (fileName.endsWith('.xlsx')) {
      return 'excel-file';
    } else if (fileName === '') {
      return 'main-file';
    } else {
      return null;
    }
  }


}
