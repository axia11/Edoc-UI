import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-inline-edit-datatable',
  templateUrl: './inline-edit-datatable.component.html',
  styleUrls: ['./inline-edit-datatable.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InlineEditDatatableComponent implements OnInit {
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];
  displayedColumnsTspan: any[] = [];
  columnsToDisplayTspan: any[] = [];
  dataSource: MatTableDataSource<any> | any;
  selection = new SelectionModel<any>(true, []);
  dataTableOptions = {
    data: [],
    columns: [],
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [3, 5, 25, 50]
  };

  pageNumber: number = 1;
  expandedElement: any;
  searchValue: any;
  isLoading: boolean = true;
  filterForm = this._formBuilder.group({});
  inlineForm = this._formBuilder.group({
    tableRows: this._formBuilder.array([])
  });

  filterSelectObj: any = {
    columnProp: '',
    options: []
  };
  sbOptions: any = {
    updated: { msg: 'Record Updated Successfully!', class: 'bg-green' },
    added: { msg: 'Record Added Successfully!', class: 'bg-green' },
    deleted: { msg: 'Record Deleted Successfully!', class: 'bg-red' }
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatMenuTrigger) clickMenuTrigger!: MatMenuTrigger;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChildren('rowDetailContainer', { read: ViewContainerRef })
  dtContainers: any;
  @ViewChild('searchSelectInput', { read: ElementRef })
  searchSelectInput: ElementRef;
  @ViewChild('search') searchTextBox!: ElementRef;

  @Output() editRowData = new EventEmitter<any>();
  @Output() saveRow = new EventEmitter<any>();
  @Output() deleteRow = new EventEmitter();
  @Output() slideRow = new EventEmitter();
  @Output() dataLoaded = new EventEmitter();
  @Output() cellClicked = new EventEmitter();
  @Output() getDropdownData = new EventEmitter();
  @Output() getMultiselectDropdownData = new EventEmitter();
  @Output() chkboxSelected = new EventEmitter();
  @Output() SelectedAll = new EventEmitter();

  @Input() dtOptions: any;
  searchPlaceholder: any;
  isTableReloaded: boolean = false;
  public fields: any = {};

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.dtOptions.isApiLoaded) {
      setTimeout(() => {
        this.isLoading = false;
      }, 200);
    }
    this.dtOptions.data.forEach((item: any, index: any) => {
      this.initFormData(item, index);
    });

    if (this.dtOptions.checkbox) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'checkbox',
        cusData: 'checkbox',
        styles: { width: '25px' }
      });
    }
    if (this.dtOptions.expandable && !this.dtOptions.expandOnBtn) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'expandable',
        cusData: 'expandable',
        styles: { width: '10px' }
      });
    }

    this.dtOptions = Object.assign({}, this.dataTableOptions, this.dtOptions);
    this.dataSource = new MatTableDataSource(this.dtOptions.data);
    this.dataSource['pageIndex'] = this.dtOptions.pageIndex;
    this.dataSource['length'] = this.dtOptions.length;
    this.dataSource['pageSizeOptions'] = this.dtOptions.pageSizeOptions;
    this.dataSource['checkRadBtn'] = this.dtOptions.checkRadBtn;
    this.dataSource['enableCb'] = !!this.dtOptions.enableCb;
    this.displayedColumns = this.dtOptions.columns.map(
      (column: any) => column.data || 'Actions'
    );
    this.dtOptions.data.map((column: any) => (column.isEditable = true));
    this.columnsToDisplay = this.displayedColumns.slice();
    this.columnsToDisplay.forEach((item, index) => {
      this.filterSelectObj[item] = {
        columnProp: item,
        options: this.uniqueList(item).filtered
      };
      this.filterForm.addControl(item, this._formBuilder.control([]));
    });
    this.searchPlaceholder = this.columnsToDisplay.slice(0, 2).join(', ');
    this.dtOptions.columns.forEach((val: any) => {
      if (val.display.trim().length && val.searchable) {
        this.fields = { ...this.fields, [val.inputConfig.viewValue]: '' };
      }
    });
    console.log(this.dtOptions, 'table data')
  }

  get tableRows(): any {
    return this.inlineForm.get('tableRows') as FormArray;
  }

  initFormData(field: any, index: any) {
    const formControlsConfig: any = {};
    for (let elm in field) {
      formControlsConfig[elm] = field[elm];
    }
    this.dtOptions.columns.forEach((item: any) => {
      formControlsConfig[item.data] = item?.required
        ? new FormControl(field[item.data], Validators.required)
        : new FormControl(field[item.data]);
      formControlsConfig['saved'] = field ? true : false;
      formControlsConfig['isEditable'] = false;
      formControlsConfig['isSubmitted'] = false;
      formControlsConfig['isNew'] = false;
    });
    let dynamicForm: any = this._formBuilder.group(formControlsConfig, [
      Validators.required
    ]);
    this.tableRows.push(dynamicForm);
  }

  addNewRow() {
    const formControlsConfig: any = {};

    this.dtOptions.columns.forEach((item: any) => {
      formControlsConfig[item.data] = item?.required
        ? new FormControl('', Validators.required)
        : new FormControl('');
      // formControlsConfig['id'] = new Date();
      formControlsConfig['saved'] = false;
      formControlsConfig['checkbox'] = '';
      formControlsConfig['isEditable'] = true;
      formControlsConfig['isSubmitted'] = false;
      formControlsConfig['isNew'] = true;
      // formControlsConfig[controlName] = null;
    });

    let newRow = this._formBuilder.group(formControlsConfig);
    this.tableRows.insert(0, newRow);
    this.dataSource.data = this.tableRows.value;
  }

  cancelRow(data: any, index: any) {
    this.tableRows.controls[index].patchValue({ isEditable: false });
    if (this.tableRows.controls[index].value.isNew) {
      this.tableRows.removeAt(index);
      this.dataSource.data = this.tableRows.value;
    }
  }

  isFormValid(index: any) {
    const control: any = this.tableRows.controls[index] as FormGroup;
    return control;
  }

  trigSave(data: any, index: any) {
    this.tableRows.controls[index].patchValue({ isSubmitted: true });

    if (this.tableRows.controls[index].valid) {
      this.dataSource.data = this.tableRows.value; // use this to update the table view
      this.saveRow.emit({ data, index });
    } else {
    }
  }

  isDataSaved(index: any, data: any) {
    this.tableRows.controls[index].patchValue({ data, isEditable: false });
  }

  trigEditRow(data: any, index: any, column: any) {
    this.tableRows.controls[index].patchValue({
      isEditable: true,
      isNew: false
    });
    this.editRowData.emit({ data, column });
  }

  trigDelete(data: any, index: any) {
    this.dtOptions.component.apiService.delete(data).subscribe(() => {
      this.tableRows.removeAt(index);
      this.dataSource.data = this.tableRows.value;
      this.deleteRow.emit({ data });
    });
  }

  trigCell(data: any, column: any, elm: any, idx: any) {
    this.cellClicked.emit({ data, idx, column });
  }

  sortTable(evt: any, msg: any) {
    this.dataSource['sortField'] =
      evt && evt.direction ? evt.active : this.dtOptions.InitSortField;
    this.dataSource['sortOrder'] = (evt && evt.direction) || 'desc';
    this.dataSource['pageIndex'] = 1;
    this.reloadTable(!!msg ? msg : null, this.dtOptions.disableQuery);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dtOptions']) {
      this.displayedColumns = this.dtOptions.columns.map(
        (column: any) => column.data || 'Actions'
      );
      this.columnsToDisplay = this.displayedColumns.slice();
    }
  }

  uniqueList(column: any) {
    const ids: any = this.dtOptions.data.map((o: any) => o[column]);
    const filtered: any = this.dtOptions.data.filter(
      (item: any, index: any) => !ids.includes(item[column], index + 1)
    );
    return { filtered };
  }

  applyFilter(evt: any, column: any) {
    let filterColumn: any = this.filterForm.value;
    let filterValue = Object.values(this.filterForm.getRawValue());

    Object.keys(this.filterForm.value).forEach((item, index) => {
      if (filterColumn[column.data].length > 0) {
        if (item === column.data) {
          if (filterValue.length !== 0) {
            const selectedOptions: any = [...filterValue];
            this.dataSource.filterPredicate = (data: any) => {
              return selectedOptions.includes(data[column.data]);
            };
            this.dataSource.filter = '';
            this.dataSource.filter = 'trigger';
          } else {
            this.dataSource.filter = '';
          }
        }
      } else {
        this.dataSource.filter = '';
      }
    });
    document.querySelectorAll('.mat-menu-panel').forEach((elm: any) => {
      elm.style.display = 'none';
    });
  }

  reset() {
    this.dataSource.filter = '';
  }

  openDeleteDialog(element: any, index: any): void {
    const message = `This will delete permanently. you cannot undo this action.`;
    const dialogData = {
      title: 'Are you sure you want to delete this?',
      message: message
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        dialogData,
        fn: this.trigDelete.bind(this, element, index)
      }
    });
  }

  reloadTable(sbMsg: any, noQuery?: any, pageIndex?: any) {
    this.isLoading = true;
    this.dtOptions.component.apiService
      .getAll(this.getQuery(pageIndex))
      .subscribe((res: any) => {
        this.tableRows.controls = [];
        this.isLoading = false;
        this.isTableReloaded = true;
        if (res.response.rows.length) {
          res.response.rows.forEach((item: any, index: any) => {
            this.initFormData(item, index);
            this.dataSource.data = this.tableRows.value; // use this to update the table view
          });
        } else {
          this.tableRows.value = [];
          this.dataSource.data = [];
        }
        if (sbMsg) {
          const sb = typeof sbMsg === 'string' ? this.sbOptions[sbMsg] : sbMsg;
          this.snackBar.open(sb.msg, '', {
            duration: 1500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: sb.class
          });
        }
      });
  }

  getQuery(pageIndex?: any) {
    let query = '';
    // let query = (this.dtOptions.hidePagination && !pageIndex) ? '?pageIndex=1&pageSize=100000' : `?pageIndex=${pageIndex || this.dataSource['pageIndex']}`;

    if (this.dataSource['sortField']) {
      query = !query ? '?' : query + '&';
      query +=
        `${this.dataSource['sortField']}` +
        `&sortOrder=${
          this.dataSource['sortOrder'] ? this.dataSource['sortOrder'] : 'desc'
        }`;
    }

    if (this.dataSource['search']) {
      // query = !query ? '?' : query + '&';
      query += `search?q=${this.dataSource['search']}`;
    }

    return query;
  }

  setDropDownValues(
    evt: any,
    data: any,
    idx: any,
    patchItems: any,
    column: any
  ) {
    this.getDropdownData.emit({
      data,
      evt,
      selectedOption: evt.source.selected.id,
      column
    });
    let patchItemsList: any = patchItems;
    if (!!patchItemsList) {
      for (let item of patchItemsList) {
        this.tableRows.controls[idx].patchValue({
          [item]: evt.source.selected.id[item]
        });
      }
    }
  }

  setDropDownValuesMultiple(
    evt: any,
    data: any,
    idx: any,
    patchItems: any[],
    column: any
  ) {
    console.log(data, evt, column)
    this.getMultiselectDropdownData.emit({
      data,
      evt,
      selectedOption: evt.value,
      column
    });
    let patchItemsList: any = patchItems;

    if (!!patchItemsList) {
      for (let item of patchItemsList) {
        const selectedItemId = evt.value;
  
        // Check if the item exists in the selected option
        if (selectedItemId && selectedItemId.hasOwnProperty(item)) {
          // Patch the value of the corresponding form control
          this.tableRows.controls[idx].get(item)?.patchValue(selectedItemId[item]);
        }
      }
    }
  }

  onSearch(searchInput: any) {
    let filterValue = searchInput.value;
    this.searchValue = filterValue;
    this.dataSource['search'] = filterValue.trim().toLowerCase();
    this.dataSource['pageIndex'] = 1;
    this.reloadTable(null, this.dtOptions.disableQuery);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    this.SelectedAll.emit();
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }

  selChkboxToggle(elm: any) {
    this.selection.toggle(elm);
    let selected = this.selection.selected;
    this.chkboxSelected.emit({ elm, selected });
  }

  trigSlideBtn(data: any, idx: any) {
    // const id = data[this.dtOptions.InitSortField];
    const vc = this.dtContainers._results[idx];
    const elmTr = vc.element.nativeElement.parentElement.parentElement;
    this.slideRow.emit({
      data: data,
      vc: vc,
      elm: elmTr
      // fn: this.slideRowDetail.bind(this, elmTr)
    });
  }

  slideRowDetail(elm: any) {
    const display = elm.style.display;
    if (display === 'table-row') {
      elm.previousSibling.classList.remove('expanded');
    } else {
      if (this.dtOptions.singleExpandable) {
        const table = elm.closest('table');
        const trs = table.querySelectorAll('.expanded');
        trs.forEach((tr: any) => {
          tr.nextSibling.style.display = 'none';
          tr.classList.remove('expanded');
        });
      }
      elm.previousSibling.classList.add('expanded');
    }
    elm.style.display = display === 'table-row' ? 'none' : 'table-row';
  }

  filteredDropDownValues(evt) {
    // console.log(evt,'checking evt in inline','this is dtoptions:',this.dtOptions)
  }

  keyUpSearch(event: any, field: any) {
    this.fields[field] = event.target.value;
  }

  clearSearch(field: any) {
    this.fields[field] = '';
  }

  openedChange(e: any) {
    // Focus to search textbox while clicking on selectbox
    if (e == true) {
      this.searchTextBox.nativeElement.focus();
    }
  }
}
