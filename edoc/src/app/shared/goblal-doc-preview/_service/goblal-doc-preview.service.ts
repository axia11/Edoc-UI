import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class GoblalDocPreviewService {

  constructor(
    private ds: DataService,
  ) { }

  preViewDoc(query) :Observable<any> {
    return this.ds.get(`/docUpload/previewDoc?fileName=${query}` );
  }
}
