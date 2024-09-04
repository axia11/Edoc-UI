import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class RecentsService {

  constructor(
    private ds: DataService,
  ) { }

  get(): Observable<any> {
    return this.ds.get(`/account/getAllUsers`);
  }
}
