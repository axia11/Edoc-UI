import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../ver1-data-table/confirm-delete.component';

@Component({
  selector: 'edoc-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.scss']
})
export class MultipleFileUploadComponent {
  @Input() multiple: boolean = true;
  @Input() accept: string = '.pdf,.doc,.xlsx,.xls,.csv,.jpg,.jpeg';
  @Output() filesSelected: EventEmitter<File[]> = new EventEmitter<File[]>();

  selectedFiles: File[] = [];

  constructor(private dialog: MatDialog) { }

  onFileChange(event: any) {
    const files: File[] = Array.from(event.target.files);
    this.selectedFiles.push(...files);
    this.filesSelected.emit(Array.from(files));
  }

  removeFile(index: number) {
    const fileToRemove = this.selectedFiles[index];
    this.openDelDialog(fileToRemove, index);
  }

  openDelDialog(file: File, index: number): void {
    const message = `Are you sure you want to delete ?`;
    const dialogData = {
      title: 'Delete ?',
      message: message,
      fileName: file.name,
      fn: () => this.deleteFile(index)
    };
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '480px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteFile(index);
      }
    });
  }

  deleteFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.filesSelected.emit(this.selectedFiles);
  }

  getFileTypes(fileName: string): string {
    if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) {
      return 'jpg-file';
    } else if (fileName.endsWith('.png')) {
      return 'png-file';
    } else if (fileName.endsWith('.svg')) {
      return 'svg-file';
    } else if (fileName.endsWith('.pdf')) {
      return 'pdf-file';
    } else if (fileName.endsWith('.mp4')) {
      return 'video-file';
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      return 'excel-file';
    } else if (fileName === '') {
      return 'main-file';
    } else {
      return 'unknown-file'; // Default case for unknown file types
    }
  }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.classList.add('drag-over');
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const target = event.currentTarget as HTMLElement;
    target.classList.remove('drag-over');

    if (event.dataTransfer && event.dataTransfer.files) {
      console.log(event.dataTransfer.files);
      this.handleFiles(event.dataTransfer.files);
    }
  }

  private handleFiles(files: FileList): void {
    console.log(files);
  }
}
