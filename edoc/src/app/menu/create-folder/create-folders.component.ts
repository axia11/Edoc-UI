import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuBarService } from '../_service/menu-bar.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlldocumentService } from 'src/app/activites/alldocument/_service/alldocument.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

@Component({
  selector: 'app-create-folders',
  templateUrl: './create-folders.component.html',
  styleUrls: ['./create-folders.component.scss']
})
export class CreateFoldersComponent implements OnInit {

  nestedDataSource = new MatTreeNestedDataSource<any>();
  nestedTreeControl = new NestedTreeControl<any>(node => node.children);
  expandedNode: any | null = null;
  isTreeVisible = false;
  selectedNodePath = '';


  rowData: any;
  isNewFolder: boolean;
  foldername: any;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder,
    public apiService: MenuBarService,
    public apiService1: AlldocumentService,
    private sb: SnackbarService,
    private dialogRef: MatDialogRef<CreateFoldersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  headerForm = this.fb.group({
    DocName: [null, [Validators.required]],
    ParentId: [null],
    EDGId: [null],
  });

  ngOnInit(): void {
    if (this.data && this.data.rowData) {
      this.headerForm.get('DocName').setValue(this.data.rowData.name);
      this.headerForm.get('ParentId').setValue(this.data.rowData.parentPath);
      this.isNewFolder = false;
      this.foldername = 'Rename a Folder';
    } else {
      this.isNewFolder = true;
      this.foldername = 'Create a Folder';
    }
    this.loadTreedropdown();
  }

  submitForm() {
    if (this.headerForm.valid) {
      if (this.headerForm.pristine) {
        return;
      }
      const sendData = this.headerForm.getRawValue();
      if (this.isNewFolder) {
        sendData.parentPath = this.selectedNodePath;
        this.apiService.createfolder(sendData).subscribe(res => {
          this.sb.open('Saved Successfully', 'bg-green');
          this.apiService1.notify();
          this.dialogRef.close();
          this.headerForm.reset();
        });
      } else {
        sendData.parentPath = this.data.rowData.parentPath;
        sendData.EDHId = this.data.rowData.EDHId;
        sendData.EDGId = this.data.rowData.EDGId;
        this.apiService.updatefolder(sendData).subscribe(data => {
          this.sb.open('Updated Successfully', 'bg-green');
          this.apiService1.notify();
          this.dialogRef.close();
        })
      }
    }
  }


  loadTreedropdown(): void {
    this.apiService.getDropdown().subscribe(
      (res: any) => {
        this.nestedDataSource.data = res.response; // Use the dynamic response data
        this.setParentReferences(this.nestedDataSource.data);
        console.log(this.nestedDataSource.data, "check1");
      },
      error => {
        console.error('Error fetching tree structure:', error);
      }
    );
  }
  setParentReferences(nodes: any[], parent: any = null): void {
    nodes.forEach(node => {
      node.parent = parent;
      if (node.children) {
        this.setParentReferences(node.children, node);
      }
    });
  }

  hasNestedChild = (_: number, node: any) => !!node.children && node.children.length > 0;

  toggleNode(node: any): void {
    if (this.isTopLevelNode(node)) {
      if (this.expandedNode && this.expandedNode !== node) {
        this.nestedTreeControl.collapse(this.expandedNode);
      }
      if (this.nestedTreeControl.isExpanded(node)) {
        this.nestedTreeControl.collapse(node);
        this.expandedNode = null;
      } else {
        this.nestedTreeControl.expand(node);
        this.expandedNode = node;
      }
    } else {
      if (this.nestedTreeControl.isExpanded(node)) {
        this.nestedTreeControl.collapse(node);
      } else {
        this.nestedTreeControl.expand(node);
      }
    }
  }

  isTopLevelNode(node: any): boolean {
    return this.nestedDataSource.data.includes(node);
  }

  showTree(): void {
    this.isTreeVisible = !this.isTreeVisible;
    if (this.isTreeVisible) {
      this.renderer.listen('window', 'click', this.handleClickOutside.bind(this));
    }
  }

  handleClickOutside(event: MouseEvent): void {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isTreeVisible = false;
    }
  }

  selectNode(node: any): void {
    this.selectedNodePath = this.getNodePath(node);
    this.isTreeVisible = false;
  }

  getNodePath(node: any): string {
    const path = [];
    let currentNode: any = node;
    this.headerForm.get('EDGId').setValue(currentNode.EDGId)
    if (currentNode.EDHId) {
      this.headerForm.get('ParentId').setValue(currentNode.EDHId)
    }
    while (currentNode) {
      path.unshift(currentNode.DocName);
      currentNode = currentNode.parent || null;
    }
    return path.join('/');
  }


  // addNewChild() {
  //   let dialogRef = this.dialog.open(this.callAPIDialog, {
  //     width: '460px',
  //     disableClose: true
  //   });
  // }
}
