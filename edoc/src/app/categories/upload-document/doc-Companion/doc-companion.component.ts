import { Component, OnInit, ViewChild } from '@angular/core';
import { DocTitleService } from '../doc-title/_service/doc-title.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { Ver3DataTableComponent } from 'src/app/shared/ver3-data-table/ver3-data-table/ver3-data-table/ver3-data-table.component';
import { GoblalDocPreviewComponent } from 'src/app/shared/goblal-doc-preview/goblal-doc-preview.component';
import { GoblalDocPreviewService } from 'src/app/shared/goblal-doc-preview/_service/goblal-doc-preview.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doc-companion',
  templateUrl: './doc-companion.component.html',
  styleUrls: ['./doc-companion.component.scss']
})
export class DocCompanionComponent implements OnInit {
  dtOptions;
  @ViewChild(Ver3DataTableComponent) table: Ver3DataTableComponent;
  emptyfiles: boolean = false;

  files: File[] = [];
  URL: any;
  constructor(
    private sb: SnackbarService,
    private apiservice: DocTitleService,
    private previewservice: GoblalDocPreviewService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }


  loadTable() {
    this.apiservice.getAll().subscribe(data => {
      this.dtOptions = {
        data: data.response,
        columns: [
          {
            display: 'files-1', data: 'innerHtml_4', func: this.setBgBorder(), classes: 'trimText', headerStyles: { 'justify-content': 'center' }, headingStyles: { 'width': '70px' }, tSpanDataStyles: { 'justify-content': 'center' }
          },
          { display: 'Name ', data: 'filename', applyFilter: true, classes: 'link', },
          { display: 'Rev no', data: 'RevNo', classes: 'trimText', applyFilter: true, },
          { display: 'Updated By', data: 'createdBy', classes: 'trimText', applyFilter: true, },
          // { display: 'Activites', data: 'parentpath', classes: 'trimText', applyFilter: true, },
        ],
        length: data.response.count,
        hideSrNo: true,
        hideSearch: true,
        tableSpacer: false,
        checkbox: false,
        enableMasterToggle: true,
        tableStyle: { 'max-height': 'calc(100vh - 245px)' },
        component: this
      };
      this.table.updateTable(data, this.dtOptions.columns);
    });
  }

  cellClicked(event) {
    if(event.column == 'filename'){
      this.URL=event.data.filename.split(".com/").pop();
      this.previewservice.preViewDoc(this.URL).subscribe(data => {
        const dialogRef = this.dialog.open(GoblalDocPreviewComponent, {
          data: {
            pdfURL: data.response,
              fileName: this.URL,
              realName: data.name,
              UploadBy: data.UploadBy,
              UploadDate: data.UploadDate
          }
        });
        dialogRef.afterClosed().subscribe(result => {
          // console.log(`Dialog result: ${result}`);
        });
      })
    }
  }

  setBgBorder() {
    return item => {
      let iconFile;
      if (item.extension === 'folder') {
        iconFile = 'main-folder';
      } else if (item.extension === 'pdf') {
        iconFile = 'pdf-file';
      }else if (item.extension === 'jpg') {
        iconFile = 'jpg-file';
      }else if (item.extension === 'xlsx') {
        iconFile = 'excel-file';
      }else if (item.extension === 'svg') {
        iconFile = 'svg-file';
      }else if (item.extension === 'txt') {
        iconFile = 'txt-file';
      } else {
        iconFile = '';
      }
      return `        
        <div>
          <span> 
            <img class="menu-img" src="../../../assets/svg/${iconFile}.svg" alt="no image" width="30" height="30" />
          </span>
        </div>
      `;
    };
  }

  onFilesSelected(selectedFiles: File[]): void {
    this.files = selectedFiles;
  }

  additionaldocs() {
    if (this.files.length == 0) {
      this.sb.open('please upload a file', 'bg-red');
      return;
    }
    const DocData = {
      EDDId: this.apiservice.EDDId,
      file: this.files
    };
    this.apiservice.companiondoc(DocData).subscribe(res => {
      if (res.Success == true) {
        this.sb.open('File Uploaded Successfully', 'bg-green');
      // this.table.reloadTable(null);
      this.dtOptions =null;
      this.loadTable();
      }
    })
  }

  close(){
    // this.mainservice.close()
  }
}
