import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { CommonService } from 'src/app/shared/_services/common.service';
import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class MenuBarService {

  mainMenuList;
  menus = new BehaviorSubject<boolean>(false);
  constructor(
    public ds: DataService,
    private cs: CommonService
  ) { }
  private notifyParent = new Subject<void>();

  notifyParentObservable$ = this.notifyParent.asObservable();

  notifyParentComponent() {
    this.notifyParent.next();
  }


  getcatgList(): Observable<any> {
    return this.ds.getAll(`/edoc/getAllCategory`);
  }

  createcategaries(data): Observable<any> {
    const sendData = data;
    sendData['PLId'] = 1;
    sendData['createdBy'] = 1;
    return this.ds.add(`/edoc/createCategory`, sendData)
  }

  updatecategaries(data): Observable<any> {
    return this.ds.update(`/edoc/renameCategory`, data)
  }

  createfolder(data): Observable<any> {
    const sendData = data;
    sendData['createdBy'] = 1;
    return this.ds.add(`/edoc/createFolder`, sendData)
  }

  updatefolder(data): Observable<any> {
    return this.ds.update(`/edoc/renameFolder`, data)
  }

  getAllUMScreens(): Observable<any> {
    return this.ds.get(`/account/getAllUMScreens`);
  }

  createObj = (itm: any) => {
    const obj: any = {
      iconName: itm.iconName ? itm.iconName : '',
      urls: itm.url ? itm.url : '',
      url: itm.moduleUrl ? itm.moduleUrl : '',
      MODId: itm.MODId ? itm.MODId : '',
      moduleName: itm.moduleName ? itm.moduleName : '',
    };
    if (itm.MODId) {
      obj.MODId = itm.MODId;
    }
    if (itm.Modurl) {
      obj.url = itm.Modurl;
    }
    if (itm.MTModId) {
      obj.MTModId = itm.MTModId;
    }
    return obj;
  };

  getDropdown(): Observable<any> {
    return this.ds.get(`/edoc/getDropDown`)
  }

}
