import { ChangeDetectorRef, Component, ComponentFactoryResolver, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TitleBarService } from './title-bar/_service/title-bar.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { SetTokenService } from 'libs/common-services/src';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
import { SpinnerFileComponent } from './categories/spinner-folder/spinner-file.component';
import { CommonService } from './shared/_services/common.service';
import { DataService } from './shared/_services/data.services';
import { HandleErrorService } from './shared/http-interceptors/error-handle';
import { InitialService } from './_services/initial.service';
import { environment } from 'src/environments/environment';
import { ErrMsgComponent } from './shared/_components/errMsg.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentScrollPosition = window.pageYOffset;
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild(SpinnerFileComponent) spinner: SpinnerFileComponent
  apiLoads = false;
  breadcrumbs: any;
  $isSidenavOpen: Subscription;
  opened: boolean = true;
  showTopBar = true;
  title = 'blunet';
  isSidenavOpen: any = true;
  currentPath: string;
  termsAccepted: boolean = true;

  constructor(
    private dialog: MatDialog,
    public initService: InitialService,
    private titleService: Title,
    private es: HandleErrorService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private httpObj: HttpClient,
    public ds: DataService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: Document,
    public dashboardService: TitleBarService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.userId && params.token) {
        window.localStorage.setItem('userId', params.userId);
        window.localStorage.setItem('token', params.token);
        window.localStorage.setItem('clientname', params.clientname);
        window.localStorage.setItem('PLId', params.PLId);
        window.localStorage.setItem('prodClientId', params.PCLId);
        window.localStorage.setItem('url', params.url);
        window.localStorage.setItem('logintime', params.loginTime);
        window.localStorage.setItem('CLId', params.CLId);
        window.localStorage.setItem('ProductId', params.ProductId);
        // window.localStorage.setItem('userCategoryId', params.userCategoryId);
        // window.localStorage.setItem('planTimeline', params.planTimeline);
        // window.localStorage.setItem('EId', params.EId);
        // window.localStorage.setItem('PLId', params.PLId);
        this.router.navigate([]);
      }
    });

    // document.addEventListener("visibilitychange", () => {
    //   if (document.hidden) {
    //     // clearTimeout(this.userActivity);
    //     // this.dialog.closeAll();
    //   }
    //   else {
    //     if (localStorage.token) {
    //       // this.setUserTimeout();
    //     }
    //   }
    // });

    this._document.addEventListener("scroll", this.onContentScrolled);
  }
  async ngOnInit() {
    this.fetchUserData();
    this.breadcrumbService.breadcrumbs$.subscribe(breadCrumb => {
      this.breadcrumbs = breadCrumb;
      this.titleService.setTitle(`eDocx | ${breadCrumb[0]?.label || ''}`);
    });
    this.route.queryParams.subscribe(params => {
      this.initService.baseUrl = environment.production
        ? window.location.origin
        : environment.baseUrl;
      this.showTopBar = window.location.pathname.length > 1;
      this.opened = window.location.pathname.length > 1;
      // if (window.location.pathname.length > 1) {
        // this.getClientInfo();
      // }
    });

    this.ds.apiLoads.subscribe(res => {
      if (!this.apiLoads && res) {
        setTimeout(() => {
          this.spinner.attachSpinner();
        }, 0);
      } else if (!res) {
        setTimeout(() => {
          this.spinner.detachSpinner();
        }, 0);
      }
      this.apiLoads = res;
    });

    this.es.errorMsg.subscribe(err => {
      this.dialog.open(ErrMsgComponent, {
        width: '500px',
        data: {
          message: err
        }
      });
    });

    this.dashboardService.isSidenavOpen.subscribe(status => {
      this.isSidenavOpen = status;
    })
  }

  ngAfterViewInit() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        // this.sidenav.close();
        this.apiLoads = false;
        this.spinner.attachSpinner();
      }

      if (evt instanceof NavigationEnd) {
        this.apiLoads = false;
        this.spinner.detachSpinner();
      }
      this.currentPath = location.pathname;
    });
  }

  onContentScrolled(e) {
    let scroll = window.pageYOffset;
    if (scroll > this.currentScrollPosition) {
    } else {
    }
    this.currentScrollPosition = scroll;
  }

  toggleSideNav(evt) {
    this.sidenav.toggle();
  }

  margintoTopBar(isSidenavOpen) {
    if (isSidenavOpen && !!this.showTopBar) {
      return 'margin-top-0';
    }
    else if (isSidenavOpen == false) {
      return 'margin-top';
    }
    else {
      return 'margin-top-0';
    }
  }

  // getClientInfo() {
  //   this.cnbs.getAll().subscribe((clientData: any) => {
  //     localStorage.setItem('clientData', JSON.stringify(clientData));
  //   })
  // }
  
  checkRouterEvent(rEvt: Event): void {
    if (rEvt instanceof NavigationEnd ||
      rEvt instanceof NavigationCancel ||
      rEvt instanceof NavigationError) {
      window.scrollTo(0, 0);
    }
  }

  onActivate(evt) {
    const scrollLocation = evt.target.scrollTop; // how far user scrolled
    let scrollPosition = Math.round(scrollLocation);
    if (scrollPosition > 20) {
    } else {
    }
  }


  getProfileDetails(): Observable<any> {
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

  fetchUserData() {
    this.getProfileDetails().subscribe(
      response => {
        this.termsAccepted = response.Result.termsacceptstat;
        this.cdr.detectChanges();
        if (response.Result.altemail === null) {
          this.showSnackbar();
        }
      },
      error => {
        console.error('Error fetching user data', error);
      }
    );
  }

  showSnackbar() {
    const snackBarRef = this.snackBar.openFromComponent(SnackbarsComponent, {
      duration: undefined,
      panelClass: ['bg-blacks'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  acceptTerms() {
    this.dashboardService.updateProfileData().subscribe(res => {
      this.fetchUserData();
    });
  }

  declineTerms() {
    if (localStorage.getItem('userId') == null || localStorage.getItem('userId') == undefined) {
      return;
    } else {
      const sendData = localStorage.getItem('userid')
      this.dashboardService.logout(sendData).subscribe(res => {
        localStorage.removeItem('firstName');
        localStorage.removeItem('clientName');
        localStorage.removeItem('token');
        localStorage.removeItem('userCategoryId');
        if (res) {
          window.location.href = `${localStorage.accountURL || environment.baseUrl}/login?baseurl=${window.location.origin}/&prevurl=${window.location.pathname}`;
        }
      })
    }
  }
}



// Snackbar Component
@Component({
  selector: 'snackbars-component',
  template: `
    <div class="custom-snackbar">
    <img src="../../../../../assets/svg/alert.svg" style="width: 30px;margin-right: 1rem;">
      <span>Your security information is incomplete!<br/>
      It is important.<a (click)="navigateToProfile()">Click here</a> to do it now.</span>
        <mat-icon (click)="close()">cancel</mat-icon>
    </div>
  `,
  styles: [`
    .custom-snackbar {
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    a{
      color: #007bff !important;
      cursor: pointer;
      &:hover{
        text-decoration: underline !important;
      }
    }
    .custom-snackbar .mat-icon {
      color: #ffffff;
    cursor: pointer;
    margin-left: 1rem;
 
      &:hover{
        background: #fff;
        color:#000;
        border-radius: 4px;

      }
    }
  `]
})
export class SnackbarsComponent {
  constructor(private snackBarRef: MatSnackBar,
    private router: Router) { }
  navigateToProfile() {
    this.router.navigate(['/profile']);
  }
  close() {
    this.snackBarRef.dismiss();
  }
}
