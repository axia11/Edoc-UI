import { Directive, ElementRef, AfterViewInit, Input, HostListener, OnInit, HostBinding } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[appAllowClear]'
})
export class AppAllowClearDirective implements AfterViewInit, OnInit {

  @Input() appAllowClear: FormControl;
  @HostBinding() innerText = 'X';
  // @HostBinding('attr.role') role = 'button';
  @HostListener('click', ['$event']) clear(evt) {
    this.appAllowClear.setValue(null);
    this.removeActive();
    evt.stopPropagation();
  }

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.appAllowClear.valueChanges.subscribe(res => {
      if (res) {
        this.addActive();
      }
    });
  }

  ngAfterViewInit() {
    this.appAllowClear.value ? this.addActive() : this.removeActive();
  }

  addActive() {
    this.el.nativeElement.classList.add('active');
  }

  removeActive() {
    this.el.nativeElement.classList.remove('active');
  }
}
