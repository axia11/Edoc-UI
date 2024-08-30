import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class AlldocumentService {
  EDGId: any;
  EDHId: any;
  constructor(
    private ds: DataService,
  ) { }

  private notifyOtherComponentSource = new Subject<void>();
  notifyOtherComponent$ = this.notifyOtherComponentSource.asObservable();
  notify() {
    this.notifyOtherComponentSource.next();
  }

  getAll(): Observable<any> {
    // let PackId = localStorage.getItem('PackId');
    return this.ds.getAll(`/edoc/getAllCategory`);
  }
  
  delete(data): Observable<any> {
    return this.ds.update(`/edoc/deleteCategory/${this.EDGId}`, data)
  }

  getAll1(): Observable<any> {
    return this.ds.getAll(`/edoc/getAllFolderFiles/${this.EDGId}`);
  }

  getChildData(): Observable<any> {
    return this.ds.getAll(`/edoc/getnext/${this.EDHId}`);
  }

  delete1(data): Observable<any> {
    return this.ds.update(`/edoc/deleteFolder/${this.EDHId}`, data)
  }
}
