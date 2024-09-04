import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuBarService } from '../_service/menu-bar.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlldocumentService } from 'src/app/activites/alldocument/_service/alldocument.service';
@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {
  rowData: any;
  isNewcate: boolean;
  catename: string;
  constructor(
    private fb: FormBuilder,
    public apiService: MenuBarService,
    public apiService1: AlldocumentService,
    private sb: SnackbarService,
    private dialogRef: MatDialogRef<CreateCategoriesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  headerForm = this.fb.group({
    GroupName: [null, [Validators.required]],
    EDGId: [null],
  });

  ngOnInit(): void {
    if (this.data && this.data.rowData) {
      this.headerForm.get('GroupName').setValue(this.data.rowData.category);
      this.headerForm.get('EDGId').setValue(this.data.rowData.EDGId);
      this.isNewcate = false;
      this.catename = 'Rename a Categories';
    } else {
      this.isNewcate = true;
      this.catename = 'Create a Categories';
    }
  }

  submitForm() {
    if (this.headerForm.valid) {
      if (this.headerForm.pristine) {
        return;
      }
      const sendData = this.headerForm.getRawValue();
      if (this.isNewcate) {
        this.apiService.createcategaries(sendData).subscribe(res => {
          this.sb.open('Saved Successfully', 'bg-green');
          this.apiService.notifyParentComponent();
          this.apiService1.notify();
          this.dialogRef.close();
          this.headerForm.reset();
        });
      } else {
        sendData.EDGId = this.data.rowData.EDGId
        this.apiService.updatecategaries(sendData).subscribe(data => {
          this.sb.open('Updated Successfully', 'bg-green');
          this.apiService.notifyParentComponent();
          this.apiService1.notify();
          this.dialogRef.close();
        })
      }
    }
  }
  
}
