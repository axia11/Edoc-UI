import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { DocTitleService } from './_service/doc-title.service';
import { SnackbarService } from 'src/app/shared/_services/snackbar.service';
import { FileUploadControl } from 'src/app/shared/ver1-files-upload/public_api';

@Component({
  selector: 'app-doc-title',
  templateUrl: './doc-title.component.html',
  styleUrls: ['./doc-title.component.scss']
})
export class DocTitleComponent implements OnInit {
  issueList: any = [];
  DestinationList: any = [];
  nestedDataSource = new MatTreeNestedDataSource<any>();
  nestedTreeControl = new NestedTreeControl<any>(node => node.children);
  expandedNode: any | null = null;
  isTreeVisible = false;
  selectedNodePath = '';
  // files: File[] = [];
  paperSize = [{ 'Orgsize': 1, 'size': 'A3' }, { 'Orgsize': 2, 'size': 'A4' }]
  isView: boolean;
  fileChangeEvt = false;
  files = new FileUploadControl();
  isNewFolder: boolean = true;
  revNumber: any;
  isEdit: boolean = false;
  PrevInter: any;
  getOneData = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private fb: FormBuilder,
    private apiservice: DocTitleService,
    private sb: SnackbarService,
  ) { }

  headerForm = this.fb.group({
    DocumentId: [null, [Validators.required]],
    ParentId: [null],
    Parentpath: [null],
    EDGId: [null],
    EDHId: [null],
    RevNo: [null, [Validators.required]],
    IssueCode: [null, [Validators.required]],
    Destination: [null],
    Orgsize: [null],
    DocumentTitle: [null, [Validators.required]],
    Sheets: [null],
    PreparedBy: [null],
    Notes: [null],
    Isconfidential: [false],
    IsInternalIssue: [false],
    Islockverison: [false]
  });
  ngOnInit(): void {
    this.loadTreedropdown();
    this.loadBasedata();
    if (this.apiservice.data.rowData.EDDId > 0) {
      this.getOne();
    }
  }
  // onFilesSelected(selectedFiles: File[]): void {
  //   this.files = selectedFiles;
  // }

  onCheckboxChange() {
    const isChecked = this.headerForm.get('Isconfidential').value;
    console.log('Checkbox checked:', isChecked);
  }

  loadBasedata() {
    this.apiservice.getDropdownByType().subscribe(res => {
      this.issueList = res.response.IssueCode;
      this.DestinationList = res.response.Destination;
    });
  }

  getOne() {
    this.apiservice.getone().subscribe(res => {
      if (res.response != null) {
        this.getOneData = true
      }
      this.apiservice.EDDId = +res.response.detail.EDDId;
      this.isEdit = true
      this.isNewFolder = false;
      // const file = new File(
      //   [new Blob([])],
      //   res.response.filename,
      //   { type: `application/${res.response.extension}` }
      // );
      // this.files.setValue([{
      //   file: file,
      //   url: res.response.fileurl,
      //   name: res.response.filename,
      //   extension: res.response.extension,
      // }]);
      this.headerForm.get('Parentpath').setValue(res.response.header.parentPath);
      this.headerForm.patchValue(res.response.detail)
      this.revNumber = res.response.detail.RevNo
      this.headerForm.disable()
    })
  }


  submitForm() {
    if (this.headerForm.valid) {
      if (this.headerForm.pristine) {
        return;
      }
      const rowData = this.apiservice.data?.rowData;
      if (rowData && rowData.EDDId > 0) {
        if (this.files.value.length === 0) {
          this.sb.open('Please upload a file', 'bg-red');
          return;
        }
        var sendData = this.headerForm.getRawValue()
        if (Number(sendData.RevNo) < Number(this.revNumber)) {
          this.sb.open(`RevNo. should be grater than ${this.revNumber}`, 'bg-red');
          return;
        }
        sendData.EDDId = this.apiservice.data.rowData.EDDId;
        sendData.Parentpath = this.apiservice.data.rowData.parentPath;
        if (this.files.value.length > 0 && this.files.value[0]) {
          let DocData = Object.assign({},
            sendData,
            this.files.value
          )
          this.apiservice.updateDoc(DocData).subscribe(res => {
            if (res.Success) {
              this.sb.open('Updated Successfully', 'bg-green');
            }
            this.headerForm.disable();
            this.isEdit = true
          });
        }
      } else {
        if (this.files.value.length === 0) {
          this.sb.open('Please upload a file', 'bg-red');
          return;
        }
        var sendData = this.headerForm.getRawValue()
        sendData.Parentpath = this.selectedNodePath;
        let DocData = Object.assign({},
          sendData,
          this.files.value
        )
        this.apiservice.saveDoc(DocData).subscribe(res => {
          if (res.Success) {
            this.sb.open('File Uploaded Successfully', 'bg-green');
          }
          this.headerForm.disable();
          this.isEdit = true
        });
      }
    }
  }


  close() {
    // this.headerForm.reset();
    // this.mainservice.close()
  }

  enableEdit() {
    this.getOneData = false
    this.revNumber = this.headerForm.value.RevNo

    this.PrevInter = this.headerForm.value.Internal
    if (this.PrevInter == true) {
      var gg = this.revNumber.split('');
      var no = +gg[1] + 1
      this.headerForm.get('RevNo').setValue(gg[0] + no)
    } else {
      var no = +this.revNumber + 1
      this.headerForm.get('RevNo').setValue(no)
    }
    this.headerForm.enable()
    this.isEdit = false;
  }

  loadTreedropdown(): void {
    this.apiservice.getDropdown().subscribe(
      (res: any) => {
        this.nestedDataSource.data = res.response;
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
      this.headerForm.get('EDHId').setValue(currentNode.EDHId)
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
