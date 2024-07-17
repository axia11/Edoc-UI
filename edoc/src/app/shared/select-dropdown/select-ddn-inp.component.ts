import { Component, OnInit, Input, AfterViewInit, OnDestroy, Host, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-select-ddn',
  template: `
    <select-ddn [formControl]="ddnFltrCtrl" [addBtn]="addBtn" [ddnFltList]="ddnFltList" (addHeader)="addHeaderName($event)"></select-ddn>
  `,
  styles: [``]
})
export class SelectDdnInputComponent implements OnInit, AfterViewInit, OnDestroy {

  filteredList: ReplaySubject<any> = new ReplaySubject<any>(1);
  ddnFltList = true;
  // placeholderLabel = 'Please type to add!';

  ddnFltrCtrl: FormControl = new FormControl();
  // formControlName="ddnFltrCtrl"

  // @Input() ddnFltrCtrl: FormControl;
  @Input() ddnList;
  @Input() ddnId;
  @Input() addBtn = false;
  @Input() ddnName;
  @Input() ddnSelect: MatSelect;
  @Output() filtered: EventEmitter<any> = new EventEmitter();
  @Output() addHeader: EventEmitter<string> = new EventEmitter();

  private _onDestroy = new Subject<void>();

  constructor(
    @Host() private matSel: MatSelect
  ) { }

  ngOnInit(): void {
    this.filteredList.next(this.ddnList.slice());
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setInitialValue();
      this.ddnFltrCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(_ => {
          this.filterDdn();
        });
    }, 0);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private setInitialValue() {
    this.filteredList
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(data => {
        this.filtered.emit(data);
        // this.ddnSelect.compareWith = (a, b) => {
        //   return b ? a[this.ddnId] === b[this.ddnId] : false;
        // };
      });
  }

  private filterDdn() {

    let search = this.ddnFltrCtrl.value.trim();
    if (!search) {
      this.filteredList.next(this.ddnList.slice());
      this.filtered.emit(this.ddnList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // **** Prevously the below function was taking null value and its creating issue while filter in dropdown****
    // const filterList = this.ddnList.filter(item => item[this.ddnName].toLowerCase().indexOf(search) > -1);
    const afterFilterNullitems = this.ddnList.filter(item => { return item[this.ddnName] != null });
    const filterList = afterFilterNullitems.filter(item => item[this.ddnName].toLowerCase().indexOf(search) > -1);
    this.ddnFltList = filterList.length ? !!filterList.find(item => item[this.ddnName].toLowerCase() === search) : false;
    this.filteredList.next(filterList);
    this.filtered.emit(filterList);
  }

  addHeaderName(name) {
    this.addHeader.emit(name);
    // if (!this.ddnList.length && this.placeholderLabel !== 'Search') {
    //   this.placeholderLabel = 'Search';
    // }
    this.ddnSelect.close();
  }
}
