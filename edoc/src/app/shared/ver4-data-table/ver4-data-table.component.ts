import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-ver4-data-table',
  templateUrl: './ver4-data-table.component.html',
  styleUrls: ['./ver4-data-table.component.scss'],
})
export class Ver4DataTableComponent implements OnInit {
  @Input() dtOptions: any = {};
  // @Output() slideRadBtnRow = new EventEmitter();
  // @Output() inlineEditRow = new EventEmitter();
  // @ViewChildren('rowDetailContainer', { read: ViewContainerRef }) dtContainers;
  // @Output() selectedRow = new EventEmitter();

  editingRow: any;

  constructor() { }

  ngOnInit() { }

  editRow(row: any) {
    // Implement edit row functionality
  }

  deleteRow(row: any) {
    // Implement delete row functionality
  }

  discardRow(row: any) {
    // Implement discard row functionality
  }

  saveRow(row: any) {
    // Implement save row functionality
  }

  toggleExpand(row: any) {
    if (this.dtOptions.singleExpandable) {
      this.dtOptions.data.forEach((r: any) => {
        if (r !== row) {
          r.expanded = false;
        }
      });
    }
    row.expanded = !row.expanded;
  }

  getNestedData(row: any): any[] {
    if (row.expanded) {
      const nestedKey = Object.keys(row).find(key => Array.isArray(row[key]));
      return row[nestedKey] || [];
    }
    return [];
  }
}
