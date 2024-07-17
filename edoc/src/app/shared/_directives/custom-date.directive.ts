
import { Directive, ElementRef, HostListener, AfterContentChecked } from '@angular/core';
import { DatePipe } from '@angular/common';

@Directive({
  selector: '[appDate]',
  providers: [DatePipe]
})
export class CustomDateDirective implements AfterContentChecked {

  @HostListener('dateChange') onDateChange() {
    this.updateDateFormat();
  }

  @HostListener('valueChanges') onValueChane() {
    this.updateDateFormat();
  }

  @HostListener('timeChange') onTimeChange(){
   this.updateTime();
  }

  constructor(
    private el: ElementRef,
    private datePipe: DatePipe
  ) { }

  ngAfterContentChecked() {
    this.updateDateFormat();
  }

  updateDateFormat() {
    this.el.nativeElement.value = this.datePipe.transform(this.el.nativeElement.value);
  }
  updateTime(){
    this.el.nativeElement.value = this.el.nativeElement.value
  }
}
