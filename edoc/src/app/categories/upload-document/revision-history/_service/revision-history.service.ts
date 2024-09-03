import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { RevisionHistoryComponent } from '../revision-history.component';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class RevisionHistoryService {
  private componentRef: any;
  data;

  constructor(
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private ds: DataService,
  ) { }

  open(data: any) {
    const factory = this.resolver.resolveComponentFactory(RevisionHistoryComponent);
    this.componentRef = factory.create(this.injector);
    this.componentRef.instance.data = data;
    this.data = this.componentRef.instance.data;
    // this.apiservice.data = data
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


  getallrevhistory(): Observable<any> {
    return this.ds.getAll(`/docUpload/getRevisionHistory/${this.data.rowData.EDHId}`);
  }
}
