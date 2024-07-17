import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserLogoutService {

  constructor(
    private http: HttpClient,
    private cs: CommonService,
    private route: Router,
  ) { }



  // logoutUser(): Observable<any> {
  //   const userId = localStorage.getItem('userId');
  //   return this.http.post(`${environment.lucyApiUrl}/gateway/logout/profile/${localStorage.getItem('userId')}`, userId, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  // }

  // logout() {
  //   this.cs.setIsAuthenticated(false);
  //   this.logoutUser().subscribe((res) => {
  //     if (res) {
  //       localStorage.removeItem('firstName');
  //       localStorage.removeItem('clientName');
  //       localStorage.removeItem('token');
  //       localStorage.removeItem('userCategoryId');
  //       isDevMode() ? window.location.href = 'http://localhost:4201/login' : environmentLucy.baseUrl
  //       // this.route.navigate(['/login']);
  //     }
  //   });
  //   return false;
  // }
}
