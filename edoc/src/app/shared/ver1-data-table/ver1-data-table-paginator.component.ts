import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tenr-ver1-dt-paginator',
  templateUrl: './ver1-data-table-paginator.component.html',
  styleUrls: ['./ver1-data-table-paginator.component.scss']
})
export class Ver1DataTablePaginatorComponent implements OnInit {
  @Input() options;
  @Output() pageChanged: EventEmitter<any> = new EventEmitter();
  @Output() pageSizeChanged: EventEmitter<any> = new EventEmitter();

  get lastPage() {
    return Math.ceil(this.options.length / this.options.pageSize);
  }

  // - ${this.options.pageIndex *
  //   (this.options.pageSize < this.options.length ? this.options.pageSize : this.options.length)}
  get pageRangeLabel() {
    return `${(this.options.pageIndex - 1) * this.options.pageSize + 1}
                - ${(this.options.pageIndex * this.options.pageSize) < this.options.length
        ? (this.options.pageIndex * this.options.pageSize)
        : this.options.length} of ${this.options.length}
                `;
  }

  ngOnInit() {
  }

  pageChanges(pageIndex) {
    const event = {
      pageIndex: pageIndex >= 1 ? pageIndex : Math.ceil(this.options.length / this.options.pageSize),
      pageSize: this.options.pageSize
    };
    this.options.pageIndex = event.pageIndex;
    this.pageChanged.emit(event);
  }

  pageSizeChanges(evt) {
    const event = {
      pageIndex: 1,
      pageSize: evt.value
    };
    this.options.pageIndex = event.pageIndex;
    this.options.pageSize = event.pageSize;
    this.pageSizeChanged.emit(event);
  }
}
