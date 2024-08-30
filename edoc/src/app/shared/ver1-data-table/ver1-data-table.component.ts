import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnInit,
  ElementRef,
  ViewChildren,
  QueryList,
  ViewContainerRef
} from '@angular/core';
import {
  trigger,
  state,
  transition,
  style,
  animate
} from '@angular/animations';
import { ConfirmDeleteComponent } from './confirm-delete.component';
import { SelectionModel } from '@angular/cdk/collections';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonService } from '../_services/common.service';
import { MatTableDataSource } from '@angular/material/table';
import { MdePopoverTrigger } from '@material-extended/mde';
import { MatInput } from '@angular/material/input';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { WHITE_ON_BLACK_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
// import { ClockPickerDialogService, ClockPickerConfig } from 'ng-clock-picker-lib';
// import { DataService } from '../../services/data.services';
// import { ComponentService } from '../../../_services/comp.service';
// import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'tenr-ver1-data-table',
  templateUrl: './ver1-data-table.component.html',
  styleUrls: ['./ver1-data-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class Ver1DataTableComponent implements OnInit {
  // @ViewChild(MdePopoverTrigger) trigger: MdePopoverTrigger;
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
  mdePopoverTriggerOn = "none";

  // timeConfig: ClockPickerConfig = {
  //   wrapperClassName: 'axia-time-dialog',
  //   closeOnOverlayClick: true
  // };

  @Input() dtOptions;
  @Input() length;
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
  @Output() checkedState = new EventEmitter();
  @Output() nextDate = new EventEmitter();
  @Output() prevDate = new EventEmitter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContent') tableContent: ElementRef;
  @ViewChild('tableSearch') tableSearch: ElementRef;
  // @ViewChild('rowDetailContainer', { read: ViewContainerRef }) dtContainer;
  @ViewChildren('rowDetailContainer', { read: ViewContainerRef }) dtContainers;
  @ViewChild('newDetailContainer', { read: ViewContainerRef }) newDtContainer;
  @ViewChildren('rowDetail') rowDetails: QueryList<ElementRef>;
  @ViewChildren(MatCheckbox) chkBoxes: QueryList<MatCheckbox>;

  constructor(
    public dsr: DomSanitizer,
    private router: Router,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    public cs: CommonService,
    private vcr: ViewContainerRef,
  ) // private clockPickerDialogService: ClockPickerDialogService,
  {
    // added by pavitra
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
 
  // public pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   legend: {
  //     position: "right",
  //     align: "center",
  //     labels: {
  //       // fontSize: 10,
  //       fontColor: 'white',
  //       // fontColor:WHITE_ON_BLACK_CSS_CLASS,
  //       // usePointStyle: true
  //     }
  //   },
  // };
  public pieChartLabels: String[] = [];
  public pieChartData: Number[] = [];
  // public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array<any>;
  ngOnInit() {
    this.pieChartLabels = [];
    this.pieChartData = [];
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
    if (this.dtOptions.columns.linkExpandable) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'linkExpandable',
        cusData: 'linkExpandable',
        styles: { width: '25px' }
      });
    }
    if (this.dtOptions.expandable && !this.dtOptions.expandOnBtn) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'expandable',
        cusData: 'expandable',
        disabled: true,
        styles: { width: '10px' }
      });
    }
    if (this.dtOptions.checkbox) {
      this.dtOptions.columns.unshift({
        display: ' ',
        data: 'checkbox',
        cusData: 'checkbox',
        styles: { width: '25px' }
      });
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
    this.dtOptions = Object.assign({}, this.dataTableOptions, this.dtOptions);
    this.dataSource = new MatTableDataSource(this.dtOptions.data);
    this.dataSource['pageIndex'] = this.dtOptions.pageIndex;
    this.dataSource['pageSize'] =
      +window.localStorage.pageSize || this.dtOptions.pageSize;
    this.dataSource['length'] = this.dtOptions.length;
    this.dataSource['pageSizeOptions'] = this.dtOptions.pageSizeOptions;
    this.dataSource['checkRadBtn'] = this.dtOptions.checkRadBtn;
    this.dataSource['checkRadExpandBtn'] = this.dtOptions.checkRadExpandBtn;
    this.dataSource['enableCb'] = !!this.dtOptions.enableCb;
    this.displayedColumns = this.dtOptions.columns.map(column => column.data);
    this.columnsToDisplay = this.displayedColumns.slice();
    this.dataLoaded.emit(this.dataSource.data.length);
    // this.clockPickerDialogService.registerViewContainerRef(this.vcr);
  }

  tableSpanArr() { }

  openDialog(element): void {
    const message = `Are you sure you want to delete ?`;
    const dialogData = {
      title: 'Delete ?',
      message: message,
      fn: this.trigDelete.bind(this, element)
    };
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '480px',
      data: dialogData,
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

  onSearch(value: string) {
    value = value.trim();
    this.tableSearch.nativeElement.value = value;
    if (value !== this.lastSearch) {
      this.dataSource['search'] = value.trim().toLowerCase();
      this.dataSource['pageIndex'] = 1;
      this.cs.searchValues[this.router.routerState.snapshot.url] = value;
      this.reloadTable(null, this.dtOptions.disableQuery);
      this.lastSearch = value;
    }
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
    // console.log(evt, data, 'datatable');
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

  trigLinkExpandBtn(data, idx) {
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

  getTdData(evt, column, dtCol, id) {
    if (column.showPopover == true) {
      var data = evt.MId;
      //  added by pavithra for piechart
      // this.apiservice.getPiechartdata(evt.MId).subscribe(data => {
      //   console.log("response", data.response.MachineLabel.length);
      //   var index = data.response.MachineLabel.length - 1;
      //   this.pieChartLabels = data.response.MachineLabel;
      //   this.pieChartData = data.response.MachineValue;
      //   this.pieChartColors = data.response.Colors;
      //   this.pieChartColors[0].backgroundColor[index] = '#00000045';
      // })
    }
  }

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

  trigShowOptions(elm: MatCheckboxChange, Value) {
    this.checkedState.emit(elm)
  }

  selChkboxToggle(elm) {
    this.selection.toggle(elm);
    this.chkboxSelected.emit({ elm });
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
      this.dataSource['length'] = data['response'].count;
    }
    this.dataLoaded.emit(data['response'].rows.length);
  }

  sortTable(evt, msg) {
    this.dataSource['sortField'] =
      evt && evt.direction ? evt.active : this.dtOptions.InitSortField;
    this.dataSource['sortOrder'] = (evt && evt.direction) || 'desc';
    this.dataSource['pageIndex'] = 1;
    this.reloadTable(!!msg ? msg : null, this.dtOptions.disableQuery);
  }

  pageChanged(evt) {
    window.localStorage.pageSize = evt.pageSize;
    this.dataSource['pageIndex'] = evt.pageIndex;
    this.dataSource['pageSize'] = evt.pageSize;
    this.reloadTable(null, this.dtOptions.disableQuery);
    this.tableContent.nativeElement.scrollTop = 0;
  }

  reloadTable(sbMsg, noQuery?, pageIndex?, columns?) {

    this.dtOptions.component.apiService
      .getAll(!noQuery ? this.getQuery(pageIndex) : '')
      .subscribe(res => {
        const res1 = {response:res};
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
      });
  }

  reloadTableLucy(sbMsg, noQuery?, pageIndex?) {

    this.dtOptions.component.apiService
      .getAll(!noQuery ? this.getQuery(pageIndex) : '')
      .subscribe(res => {
        const res1 = {response:res}
        this.updateTable(res1);
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
      });
  }

  trigCell(data, column, elm, idx) {
    this.cellClicked.emit({ data, idx, column });
    // added by pavithra for piechart
    // this.apiservice.getPiechartdata(data.MId).subscribe(data=>{
    // this.pieChartLabels = data.response.MachineLabel;
    // this.pieChartData  = data.response.MachineValue;
    // })
    // this.pieChartLabels = this.cs.ChartData.response.MachineLabel;
    //  this.pieChartData  = this.cs.ChartData.response.MachineValue;
    // mdePopoverTriggerOn = "click"
    // this.trigger.openPopover();

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
    // const id = data[this.dtOptions.InitSortField];
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
}
