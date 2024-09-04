import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TitleBarService } from './_service/title-bar.service';


@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
  @Input() sidenavStatus: MatSidenav;
  notificationCount = 5;
  public pageTitle: any = {
    title: ''
  }
  constructor(
    private httpObj: HttpClient,
    private route: ActivatedRoute,
    public router: Router,
    private renderer: Renderer2,
    private apiservice: TitleBarService
    // public sb: SnackbarService,
  ) { }

  ngOnInit(): void {

    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          // console.log('this.router.url', this.router.url);
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

  onSearch(term: string): void {
    this.apiservice.setSearchTerm(term);
  }
}
