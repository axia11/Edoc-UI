import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/shared/_services/data.services';
import { environment } from 'src/environments/environment';
// import { DataService } from 'src/app/shared/_services/data.services';

@Injectable({
  providedIn: 'root'
})
export class TitleBarService {
  private searchSubject = new BehaviorSubject<string>('');
  search$ = this.searchSubject.asObservable();

  setSearchTerm(term: string): void {
    this.searchSubject.next(term);
  }

  updatePlant = new BehaviorSubject<any>(false);
  isSidenavOpen = new BehaviorSubject<any>(true);

  constructor(
    private ds: DataService,
    private httpObj: HttpClient

  ) { }

  disablePlantMenu = false;
  defaultRLId;
  path = '/cob/';

  getUpdatePlant(status) {
    this.updatePlant.next(status);
  }

  updateSideNav(status) {
    this.isSidenavOpen.next(status);
  }


  updateProfileData(): Observable<any> {
    const userId = localStorage.getItem('userId');
    const body = {
      termsacceptstat: true
    };
    return this.httpObj.put(`${environment.lucyApiUrl}/user/updateUserData/${userId}`, body);
  }
  logout(data): Observable<any> {
    const sendData = data;
    const userId = localStorage.getItem('userId');
    return this.ds.add(`/account/logout/${userId}`, sendData);
  }
}
