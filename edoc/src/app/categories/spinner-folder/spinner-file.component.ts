// import { Component, OnInit } from '@angular/core';
import { Component, ViewChild, ViewContainerRef, TemplateRef, ViewEncapsulation, OnInit } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'app-spinner-file',
  templateUrl: './spinner-file.component.html',
  styleUrls: ['./spinner-file.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerFileComponent implements OnInit {
  overlayref = null;
 
  @ViewChild('portal') templatePortal: TemplateRef<any>;

  constructor(
    public overlay: Overlay,
    public vcf: ViewContainerRef,
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  attachSpinner() {
    if (!this.overlayref) {
      const portal = new TemplatePortal(this.templatePortal, this.vcf)
      this.overlayref = this.overlay.create(new OverlayConfig({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-white-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      }));
      this.overlayref.attach(portal);
    }
  }

  detachSpinner() {
    if (this.overlayref) {
      this.overlayref.dispose();
      this.overlayref = null;
    }
  }


}
