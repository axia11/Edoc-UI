import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TitleBarService } from './_service/title-bar.service';
import { ErrMsgComponent } from '../shared/_components/errMsg.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MdePopoverTrigger } from '@material-extended/mde';


@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Input() sidenavStatus: MatSidenav;
  notificationCount = 5;
  currUserData;
  firstName;
  lastName
  email
  urlPath;
  PackId = new FormControl('');
  ProjectId = new FormControl('');
  userFullName: string;
  @ViewChild(MdePopoverTrigger) trigger: MdePopoverTrigger;

  public pageTitle: any = {
    title: ''
  }
  constructor(
    private httpObj: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private dialog: MatDialog,
    private renderer: Renderer2,
    private apiservice: TitleBarService
    // public sb: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.userId && params.token) {
        window.localStorage.setItem('userId', params.userId);
        window.localStorage.setItem('token', params.token);
        window.localStorage.setItem('firstName', params.firstName);
        window.localStorage.setItem('clientname', params.clientname);
        window.localStorage.setItem('PCLId', params.PCLId);
        window.localStorage.setItem('url', params.url);
        window.localStorage.setItem('CLId', params.CLId);
        window.localStorage.setItem('ProductId', params.ProductId);
        window.localStorage.setItem('userCategoryId', params.userCategoryId);
        // window.localStorage.setItem('PackId', JSON.stringify(packIdArray));
        // this.getALLPlant();
        // this.getALLProjects();
        // this.getAllUnreadNotifications();
      }
      this.getProfileDetails(params.userId).subscribe(res => {
        this.currUserData = res.Result;
        this.userFullName = `${res.Result.firstname} ${res.Result.lastName}`;
        this.firstName = res.Result.firstname;
        window.localStorage.setItem('firstName', res.Result.firstname);
        this.lastName = res.Result.lastname;
        this.email = res.Result.usermail;
        if (res.Result.profilepath == null) {
          return
        }
        this.getProfilePhoto(res.Result.profilepath).subscribe(file => {
          this.loadProfileImage(file);
        })
      }, (error) => {
        if (error.status === 400 || error.status === 401) {
          this.dialog.open(ErrMsgComponent, {
            width: '500px',
            data: {
              message: 'Authentication Failed !!!'
            }
          });
          setTimeout(() => {
            this.signOut();
            localStorage.removeItem('firstName');
            localStorage.removeItem('clientName');
            localStorage.removeItem('token');
            localStorage.removeItem('PLId');
            localStorage.removeItem('RLId');
          }, 5000);
        }
      });

    });
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          let currentURL: string = this.router.url;
          if (currentURL.includes('axiahome/livestream')) {
            this.pageTitle.title = 'Livestream';
          } else if (currentURL.includes('missionControl')) {
            this.pageTitle.title = 'Mission Control';
          } else if (currentURL.includes('axia/pd/Productionsplanning')) {
            this.pageTitle.title = 'Production Planning';
          }
          else if (currentURL.includes('axia/pd/Productionscontrol')) {
            this.pageTitle.title = 'Production Control';
          }
          else if (currentURL.includes('axia/plm')) {
            this.pageTitle.title = 'PLM';
          }
          else if (currentURL.includes('axia/pd')) {
            this.pageTitle.title = 'Production';
          }
          else if (currentURL.includes('axia/maintenance')) {
            this.pageTitle.title = 'Manitanence';
          }
          else if (currentURL.includes('axia/om')) {
            this.pageTitle.title = 'Order Management';
          }
          else if (currentURL.includes('axia/po')) {
            this.pageTitle.title = 'Purchase Orders';
          }
          else if (currentURL.includes('axia/ebr')) {
            this.pageTitle.title = 'eBatch Records';
          }
          else {
            this.pageTitle.title = '';
          }
        }
      }
    );
  }
  getProfileDetails(userId): Observable<any> {
    return this.httpObj.get(`${environment.lucyApiUrl}/user/getUserDetails`, this.httpOptionsBearer());
  }
  httpOptionsBearer() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    };
  }
  getProfilePhoto(profilepath): Observable<any> {
    return this.httpObj.get(`${environment.lucyApiUrl}/gateway/profile/${profilepath}`, this.httpOptionsImage());
  }

  httpOptionsImage() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`
      }),
      responseType: 'blob' as 'json'
    };
  }
  signOut() {
    if (localStorage.getItem('userId') == null || localStorage.getItem('userId') == undefined) {
      return;
    } else {
      this.logout().subscribe(res => {
        // localStorage.clear();
        localStorage.removeItem('firstName');
        localStorage.removeItem('clientName');
        localStorage.removeItem('token');
        localStorage.removeItem('userCategoryId');
        // localStorage.clear();
        if (res) {
          window.location.href = `${localStorage.accountURL || environment.baseUrl}/login?prevurl=/cimhome`;
        }
      })
    }
  }
  logout(): Observable<any> {
    const userId = localStorage.getItem('userId');
    return this.httpObj.post(`${environment.lucyApiUrl}/gateway/logout/profile/${localStorage.getItem('userId')}`, userId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
  loadProfileImage(file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.urlPath = file.size ? reader.result : '../../../assets/camera1.png';
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
  userRoute(route) {
    this.router.navigate([route]);
    this.trigger.closePopover();
  }
  onSearch(term: string): void {
    this.apiservice.setSearchTerm(term);
  }
}
