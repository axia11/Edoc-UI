import { MatSelectionList } from '@angular/material/list';
import { MatInput } from '@angular/material/input';
import { MatSort, Sort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from 'src/app/shared/_services/common.service';
// import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
// import { monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
// import { ChartType, ChartOptions } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDeleteComponent } from 'src/app/shared/ver1-data-table/confirm-delete.component';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-ver3-data-table',
  templateUrl: './ver3-data-table.component.html',
  styleUrls: ['./ver3-data-table.component.scss'],
})

export class Ver3DataTableComponent implements OnInit {

  @ViewChildren(MatInput, { read: ElementRef }) inputs: QueryList<ElementRef>;

  lastSearch = '';
  displayedColumns: string[];
  columnsToDisplay: string[];
  displayedColumnsTspan: any[] = [];
  columnsToDisplayTspan: any[] = [];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  searchValue = '';
  totalRowSpan = 1;
  reducedGroups = [];
  initialData: any[];
  selectedFilterIdx: any;
  isApiReloaded: boolean = true;
  allData: any[];
  highlightedRow: any = null;

  highlightRows(row: any) {
    this.highlightedRow = row;
  }
  dataTableOptions = {
    data: [],
    columns: [],
    pageIndex: 1,
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100]
  };
  sbOptions = {
    updated: { msg: 'Record Updated Successfully!', class: 'bg-green' },
    added: { msg: 'Record Added Successfully!', class: 'bg-green' },
    deleted: { msg: 'Record Deleted Successfully!', class: 'bg-red' }
  };
  shiftColorOptions = {
    1: 'row-bgHighlight-1',
    2: 'row-bgHighlight-2',
    3: 'row-bgHighlight-3'
  }
  selectedRowHighligtClass;
  // mdePopoverTriggerOn = "none";

  // timeConfig: ClockPickerConfig = {
  //   wrapperClassName: 'cim-time-dialog',
  //   closeOnOverlayClick: true
  // };

  @Input() dtOptions;
  @Input() length;
  @Input() groupByColumns;
  @Output() addRow: EventEmitter<any> = new EventEmitter();
  @Output() viewRow = new EventEmitter();
  @Output() editRow = new EventEmitter();
  @Output() inlineEditRow = new EventEmitter();
  @Output() inlineClearRow = new EventEmitter();
  @Output() saveRow = new EventEmitter();
  @Output() IsEditRow = new EventEmitter();
  @Output() IsSaveRow = new EventEmitter();
  @Output() rejRow = new EventEmitter();
  @Output() breakRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();
  @Output() deleteFile = new EventEmitter();
  @Output() selectedRow = new EventEmitter();
  @Output() cbClicked = new EventEmitter();
  @Output() cellClicked = new EventEmitter();
  @Output() chkboxSelected = new EventEmitter();
  @Output() slideRow = new EventEmitter();
  @Output() slideRadBtnRow = new EventEmitter();
  @Output() slideNewRow = new EventEmitter();
  @Output() dataLoaded = new EventEmitter();
  @Output() relation = new EventEmitter();
  @Output() tableReloaded = new EventEmitter();
  @Output() showRowData = new EventEmitter();
  @Output() popRowData = new EventEmitter();
  @Output() printData = new EventEmitter();
  @Output() copyData = new EventEmitter();
  @Output() visibleRowData = new EventEmitter();
  @Output() removeRow = new EventEmitter();
  @Output() viewTime = new EventEmitter();
  @Output() nextDate = new EventEmitter();
  @Output() prevDate = new EventEmitter();
  @Output() showDataGroupBy = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContent') tableContent: ElementRef;
  @ViewChild('tableSearch') tableSearch: ElementRef;
  // @ViewChild('rowDetailContainer', { read: ViewContainerRef }) dtContainer;
  @ViewChildren('rowDetailContainer', { read: ViewContainerRef }) dtContainers;
  @ViewChild('newDetailContainer', { read: ViewContainerRef }) newDtContainer;
  @ViewChildren('rowDetail') rowDetails: QueryList<ElementRef>;
  @ViewChildren(MatCheckbox) chkBoxes: QueryList<MatCheckbox>;
  @ViewChild('filterItem') selectionList: MatSelectionList;

  constructor(
    public dsr: DomSanitizer,
    private router: Router,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    public cs: CommonService,
    private vcr: ViewContainerRef,
    // private apiservice: WoCapacityService
  ) // private clockPickerDialogService: ClockPickerDialogService,
  {  }
  // @Input() count;
  // @Input() totalPages;

  // public pieChartLabels: String[] = [];
  // public pieChartData: Number[] = [];
  // public pieChartLegend = true;
  // public pieChartPlugins = [];
  // public pieChartColors: Array<any>;
  // public pieChartLabels: String[] = [];
  // public pieChartData: Number[] = [];
  // public pieChartLegend = true;
  // public pieChartPlugins = [];
  // public pieChartColors: Array<any>;
  // full: boolean = true;
  // limit: number = 100;
  _alldata: any[];
  columns: any[];

  shouldScroll: boolean = true;
  pageIndexCall: number;
  filterList: any = [{ type: 'A to Z', direction: 'asc' }, { type: 'Z to A', direction: 'desc' }];
  selectedRowIndex;

  ngOnInit() {
    // document.querySelectorAll('.mat-row.cdk-row:not(.clickable)').forEach((trs: any) => {
    //   trs.style.display = 'none';
    // })
    this.dtOptions.columns.map(element => {
      element.filterType = [{ type: 'A to Z', direction: 'asc' }, { type: 'Z to A', direction: 'desc' }, { type: element.display, direction: element.data }];
    });
    this.dtOptions.data.map((elm: any, idx) => {
      elm.dataIdx = idx + 1;
    });
    this.pageIndexCall = Math.ceil(this.dtOptions.length / 40);

    // this.pieChartLabels = [];
    // this.pieChartData = [];
    // this.pieChartLabels = [];
    // this.pieChartData = [];
    this.searchValue =
      this.cs.searchValues[this.router.routerState.snapshot.url] || '';
    this.lastSearch =
      this.cs.searchValues[this.router.routerState.snapshot.url] || '';
    this.totalRowSpan = this.dtOptions.tableSpan
      ? this.dtOptions.tableSpan.length
      : 1;
    if (!this.dtOptions.hideSrNo) {
      this.dtOptions.columns.unshift({
        display: 'Sr No.',
        data: 'srNo',
        cusData: 'srNo',
        styles: { width: '25px' }
      });
    } else if (this.dtOptions.srNo) {
      this.dtOptions.columns.shift({
        display: 'Sr No.',
        data: 'srNo',
        cusData: 'srNo',
        styles: { width: '25px' }
      });
    }
    if (this.dtOptions.checkRadBtn) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'radBtn',
        cusData: 'radBtn',
        styles: { width: '25px' }
      });
    }
    if (this.dtOptions.radExpandBtn) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'radExpandBtn',
        cusData: 'radExpandBtn',
        styles: { width: '25px' }
      });
    }
    if (this.dtOptions.expandable && !this.dtOptions.expandOnBtn) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'expandable',
        cusData: 'expandable',
        styles: { width: '40px', 'padding':'0 0 0 6px' }
      });
    }
    if (this.dtOptions.checkbox) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'checkbox',
        cusData: 'checkbox',
        styles: { width: '30px' }
      });
    }
    if (this.dtOptions.rightStatusColumn) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'rightStatusColumn',
        cusData: 'rightStatusColumn',
        styles: { width: '15px' }
      });
    }
    if (this.dtOptions.leftStatusColumn) {
      this.dtOptions.columns.push({
        display: ' ',
        data: 'leftStatusColumn',
        cusData: 'leftStatusColumn',
        styles: { width: '30px' }
      });
    }
    // Moving colouredColumn before checkbox if enableColouredColumn is true
    if (this.dtOptions.enableColouredColumn === true && this.dtOptions.checkbox === true) {
      if(this.dtOptions.columns[1].colouredColumn === true)
      {
        this.dtOptions.columns = this.arrayMove(this.dtOptions.columns, 1, 0);
      }
    }
    if (this.dtOptions.tableSpan) {
      const tableSpanObj = {};
      const tableSpanArr = [];
      this.dtOptions.tableSpan.forEach((i, idx) => {
        i.forEach(j => {
          tableSpanObj[j.data] = {};
          tableSpanObj[j.data].rowSpan = j.rowSpan || 1;
          tableSpanObj[j.data].colSpan = j.colSpan || 1;
          if (idx > 0) {
            tableSpanArr.push(j.data);
          }
        });
      });
      this.dtOptions.columns.forEach(col => {
        col.rowSpan = tableSpanObj[col.data]
          ? tableSpanObj[col.data].rowSpan
          : this.totalRowSpan;
        col.colSpan = tableSpanObj[col.data]
          ? tableSpanObj[col.data].colSpan || 1
          : 1;
      });

      this.displayedColumnsTspan[0] = Object.assign(
        [],
        this.dtOptions.columns.map(column => column.data)
      );
      this.displayedColumnsTspan[0] = this.displayedColumnsTspan[0].filter(
        item => tableSpanArr.indexOf(item) === -1
      );
      this.dtOptions.tableSpan.forEach((i, idx) => {
        i.forEach(j => {
          if (!this.displayedColumnsTspan[idx]) {
            this.displayedColumnsTspan[idx] = [];
          }
          if (idx === 0) {
            this.displayedColumnsTspan[0].splice(j.index, 0, j.data);
          } else {
            this.displayedColumnsTspan[idx].push(j.data);
          }
          if (j.colSpan) {
            this.columnsToDisplayTspan.push(j);
          }
        });
      });
    }
    let inputData = this.dtOptions.data;
    if (!this.initData(inputData)) return;
    this.buildDataSource();
  }


  onTableScroll(e) {
    if (this.dtOptions['pageIndex'] <= this.pageIndexCall) {
      // if (this.shouldScroll) {
      const tableViewHeight = e.target.offsetHeight // viewport: ~500px
      const tableScrollHeight = e.target.scrollHeight // length of all table
      const scrollLocation = e.target.scrollTop; // how far user scrolled
      // If the user has scrolled within 200px of the bottom, add more data
      const buffer = 50;
      const limit = tableScrollHeight - tableViewHeight - buffer;
      if (this.isApiReloaded) {
        if (scrollLocation > limit) {
          this.isApiReloaded = false;
          let query = this.dtOptions.noPaging ? '' : `?pageIndex=${this.dtOptions['pageIndex'] += 1}`;
          query += `&searchString=${this.lastSearch ? this.lastSearch : ''}`
          this.dtOptions.component.apiService.getAll(query).subscribe(res => {
            this.isApiReloaded = true
            if (res.response.count === this.dataSource.data.length) {
              return;
            } else {
              if(this.groupByColumns!=undefined) {
                //console.log(this.groupByColumns, this.initialData, this.allData);
                if(this.allData==undefined)
                  this.allData = this.initialData ? [...this.initialData, ...res.response.rows] : this.dtOptions.data;
                else
                  this.allData = [...this.allData, ...res.response.rows];
                this.allData.map((elm: any, idx) => {
                  elm.dataIdx = idx + 1;
                });
                this.dataSource = new MatTableDataSource(this.groupBy(this.groupByColumns, this.allData));
              }
              else {
                const data: Element[] = this.dataSource ? [...this.dataSource.data, ...res.response.rows] : this.dtOptions.data;
                data.map((elm: any, idx) => {
                  elm.dataIdx = idx + 1;
                });
                this.dataSource = new MatTableDataSource(data);
              }
            }
          });
        }
      }
    }
  }

  openDialog(element): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '620px',
      data: {
        fn: this.trigDelete.bind(this, element)
      }
    });
  }

  showTimeModal(elm, colData) {
    // console.log(elm, colData, ': elm');
    // this.timeConfig.initialValue = elm[colData];
    // this.clockPickerDialogService.showClockPickerDialog(this.timeConfig).subscribe((time) => {
    //   console.log(time, ': Time');
    //   // elm[colData] = time;
    //   if (time) {
    //     elm[colData] = time;
    //   }
    // });
  }

  //Backend Search 
  onSearch(value: string) {
    value = value.trim();
    this.tableSearch.nativeElement.value = value;
    // if (value !== this.lastSearch) {
      this.dataSource['search'] = value.trim().toLowerCase();
      this.dataSource['pageIndex'] = 1;
      this.cs.searchValues[this.router.routerState.snapshot.url] = value;
      this.reloadTable(null, this.dtOptions.disableQuery);
      this.lastSearch = value;
    // }
  }

  getQuery(pageIndex?) {
    // let query = this.dtOptions.noPaging ? '' : `?pageIndex=${this.dataSource['pageIndex']}&pageSize=${this.dataSource['pageSize']}`;
    let query =
      this.dtOptions.hidePagination && !pageIndex
        ? '?pageIndex=1&pageSize=100000'
        : `?pageIndex=${pageIndex || this.dataSource['pageIndex']}`;

    if (this.dataSource['sortField']) {
      query = !query ? '?' : query + '&';
      query +=
        `sortField=${this.dataSource['sortField'] === 'fullRMCode'
          ? 'RMCode'
          : this.dataSource['sortField']
        }` +
        `&sortOrder=${this.dataSource['sortOrder'] ? this.dataSource['sortOrder'] : 'desc'
        }`;
    }
    // if (this.dataSource['search'] && this.cs.searchValues[this.router.routerState.snapshot.url]) {
    //   query = !query ? '?' : query + '&';
    //   query += `&search=${this.dataSource['search']}`;
    // } else {
    //   this.tableSearch.nativeElement.value = '';
    // }

    if (this.dataSource['search']) {
      query = !query ? '?' : query + '&';
      query += `searchString=${this.dataSource['search']}`;
    }
    else {
      query = query.replace(query, "?pageIndex=1");
    }
    return query;
  }

  trigView(data) {
    this.viewRow.emit({ data });
  }

  trigEdit(data) {
    this.editRow.emit({ data });
  }

  isTrigEdit(data) {
    this.IsEditRow.emit({ data });
  }

  isTrigSave(data) {
    this.IsSaveRow.emit({ data });
  }

  trigInlineEdit(evt, data) {
    data.isEditInline = true;
    this.inlineEditRow.emit({ evt, data });
  }

  trigInlineSave(evt, data) {
    this.saveRow.emit({ evt, data });
  }

  trigInlineClose(evt, data) {
    data.isEditable = false;
    data.isEditInline = false;
    this.inlineClearRow.emit({ evt, data });
  }

  trigRej(data) {
    this.rejRow.emit({ data });
  }

  trigBreak(data) {
    this.breakRow.emit({ data });
  }

  trigRelation(data, idx) {
    this.relation.emit({ data, idx });
  }

  trigShow(data) {
    this.showRowData.emit({ data });
  }

  trigAddPop(data) {
    this.popRowData.emit({ data });
  }

  trigVisible(data) {
    this.visibleRowData.emit({ data });
  }

  trigPrint(data) {
    this.printData.emit({ data });
  }

  trigCopy(data) {
    this.copyData.emit({ data });
  }

  trigDelete(data) {
    if (this.dtOptions.delFromComp) {
      this.deleteRow.emit({ data });
    } else {
      this.dtOptions.component.apiService.delete(data).subscribe(() => {
        this.reloadTable('deleted', this.dtOptions.disableQuery);
      });
    }
  }

  trigAdd(data) {
    this.selectedRow.emit({ data });
  }

  trigRemove(data) {
    this.removeRow.emit({ data });
  }

  trigRadBtn(data) {
    this.selectedRow.emit({ data });
  }
  trigRadExpandBtn(data, idx) {
    this.selectedRow.emit({ data });
    const vc = this.dtContainers._results[idx];
    const elmTr = vc.element.nativeElement.parentElement.parentElement;
    this.slideRadBtnRow.emit({
      data: data,
      vc: vc,
      elm: elmTr,
      fn: this.slideRadRowDetail.bind(this, elmTr)
    });
  }

  trigGoNext(elm) {
    this.nextDate.emit(elm);
  }

  trigGoPrev(elm) {
    this.prevDate.emit(elm);
  }

  trigRowGroupBy(item, list) {
    let sortDirection = item.direction;
    let isSortColumn = sortDirection === 'asc' || sortDirection === 'desc' ? true : false;
    if (isSortColumn) {
      this.groupByColumns = null;
      let unGroupData = this.groupBy('', this.initialData, null);
      this.dataSource = new MatTableDataSource(unGroupData);
      const sortState: Sort = { active: list[2].direction, direction: sortDirection };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      this.sort.sortChange.emit(sortState);
      // this.buildDataSource();
    } else {
      this.groupByColumns = list[2].direction;
      this.showDataGroupBy.emit(list[2].direction);
      const sortState: Sort = { active: list[2].direction, direction: 'asc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      //this.buildDataSource();
      if(this.allData==undefined) this.allData = this.initialData;      
      this.dataSource = new MatTableDataSource(this.groupBy(this.groupByColumns, this.allData));
    }
    this.selection.clear();
  }


  deleteFileName(elm, param) {
    elm[param] = '';
    this.deleteFile.emit({ elm, param });
  }

  slideRadRowDetail(elm) {
    const display = elm.style.display;
    if (display === 'table-row') {
      elm.previousSibling.classList.remove('expanded');
    } else {
      if (this.dtOptions.singleExpandable) {
        const table = elm.closest('table');
        const trs = table.querySelectorAll('.expanded');
        trs.forEach(tr => {
          tr.nextSibling.style.display = 'none';
          tr.classList.remove('expanded');
        });
      }
      elm.previousSibling.classList.add('expanded');
    }
    elm.style.display = display === 'table-row' ? 'none' : 'table-row';
  }

  trigChkBox(evt, rowData) {
    this.cbClicked.emit({ evt, rowData });
  }

  trigVendChkBox(evt, rowData, VendorId) {
    const chkBoxes = this.chkBoxes;
    this.cbClicked.emit({ evt, rowData, VendorId, chkBoxes });
  }

  // getTdData(evt, column, dtCol, id) {
  //   if (column.showPopover == true) {
  //     var data = evt.MId;
  //     //  added by pavithra for piechart
  //     this.apiservice.getPiechartdata(evt.MId).subscribe(data => {
  //       var index = data.response.MachineLabel.length - 1;
  //       this.pieChartLabels = data.response.MachineLabel;
  //       this.pieChartData = data.response.MachineValue;
  //       this.pieChartColors = data.response.Colors;
  //       this.pieChartColors[0].backgroundColor[index] = '#00000045';
  //     })
  //   }
  // }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  masterTogglePC() {
    this.isAllSelected() ? this.selection.clear() : this.dtOptions.data.forEach(row => {
        row['WarehouseCode']?this.selection.deselect(row):this.selection.select(row)
    });
  }

  selChkboxToggle(elm) {
    this.selection.toggle(elm);
    // Added by Daksha to get selected row data..
    let selected = this.selection.selected;
    this.chkboxSelected.emit({ elm, selected });
  }

  // On hover checkbox event added by nilam
  handleMouseOver(row) {
    const idx = row.dataIdx;
    this.dataSource.data.map((data: any) => {
      if (data.dataIdx === idx) {
        data.show = true;
      }
    });
  }

  handleMouseLeave(row) {
    const idx = row.dataIdx;
    this.dataSource.data.map((data: any) => {
      if (data.dataIdx === idx) {
        data.show = false;
      }
    });
  }

  highlightRow(row) {
    const idx = row.dataIdx;
    this.dataSource.data.map((data: any) => {
      if (data.dataIdx === idx) {
        data.isHightlight = true;
      }
    });
  }

  updateTable(data, columns?) {
    if (data) {
      this.dataSource.data = data['response'].rows;
      if (columns) {
        const dtOptions = columns(data);
        dtOptions.columns.forEach((itm, i) => {
          if (this.dtOptions.columns[i]) {
            this.dtOptions.columns[i].display = itm.display;
          }
        });
      };
      this.dataSource['length'] = data['response'].rows.length;
    }
    this.buildDataSource();
    this.dataLoaded.emit(data['response'].rows.length);
  }

  //Client-side sorting added by Nilam
  sortTable(evt, msg) {
    this.dataSource.sort = this.sort;
  }

  pageChanged(evt) {
    window.localStorage.pageSize = evt.pageSize;
    this.dataSource['pageIndex'] = evt.pageIndex;
    this.dataSource['pageSize'] = evt.pageSize;
    this.reloadTable(null, this.dtOptions.disableQuery);
    this.tableContent.nativeElement.scrollTop = 0;
  }

  reloadTable(sbMsg, noQuery?, pageIndex?, columns?) {
    this.dtOptions['pageIndex'] = 1;
    this.dtOptions.component.apiService
      .getAll(!noQuery ? this.getQuery(pageIndex) : '')
      .subscribe(res => {
        if (res) {
          this.initialData = res?.response?.rows;
          this.pageIndexCall = Math.ceil(res?.response?.count / 40);
          // this.dtOptions.length = res.response.count;
          // let matTable = document.getElementById('mat-table');
          this.dtOptions['pageIndex'] + 1;
          // matTable.scrollTop = 0;
          this.updateTable(res, columns);
          if (sbMsg) {
            const sb = typeof sbMsg === 'string' ? this.sbOptions[sbMsg] : sbMsg;
            this.snackBar.open(sb.msg, '', {
              duration: 1000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
              panelClass: sb.class
            });
          }
          this.tableReloaded.emit();
        }
      });
  }

  trigCell(data, column, elm, idx) {
    this.cellClicked.emit({ data, idx,elm, column });
  }

  trigNewSlide() {
    const vc = this.newDtContainer;
    const elm = vc.element.nativeElement.parentElement;
    return {
      vc,
      slideUp: () => {
        elm.style.height = 0;
      },
      slideDown: () => {
        elm.style.height = 'auto';
      }
    };
  }

  trigSlideBtn(data, idx) {
    const vc = this.dtContainers._results[idx];
    const elmTr = vc.element.nativeElement.parentElement.parentElement;
    this.slideRow.emit({
      data: data,
      vc: vc,
      elm: elmTr,
      fn: this.slideRowDetail.bind(this, elmTr)
    });
  }

  slideRowDetail(elm) {
    const display = elm.style.display;
    if (display === 'table-row') {
      elm.previousSibling.classList.remove('expanded');
    } else {
      if (this.dtOptions.singleExpandable) {
        const table = elm.closest('table');
        const trs = table.querySelectorAll('.expanded');
        trs.forEach(tr => {
          tr.nextSibling.style.display = 'none';
          tr.classList.remove('expanded');
        });
      }
      elm.previousSibling.classList.add('expanded');
    }
    elm.style.display = display === 'table-row' ? 'none' : 'table-row';
  }

  rowHighlight(row) {
    this.selectedRowIndex = row;
    this.bgHighlightRow(row);
  }

  bgHighlightRow(row) {
    /* if(this.shiftColorOptions[row.Shift]!=undefined) {
      this.selectedRowHighligtClass = this.shiftColorOptions[row.Shift];
    } */
    if(row.HighlightRow!=undefined) {
      this.selectedRowHighligtClass = 'row-bgHighlight-1';
    }
  }

  initData(data) {
    if (!data) return false;
    this.displayedColumns = Object.keys(data);
    this.initialData = this.dtOptions.data;
    return true;
  }

  /**
   * Rebuilds the datasource after any change to the criterions
   */
  buildDataSource() {
    this.dtOptions = Object.assign({}, this.dataTableOptions, this.dtOptions);
    this.dataSource = new MatTableDataSource(this.groupBy(this.groupByColumns, this.initialData, this.reducedGroups));
    this.dataSource['pageIndex'] = this.dtOptions.pageIndex;
    this.dataSource['pageSize'] = +window.localStorage.pageSize || this.dtOptions.pageSize;
    this.dataSource['length'] = this.dtOptions.length;
    this.dataSource['pageSizeOptions'] = this.dtOptions.pageSizeOptions;
    this.dataSource['checkRadBtn'] = this.dtOptions.checkRadBtn;
    this.dataSource['checkRadExpandBtn'] = this.dtOptions.checkRadExpandBtn;
    this.dataSource['enableCb'] = !!this.dtOptions.enableCb;
    this.displayedColumns = this.dtOptions.columns.map(column => column.data);
    this.columnsToDisplay = this.displayedColumns.slice();
    this.dataLoaded.emit(this.dataSource.data.length);
  }

  /**
   * Groups the @param data by distinct values of a @param column
   * This adds group lines to the dataSource
   * @param reducedGroups is used localy to keep track of the colapsed groups
   */
  groupBy(column: string, data: any[], reducedGroups?: any[]) {
    if (!column) return data;
    let collapsedGroups = reducedGroups;
    if (!reducedGroups) collapsedGroups = [];
    const customReducer = (accumulator, currentValue) => {
      let currentGroup = currentValue[column];
      if (!accumulator[currentGroup])
        accumulator[currentGroup] = [{
          groupName: `${column} ${currentValue[column]}`,
          value: currentValue[column],
          isGroup: true,
          reduced: collapsedGroups.some((group) => group.value == currentValue[column])
        }];
      accumulator[currentGroup].push(currentValue);
      return accumulator;
    }

    let groups = data.reduce(customReducer, {});

    // To get The count in the group
    Object.entries(groups).forEach(([key, value]) => {
      groups[key].map((elm) => {
        if (elm.groupName) {
          elm.totalCount = groups[key].length - 1;
        }
      });
    });

    let groupArray = Object.keys(groups).map(key => groups[key]);
    let flatList = groupArray.reduce((a, c) => { return a.concat(c); }, []);

    return flatList.filter((rawLine) => {
      return rawLine.isGroup ||
        collapsedGroups.every((group) => rawLine[column] != group.value);
    });
  }

  /**
   * Since groups are on the same level as the data, 
   * this function is used by @input(matRowDefWhen)
   */
  isGroup(index, item): boolean {
    return item.isGroup;
  }

  /**
   * Used in the view to collapse a group
   * Effectively removing it from the displayed datasource
   */
  reduceGroup(row) {
    row.reduced = !row.reduced;
    if (row.reduced)
      this.reducedGroups.push(row);
    else
      this.reducedGroups = this.reducedGroups.filter((el) => el.value != row.value);
    // console.log(this.reducedGroups);
    // setTimeout(() => {
    //this.buildDataSource();
    if(this.allData==undefined) this.allData = this.initialData;      
    this.dataSource = new MatTableDataSource(this.groupBy(this.groupByColumns, this.allData, this.reducedGroups));
    // }, 0);
  }

  arrayMove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
    return arr;
  }

}
