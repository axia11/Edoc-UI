import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class TitleBarService {

  updatePlant = new BehaviorSubject<any>(false);
  isSidenavOpen = new BehaviorSubject<any>(true);

  constructor() { }
  disablePlantMenu = false;
  defaultRLId;
  path = '/cob/';

  // getAllPlantsdata(prodClientId): Observable<any> {
  //   return this.ds.get(`/mst/plt/ls/getAllPlantss/${prodClientId}`);
  // }

  getUpdatePlant(status) {
    this.updatePlant.next(status);
  }

  updateSideNav(status) {
    this.isSidenavOpen.next(status);
  }

  // getAllUnreadNotifications(): Observable<any> {
  //   return this.ds.get(`/workflows/getAllUnreadNotifications/${localStorage.userId}`);
  // }

  // updateEmailNotificationPermission(value): Observable<any> {
  //   var data = {
  //     "userId":localStorage.userId,
  //     "EmailNotificationFlag":value,
  //     "updatedBy":localStorage.userId
  // }
  //   return this.ds.update(`/workflows/updateEmailPermission/`,data);
  // }

  // updateNotificationStatus(NHId): Observable<any> {
  //   var data = {
  //     "Status":1,
  //     "updatedBy":localStorage.userId
  // }
  //   return this.ds.update(`/workflows/updateNotificationStatus/${NHId}`,data);
  // }

  // updateisDefault(data): Observable<any> {
  //   const sendData = data
  //   sendData.userid = localStorage.getItem('userId')
  //   return this.ds.update(`${this.path}updateDefault/`,sendData);
  // }


}
