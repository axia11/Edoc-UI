import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from './../shared/_services/common.service';
import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuBarService } from '../menu/_service/menu-bar.service';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class IsAuthGuard implements CanActivate {
  jwt = new JwtHelperService();
  savedUrl: string;
  constructor(
    private route: Router,
    private cs: CommonService,
    private ms: MenuBarService,
    private httpObj: HttpClient,
    private dialog: MatDialog,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    localStorage.setItem('lastVisitedRoute', url);
    if (!!route.queryParams.token) {
      localStorage.setItem('token', route.queryParams.token);
      window.localStorage.setItem('userId', route.queryParams.userId);
      window.localStorage.setItem('username', route.queryParams.username);
      window.localStorage.setItem('clientname', route.queryParams.clientname);
      window.localStorage.setItem('PCLId', route.queryParams.PCLId);
      window.localStorage.setItem('url', route.queryParams.url);
      window.localStorage.setItem('CLId', route.queryParams.CLId);
      window.localStorage.setItem('ProductId', route.queryParams.ProductId);
      window.localStorage.setItem('userCategoryId', route.queryParams.userCategoryId);
    }
    if (!!localStorage.token) {
      try {
        const isExpired = this.jwt.isTokenExpired(localStorage.token);
        if (isExpired) {
          return this.logout();
        }
        return true;
      } catch {
        return this.logout();
      }
    } else {
      if (window.location.host.includes('localhost')) {
        window.location.href = `http://${window.location.host}`;
      }
      else {
        window.location.href = `https://${window.location.host}`;
      }
      return false;
    }
  }

  // canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const currUrl = route.data.url;
  //   if(currUrl !== this.savedUrl){
  //     this.cs.searchValues = {};
  //     this.savedUrl = currUrl;
  //   }
  //   if (!this.cs.allMenus && localStorage.currUserId) {
  //     // if(state.url.match(`/user/${localStorage.currUserId}`) !== null){
  //     //   return false;
  //     // }
  //     // this.ms.getMenu(state.url);
  //     return false;
  //   }
  //   return true;
  // }

  logout() {
    this.logoutUser().subscribe(res => {
      this.cs.setIsAuthenticated(false);
      this.redirectAfterLogout();
    })
    return false;
  }

  logoutUser(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.httpObj.post(`${environment.lucyApiUrl}/gateway/logout/profile/${localStorage.getItem('userId')}`, userId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }

  redirectAfterLogout() {
    this.dialog.closeAll();
    if (window.location.host.includes('localhost')) {
      window.location.href = `http://${window.location.host}`;
    }
    else {
      window.location.href = `https://${window.location.host}`;
    }
    // window.localStorage.clear();
    localStorage.removeItem('firstName');
    localStorage.removeItem('clientName');
    localStorage.removeItem('token');
  }

}
