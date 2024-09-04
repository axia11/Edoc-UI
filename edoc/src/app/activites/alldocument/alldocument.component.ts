import { Component, OnInit } from '@angular/core';
import { AlldocumentService } from './_service/alldocument.service';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from 'src/app/shared/ver1-data-table/confirm-delete.component';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { MenuBarService } from 'src/app/menu/_service/menu-bar.service';
import { CreateCategoriesComponent } from 'src/app/menu/create-categories/create-categories.component';


@Component({
  selector: 'app-alldocument',
  templateUrl: './alldocument.component.html',
  styleUrls: ['./alldocument.component.scss']
})
export class AlldocumentComponent implements OnInit {
  tableData: any;
  currentData: any;
  emptyfiles: boolean = false;
  private subscription: Subscription;

  openDropdownIndex: number | null = null;
  options = [
    // { label: 'View details', imgSrc: '../../assets/menu-icons/view-details.svg' },
    { label: 'Share', imgSrc: '../../assets/menu-icons/share.svg' },
    { label: 'Rename', imgSrc: '../../assets/menu-icons/rename.svg' },
    { label: 'Move', imgSrc: '../../assets/menu-icons/move.svg' },
    { label: 'Delete', imgSrc: '../../assets/menu-icons/delete.svg' },
  ];
  toggleDropdown(index: number) {
    this.openDropdownIndex = this.openDropdownIndex === index ? null : index;
  }

  selectOption(option: { label: string; imgSrc: string }, row: any) {
    this.openDropdownIndex = null;
    if (option.label === 'Delete') {
      this.openDeleteDialog(row);
    } else if (option.label === 'Share') {
      // Handle share
    } else if (option.label === 'Rename') {
      this.rename(row)
    } else if (option.label === 'Move') {
      // Handle move
    }
  }


  constructor(
    private apiservice: AlldocumentService,
    private apiservice1: MenuBarService,
    private router: Router,
    private dialog: MatDialog,
    private sb: SnackbarService,
  ) {
  }

  ngOnInit(): void {
    this.loadtable();
    this.subscription = this.apiservice.notifyOtherComponent$.subscribe(() => {
      this.loadtable();
    });
  }

  loadtable() {
    this.apiservice.getAll().subscribe((data: any) => {
      this.tableData = data.response;
      this.emptyfiles = this.tableData.length === 0;
    });
  }

  openFolder(data: any): void {
    this.apiservice.EDGId = data.EDGId;
    this.router.navigate(['activites/alldoc/', data.EDGId]);
  }

  onDelete(data: any) {
    this.apiservice.EDGId = data.EDGId;
    const requestData = {
      updatedBy: 1,
    };
    this.apiservice.delete(requestData).subscribe((response) => {
      this.sb.open('Deleted Successfully', 'bg-green');
      this.apiservice1.notifyParentComponent();
      this.loadtable();
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
    let dialogRef = this.dialog.open(CreateCategoriesComponent, {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
