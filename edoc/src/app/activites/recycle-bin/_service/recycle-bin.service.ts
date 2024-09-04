import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class RecycleBinService {
  EDHId: any = [];
  EDGId: any = [];
  constructor(
    private ds: DataService,
  ) { }

  getAll(): Observable<any> {
    return this.ds.getAll(`/edoc/getAllRecycleData`);
  }

  restore(data): Observable<any> {
    return this.ds.update(`/edoc/restoredData/${this.EDHId}/${this.EDGId}`, data);
  }

  permenatlydelete(data): Observable<any> {
    return this.ds.update(`/edoc/deletePermanently/${this.EDHId}/${this.EDGId}`, data);
  }

}
