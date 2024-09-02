import { Component, OnInit, ViewChild } from '@angular/core';
import { RevisionHistoryService } from './_service/revision-history.service';
import { Ver3DataTableComponent } from 'src/app/shared/ver3-data-table/ver3-data-table/ver3-data-table/ver3-data-table.component';

@Component({
  selector: 'app-revision-history',
  templateUrl: './revision-history.component.html',
  styleUrls: ['./revision-history.component.scss']
})
export class RevisionHistoryComponent implements OnInit {
  dtOptions;
  @ViewChild(Ver3DataTableComponent) table: Ver3DataTableComponent;
  constructor(
    private apiservice: RevisionHistoryService,
  ) { }

  ngOnInit(): void {
    this.loadTable();
  }


  loadTable() {
    this.apiservice.getallrevhistory().subscribe(data => {
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

  closeOverlay() {
    this.apiservice.close();
  }
}
