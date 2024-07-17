import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appBgChangeImage]',
})
export class BgChangeImageDirective implements OnInit {
  @Input() imagesList = [];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    let imageIndex;
    let currentImage = localStorage.getItem('currentBgImage');

    if (!currentImage) {
      imageIndex = 0;
      localStorage.setItem('currentBgImage', this.imagesList[imageIndex]);
    }

    let currentImagePath;
    currentImagePath = `../../assets/images/bg/${currentImage}`;

    /* this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-image',
      `url(${currentImagePath})`
    ); */

    //console.log(this.elementRef.nativeElement,currentImage);

    this.renderer.addClass(this.elementRef.nativeElement,currentImage);

    currentImage =
      this.imagesList[this.imagesList.indexOf(currentImage) + 1] ||
      this.imagesList[0];

    localStorage.setItem('currentBgImage', currentImage);
  }
}
