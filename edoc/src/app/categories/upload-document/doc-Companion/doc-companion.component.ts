import { Component, OnInit, ViewChild } from '@angular/core';
import { DocTitleService } from '../doc-title/_service/doc-title.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { Ver3DataTableComponent } from 'src/app/shared/ver3-data-table/ver3-data-table/ver3-data-table/ver3-data-table.component';

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
  constructor(
    private sb: SnackbarService,
    private apiservice: DocTitleService
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }


  loadTable() {
    this.apiservice.getAll().subscribe(data => {
      this.dtOptions = {
        data: data.response.rows,
        columns: [
          {
            display: 'files-1', data: 'innerHtml_4', func: this.setBgBorder(), classes: 'trimText', headerStyles: { 'justify-content': 'center' }, headingStyles: { 'width': '70px' }, tSpanDataStyles: { 'justify-content': 'center' }
          },
          { display: 'Name ', data: 'Name', applyFilter: true, classes: 'trimText', },
          { display: 'Rev no', data: 'revno', classes: 'trimText', applyFilter: true, },
          { display: 'Updated By', data: 'updatedBy', classes: 'trimText', applyFilter: true, },
          { display: 'Activites', data: 'parentpath', classes: 'trimText', applyFilter: true, },
        ],
        length: data.response.count,
        hideSrNo: true,
        hideSearch: true,
        tableSpacer: false,
        checkbox: false,
        enableMasterToggle: true,
        tableStyle: { 'max-height': 'calc(100vh - 370px)' },
        component: this
      };
    });
  }

  setBgBorder() {
    return item => {
      let iconFile;
      if (item.fileType === 'folder') {
        iconFile = 'main-folder';
      } else if (item.fileType === 'file') {
        iconFile = 'excel-file';
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
      }
      // this.cm.notifyParentComponent();
    })
  }
}
