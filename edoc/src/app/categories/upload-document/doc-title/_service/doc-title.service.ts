import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { send } from 'process';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class DocTitleService {
  EDDId;
  data;
  constructor(
    private ds: DataService,
    private datepipe: DatePipe
  ) { }

  getDropdown(): Observable<any> {
    return this.ds.get(`/edoc/getDropDown`)
  }
  getDropdownByType(): Observable<any> {
    return this.ds.get(`/docUpload/DocDropDown`)
  }

  saveDoc(sendData): Observable<any> {
    let files = new FormData();
    files.append('file', sendData[0].file, sendData[0].file.name);
    sendData['RevNo'] = encodeURIComponent(sendData.RevNo);
    sendData['PreparedBy'] = encodeURIComponent(sendData.PreparedBy);
    let query = `EDHId=${sendData.EDHId}&EDGId=${sendData.EDGId}&RevNo=${sendData.RevNo}&Orgsize=${sendData.Orgsize}&Sheets=${sendData.Sheets}&PreparedBy=${sendData.PreparedBy}&Notes=${sendData.Notes}&Destination=${sendData.Destination}&IssueCode=${sendData.IssueCode}&Isconfidential=${sendData.Isconfidential}&IsInternalIssue=${sendData.IsInternalIssue}&Islockverison=${sendData.Islockverison}&CreatedBy=1&DocumentTitle=${sendData.DocumentTitle}&DocumentId=${sendData.DocumentId}&Parentpath=${sendData.Parentpath}`;
    debugger
    return this.ds.addAttachment(`/docUpload/uploadDoc?${query}`, files);
  }

  updateDoc(sendData): Observable<any> {
    let files = new FormData();
    files.append('file', sendData[0].file, sendData[0].file.name);
    sendData['RevNo'] = encodeURIComponent(sendData.RevNo);
    sendData['PreparedBy'] = encodeURIComponent(sendData.PreparedBy);
    let query = `EDHId=${sendData.EDHId}&EDGId=${sendData.EDGId}&RevNo=${sendData.RevNo}&Orgsize=${sendData.Orgsize}&Sheets=${sendData.Sheets}&PreparedBy=${sendData.PreparedBy}&Notes=${sendData.Notes}&Destination=${sendData.Destination}&IssueCode=${sendData.IssueCode}&Isconfidential=${sendData.Isconfidential}&IsInternalIssue=${sendData.IsInternalIssue}&Islockverison=${sendData.Islockverison}&CreatedBy=1&DocumentTitle=${sendData.DocumentTitle}&DocumentId=${sendData.DocumentId}Parentpath=${sendData.Parentpath}`;
    debugger
    return this.ds.addAttachment(`/docUpload/UpdateUploadDoc?${query}`, files);
  }

  getone(): Observable<any> {
    return this.ds.get(`/docUpload/getRevisionData/${+this.data.rowData.EDHId}`);
  }

  companiondoc(sendData): Observable<any> {
    let files = new FormData();
    for (let i = 0; i < sendData.file.length; i++) { files.append('files', sendData.file[i], sendData.file[i].name); };
    let query = `EDDId=${sendData.EDDId}&createdBy=1`
    return this.ds.addAttachment(`/docUpload/uploadCompanionDoc?${query}`, files)
  }

  getAll(): Observable<any> {
    return this.ds.getAll(`/edoc/getAllRecycleData`);
  }
}
