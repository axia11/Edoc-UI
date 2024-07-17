import { Directive, OnInit, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMaxChar]'
})
export class MaxCharDirective implements OnInit {

  charMaxLen;
  elInput;
  hintEl = document.createElement('div');

  @Input()
  set appMaxChar(val) {
    this.charMaxLen = +val;
    this.hintEl.textContent = `Max ${val} char allowed!`;
  }

  constructor(
    private el: ElementRef,
  ) { }

  ngOnInit() {
    this.elInput = this.el.nativeElement.querySelector('input') || this.el.nativeElement.querySelector('textarea');
    this.elInput.maxLength = this.charMaxLen;
    this.elInput.addEventListener('input', this.onInputChar.bind(this));
    this.elInput.addEventListener('blur', this.hide.bind(this));
    this.hintEl.classList.add('max-char-hint');
    this.el.nativeElement.appendChild(this.hintEl);
  }

  onInputChar(evt) {
    const val = evt.target.value;
    if (val.length >= this.charMaxLen) {
      evt.target.value = val.substr(0, this.charMaxLen);
      this.show();
    } else {
      this.hide();
    }
  }

  show() {
    this.hintEl.classList.add('show-hint');
  }

  hide() {
    this.hintEl.classList.remove('show-hint');
  }
}
