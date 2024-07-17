import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TitleBarService } from './title-bar/_service/title-bar.service';
import { BreadcrumbService } from 'xng-breadcrumb';
import { SetTokenService } from 'libs/common-services/src';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentScrollPosition = window.pageYOffset;
  @ViewChild('sidenav') sidenav: MatSidenav;
  // @ViewChild(SpinnerFileComponent) spinner: SpinnerFileComponent
  apiLoads = false;

  accepted: boolean = false;
  $isSidenavOpen: Subscription;
  opened: boolean = true;
  showTopBar = true;
  title = 'blunet';
  breadcrumbs: any;
  isSidenavOpen: any = true;
  currentPath: string;
  constructor(
    private dialog: MatDialog,
    // public initService: InitialService,
    // private cs: CommonService,
    private titleService: Title,
    // private es: HandleErrorService,
    private sts: SetTokenService,
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    // private cnbs: ComlNameOfBusService,
    // public ds: DataService,
    @Inject(DOCUMENT) private _document: Document,
    public dashboardService: TitleBarService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.userId && params.token) {
        // window.localStorage.setItem('userId', params.userId);
        // window.localStorage.setItem('token', params.token);
        // window.localStorage.setItem('firstName', params.firstName);
        // window.localStorage.setItem('clientName', params.clientName);
        // window.localStorage.setItem('PLId', params.PLId);
        // window.localStorage.setItem('prodClientId', params.prodClientId);
        // window.localStorage.setItem('baseUrl', params.baseUrl);
        // window.localStorage.setItem('clientId', params.clientId);
        // window.localStorage.setItem('productId', params.productId);
        // window.localStorage.setItem('userCategoryId', params.userCategoryId);
        // window.localStorage.setItem('accountURL', params.accountURL);
        // window.localStorage.setItem('planTimeline', params.planTimeline);
        // window.localStorage.setItem('EId', params.EId);
        this.router.navigate([]);
      }
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        //Idle time will start if the user in the  tab and without perform any action
        // console.log("You left this tab");
        // clearTimeout(this.userActivity);
        // this.dialog.closeAll();
      }
      else {
        if (localStorage.token) {
          // this.setUserTimeout();
          // console.log("You are in this tab");
        }
      }
    });

    this._document.addEventListener("scroll", this.onContentScrolled);
  }
  async ngOnInit() {
    //   // this.requestSubscription();
    //   // this.plms.isPlmMenu.subscribe(isPLM => {
    //   //   this.isPlm = isPLM;
    //   // });

    //   // this.togglePLMMenu();

    //   // this.plms.isWHMenu.subscribe(isWarehouse => {
    //   //   this.isWarehouse = isWarehouse;
    //   // });

    //   this.breadcrumbService.breadcrumbs$.subscribe(breadCrumb => {
    //     this.breadcrumbs = breadCrumb;
    //     // console.log(breadCrumb[0], 'breadCrumb');
    //     this.titleService.setTitle(`Axia Smart | ${breadCrumb[0]?.label || ''}`);
    //   });
    //   this.route.queryParams.subscribe(params => {
    //     this.initService.baseUrl = environment.production
    //       ? window.location.origin
    //       : environment.baseUrl;
    //     this.showTopBar = window.location.pathname.length > 1;
    //     this.opened = window.location.pathname.length > 1;
    //     if (window.location.pathname.length > 1) {
    //       this.getClientInfo();
    //     }
    //   });

    //   this.ds.apiLoads.subscribe(res => {
    //     if (!this.apiLoads && res) {
    //       setTimeout(() => {
    //         this.spinner.attachSpinner();
    //       }, 0);
    //     } else if (!res) {
    //       setTimeout(() => {
    //         this.spinner.detachSpinner();
    //       }, 0);
    //     }
    //     this.apiLoads = res;
    //   });

    //   // this.router.events.subscribe(this.checkRouterEvent);
    //   this.es.errorMsg.subscribe(err => {
    //     this.dialog.open(ErrMsgComponent, {
    //       width: '500px',
    //       data: {
    //         message: err
    //       }
    //     });
    //   });

    this.dashboardService.isSidenavOpen.subscribe(status => {
      // console.log(status);
      this.isSidenavOpen = status;
    })
    // this.showTopBar ? this.sidenav.close() : this.sidenav.open()
  }

  ngAfterViewInit() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationStart) {
        // this.sidenav.close();
        this.apiLoads = false;
        // this.spinner.attachSpinner();
      }

      if (evt instanceof NavigationEnd) {
        this.apiLoads = false;
        // this.spinner.detachSpinner();
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

  onActivate(evt) {
    const scrollLocation = evt.target.scrollTop; // how far user scrolled
    let scrollPosition = Math.round(scrollLocation);
    if (scrollPosition > 20) {
    } else {
    }
  }

  accept() {
    this.accepted = true;
  }

}
