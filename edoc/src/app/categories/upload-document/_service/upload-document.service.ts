import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { DataService } from 'src/app/shared/_services/data.services';
import { UploadDocumentComponent } from '../upload-document.component';
import { Observable } from 'rxjs';
import { DocTitleService } from '../doc-title/_service/doc-title.service';

@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {

  private componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private ds: DataService,
    private apiservice: DocTitleService
  ) { }

  open(data: any) {
    const factory = this.resolver.resolveComponentFactory(UploadDocumentComponent);
    this.componentRef = factory.create(this.injector);
    this.componentRef.instance.data = data;
    this.apiservice.data = data
    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  close() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

  getDropdown(): Observable<any> {
    return this.ds.get(`/edoc/getDropDown`)
  }
}
