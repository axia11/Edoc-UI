import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private isAuthenticated = new Subject<any>();
  menus = new BehaviorSubject<any>(null);
  loadSpinner = true;
  plScrModLoaded = new BehaviorSubject(false);
  public setAllTabData = new BehaviorSubject<any>([]);
  public getAllTabData = this.setAllTabData.asObservable();

  plants;
  allMenus;
  PlantId;
  ScreenId;
  ModuleId;
  screenUrls;
  screenPerm;
  searchValues = {};
  ChartData;
  defaultRoleId;
  plantNames = [];
  defaultPlant;
  disablePlantMenu;

  constructor(private route: Router, private http: HttpClient) {}

  setIsAuthenticated(status: boolean) {
    status
      ? window.localStorage.setItem('isAuthenticated', 'true')
      : window.localStorage.removeItem('isAuthenticated');
    this.isAuthenticated.next(status);
  }

  getBrand() {
    return {
      name: 'Prem Industries',
      img: '/assets/images/brand.png'
    };
  }

  getMonths() {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
  }

  updateTabData(data: any) {
    this.setAllTabData.next(data);
  }

  // Set dynamic key
  setId(data, idKey) {
    for (let key in data) {
      data[key][idKey] = +key;
    }
    return Object.values(data);
  }

  convertDate(date) {
    return new DatePipe('en-US').transform(date, 'y-MM-d 19:30:00ZZZZZ');
  }

  // getOneClient(clientId): Observable<any> {
  //   return this.http.get(`${environmentLucy.apiUrl}/client/${clientId}`);
  // }

  validateUrl(stateUrl, triggeredFromDdn?) {

    this.menus.next(this.allMenus[this.PlantId]);
    if (triggeredFromDdn) {
      this.route.navigate(['/axiahome/dashboard']);
      return;
    }
    let isScreenAvl = false;
    if (this.PlantId) {
      isScreenAvl = this.screenUrls[this.PlantId].find(
        item => item.url === '/' + stateUrl.split('/')[1].toLowerCase()
      );
    }
    // if (stateUrl === '/dashboard' || this.screenUrls[this.PlantId].indexOf('/' + (stateUrl.split('/')[1]).toLowerCase() ) > -1) {
    if (
      stateUrl.match(`/user/${localStorage.currUserId}`) !== null &&
      !isScreenAvl
    ) {
      this.route.navigate([stateUrl]);
      this.loadSpinner = false;
    } else if (stateUrl === '/missionControl' || !!isScreenAvl) {
      // this.route.navigate([stateUrl.indexOf('/schedule/') > -1 ? stateUrl : stateUrl.split('/')[1]]);
      this.route.navigate([stateUrl.split('/')[1]]);
    } else if (!environment.production && stateUrl === '/temp') {
      this.route.navigate([stateUrl]);
      this.loadSpinner = false;
    } else {
      this.route.navigate(['/notauthorized']);
    }
  }
}
