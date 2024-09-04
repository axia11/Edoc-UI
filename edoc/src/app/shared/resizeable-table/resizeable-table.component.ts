import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: "th[resizeable]",
  templateUrl: './resizeable-table.component.html',
  styleUrls: ['./resizeable-table.component.scss']
})
export class ResizeableTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @HostBinding("style.width.px")
  width: number | null = null;
 
  onResize(width: number) {
    this.width = width;
  }
}
