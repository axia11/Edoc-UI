import { Component, OnInit, ViewChild } from '@angular/core';
import { Ver3DataTableComponent } from 'src/app/shared/ver3-data-table/ver3-data-table/ver3-data-table/ver3-data-table.component';
import { RecycleBinService } from './_service/recycle-bin.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { MenuBarService } from 'src/app/menu/_service/menu-bar.service';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/shared/ver1-data-table/confirm-delete.component';

@Component({
  selector: 'app-recycle-bin',
  templateUrl: './recycle-bin.component.html',
  styleUrls: ['./recycle-bin.component.scss']
})
export class RecycleBinComponent implements OnInit {
  dtOptions;
  @ViewChild(Ver3DataTableComponent) table: Ver3DataTableComponent;
  emptyfiles: boolean = false;
  id1: string;
  constructor(
    private apiService: RecycleBinService,
    public apiService1: MenuBarService,
    private sb: SnackbarService,
    private datePipe: DatePipe,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.LoadTable();
  }

  LoadTable() {
    this.apiService.getAll().subscribe((data: any) => {
      this.emptyfiles = data.response.count === 0;
      const formattedRows = data.response.rows.map(row => ({
        ...row,
        updatedAt: this.datePipe.transform(row.updatedAt, 'dd-MMM-yy hh:mm:ss a')
      }));
      this.dtOptions = {
        data: formattedRows,
        columns: [
          {
            display: 'files-1', data: 'innerHtml_4', func: this.setBgBorder(), classes: 'trimText', headerStyles: { 'justify-content': 'center' }, headingStyles: { 'width': '70px' }, tSpanDataStyles: { 'justify-content': 'center' }
          },
          { display: 'Name ', data: 'Name', applyFilter: true, classes: 'trimText', },
          { display: 'Date deleted ', data: 'updatedAt', classes: 'trimText', applyFilter: true, },
          { display: 'Created By', data: 'createdBy', classes: 'trimText', applyFilter: true, },
          { display: 'Updated By', data: 'updatedBy', classes: 'trimText', applyFilter: true, },
          { display: 'Location', data: 'parentpath', classes: 'trimText', applyFilter: true, },
        ],

        // length: data.response.count,
        hideSrNo: true,
        hideSearch: true,
        tableSpacer: false,
        checkbox: true,
        enableMasterToggle: true,
        // tableStyle: { "max-height": "calc(100vh - 395px )" },
        component: this
      };
      // this.Emit()
      this.table.updateTable(data, this.dtOptions.columns);
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

  restoreFile(): void {
    this.table.selection.selected
    if (this.table.selection.selected.length > 0) {
      for (var i = 0; i < this.table.selection.selected.length; i++) {
        this.table.selection.selected[i].EDHId != undefined ? this.apiService.EDHId.push(this.table.selection.selected[i].EDHId) : this.apiService.EDHId.push(0)
        this.table.selection.selected[i].EDGId != undefined ? this.apiService.EDGId.push(this.table.selection.selected[i].EDGId) : this.apiService.EDGId.push(0)
      }
    }
    // this.apiService.EDHId = this.table.selection.selected[0].EDHId != undefined ? this.table.selection.selected[0].EDHId : 0;
    // this.apiService.EDGId = this.table.selection.selected[0].EDGId != undefined ? this.table.selection.selected[0].EDGId : 0;
    const requestData = {
      updatedBy: 1,
    };
    this.apiService.restore(requestData).subscribe(data => {
      this.sb.open('Restored Successfully', 'bg-green');
      this.LoadTable();
      this.apiService1.notifyParentComponent();
    })
  }

    deleteparFile(): void {
    this.table.selection.selected
    if (this.table.selection.selected.length > 0) {
      this.apiService.EDHId.splice(0, this.apiService.EDHId.length);
      this.apiService.EDGId.splice(0, this.apiService.EDGId.length);
      for (var i = 0; i < this.table.selection.selected.length; i++) {
        this.table.selection.selected[i].EDHId != undefined ? this.apiService.EDHId.push(this.table.selection.selected[i].EDHId) : this.apiService.EDHId.push(0)
        this.table.selection.selected[i].EDGId != undefined ? this.apiService.EDGId.push(this.table.selection.selected[i].EDGId) : this.apiService.EDGId.push(0)
      }
    }
    const requestData = {
      updatedBy: 1,
    };
    this.apiService.permenatlydelete(requestData).subscribe(data => {
      this.sb.open('Deleted Permenatly Successfully', 'bg-green');
      this.LoadTable();
      this.apiService1.notifyParentComponent();
    })
  }


  openDeleteDialog(): void {
    const mess = this.table.selection.selected[0].Name;
    const message = `Are you sure you want to delete these items from the Recycle Bin? ${mess}`;
    const dialogData = {
      title: 'Delete ?',
      message: message,
      fn: this.deleteparFile.bind(this) // Bind the current context
    };
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '360px',
      data: dialogData
    });
  }

}
