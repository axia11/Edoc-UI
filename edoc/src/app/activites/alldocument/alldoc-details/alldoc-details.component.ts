import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AlldocumentService } from '../_service/alldocument.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDeleteComponent } from 'src/app/shared/ver1-data-table/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { CreateFoldersComponent } from 'src/app/menu/create-folder/create-folders.component';
import { FormBuilder } from '@angular/forms';
import { UploadDocumentService } from 'src/app/categories/upload-document/_service/upload-document.service';
import { GoblalDocPreviewComponent } from 'src/app/shared/goblal-doc-preview/goblal-doc-preview.component';
import { TitleBarService } from 'src/app/title-bar/_service/title-bar.service';
import { GoblalDocPreviewService } from 'src/app/shared/goblal-doc-preview/_service/goblal-doc-preview.service';
import { RevisionHistoryService } from 'src/app/categories/upload-document/revision-history/_service/revision-history.service';
@Component({
  selector: 'app-alldoc-details',
  templateUrl: './alldoc-details.component.html',
  styleUrls: ['./alldoc-details.component.scss']
})
export class AlldocDetailsComponent implements OnInit {
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
  emptyfiles: boolean = false;
  copySuccess = false;
  tableData: any[] = [];
  currentData: any[] = [];
  // filteredItems: string[] = [...this.currentData];
  breadcrumb: any[] = [];
  currentPath: string[] = [];
  breadcrumbPaths: string[] = [];
  private subscription: Subscription;
  openDropdownIndex: number | null = null;
  options = [
    { label: 'View details', imgSrc: '../../assets/menu-icons/view-details.svg' },
    { label: 'Share', imgSrc: '../../assets/menu-icons/share.svg' },
    { label: 'Rename', imgSrc: '../../assets/menu-icons/rename.svg' },
    { label: 'Move', imgSrc: '../../assets/menu-icons/move.svg' },
    { label: 'Delete', imgSrc: '../../assets/menu-icons/delete.svg' },
    { label: 'Open version history', imgSrc: '../../assets/menu-icons/versionhistory.svg' },
  ];
  URL: any;
  pdfURL: any;

  toggleDropdown(index: number) {
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  getFilteredOptions(isDoc: boolean) {
    if (isDoc) {
      return this.options.filter(option =>
        option.label === 'View details' ||
        option.label === 'Share' ||
        option.label === 'Move' ||
        option.label === 'Delete' ||
        option.label === 'Open version history'
      );
    } else {
      return this.options.filter(option =>
        option.label === 'Share' ||
        option.label === 'Move' ||
        option.label === 'Rename' ||
        option.label === 'Delete'
      );
    }
  }


  selectOption(option: { label: string; imgSrc: string }, row: any) {
    this.openDropdownIndex = null;
    if (option.label === 'Delete') {
      this.openDeleteDialog(row);
    } else if (option.label === 'View details') {
      this.viewdetails(row)
    } else if (option.label === 'Open version history') {
      this.viewrevhistory(row)
    } else if (option.label === 'Share') {
      this.shareurl(row)
    } else if (option.label === 'Rename') {
      this.rename(row)
    } else if (option.label === 'Move') {
    }
  }


  headerForm = this.fb.group({
    ShareId: [null]
  })


  constructor(
    private apiservice: AlldocumentService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sb: SnackbarService,
    public uploadservice: UploadDocumentService,
    public revhistoryservice: RevisionHistoryService,
    private fb: FormBuilder,
    private previewservice: GoblalDocPreviewService

  ) { }

  ngOnInit(): void {
    this.loaddetails();
    this.subscription = this.apiservice.notifyOtherComponent$.subscribe(() => {
      this.loaddetails();
    });
    // this.setupSearch();

  }

  loaddetails() {
    this.route.params.subscribe(params => {
      this.apiservice.EDGId = +params['id'];
      this.apiservice.getAll1().subscribe((data: any) => {
        this.tableData = data.response.rows;
        this.currentData = this.tableData;
        // this.updateBreadcrumbPaths();
        this.emptyfiles = this.currentData.length === 0;
        this.currentData.forEach(item => {
          this.processItem(item);
        });
        // this.filteredItems = [...this.currentData];
      });
    });
  }
  // setupSearch(): void {
  //   this.titlebarService.search$.subscribe(term => {
  //     this.filteredItems = this.currentData.filter(item =>
  //       item.toLowerCase().includes(term.toLowerCase())
  //     );
  //   });
  // }

  processItem(item: any) {
    item.iconFile = this.getIconFile(item.IsDoc, item.extension);
  }

  getIconFile(isDoc: boolean, extension?: string): string {
    if (!isDoc) {
      return 'main-folder';
    } else {
      switch (extension) {
        case 'pdf':
          return 'pdf-file';
        case 'jpg':
          return 'jpg-file';
        case 'xlsx':
          return 'excel-file';
        case 'svg':
          return 'svg-file';
        default:
          return 'doc-file';
      }
    }
  }


  openFolder(index: number): void {
    const folder = this.currentData[index];
    if (folder.IsDoc) {
      const url = folder.fileurl;
      if (url) {
        const fileName = url.split('.com/').pop();
        this.previewservice.preViewDoc(fileName).subscribe(data => {
          this.pdfURL = data.response || '';
          const dialogRef = this.dialog.open(GoblalDocPreviewComponent, {
            data: {
              pdfURL: data.response,
              fileName: fileName,
              realName: data.name,
              UploadBy: data.UploadBy,
              UploadDate: data.UploadDate
            },
            // width: '1480px',
            disableClose: true
          });
          dialogRef.afterClosed().subscribe(result => {
          });
        });
      }
    } else if (!folder.IsDoc) {
      this.apiservice.EDHId = folder.EDHId;
      this.apiservice.getChildData().subscribe((data: any) => {
        const childData = data.response.rows;
        this.currentData = childData;
        this.emptyfiles = this.currentData.length === 0;
        this.currentData.forEach(item => {
          this.processItem(item);
        });
      }
      )
    }
  }


  onDelete(data: any) {
    this.apiservice.EDHId = data.EDHId;
    const requestData = {
      updatedBy: 1,
    };
    this.apiservice.delete1(requestData).subscribe((response) => {
      this.sb.open('Deleted Successfully', 'bg-green');
      this.loaddetails();
    });
  }

  openDeleteDialog(row: any): void {
    const message = `Are you sure you want to move this folder to recycle bin ?`;
    const dialogData = {
      title: 'Delete ?',
      message: message,
      fn: this.onDelete.bind(this, row)
    };
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '360px',
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(result => {
      // if (result === 'confirmed') {
      // }
    });
  }

  rename(row: any) {
    let dialogRef = this.dialog.open(CreateFoldersComponent, {
      data: {
        rowData: row,
        // EDGId:row.EDGId,
        // PLId:row.PLId,
        // category:row.category,
        // createdBy:row.createdBy
      },
      width: '440px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  viewdetails(row: any) {
    const data = { rowData: row, };
    this.uploadservice.open(data);
  }

  viewrevhistory(row: any) {
    const data = { rowData: row, };
    this.revhistoryservice.open(data);
  }

  shareurl(row: any): void {
    this.previewservice.preViewDoc(row.filename).subscribe(data => {
      this.headerForm.get('ShareId').setValue(data.response)
    })
    const dialogRef = this.dialog.open(this.callAPIDialog, {
      data: {
        rowData: row,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
