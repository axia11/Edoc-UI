import { ANIMATION_TYPES, INg2LoadingSpinnerConfig } from 'ng2-loading-spinner';
import { CaptchaDlgComponent } from './captcha-dlg/captcha-dlg.component';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
// import { }
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'tenr-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  loadingConfig: INg2LoadingSpinnerConfig = {
    animationType: ANIMATION_TYPES.halfCircle,
    spinnerPosition: 'center',
    backdropBorderRadius: '0px',
    spinnerSize: 'sm',
    spinnerFontSize: '10px',
    spinnerColor: '#fff'
  };

  public bgImagesList = [
    'axia-bg-1',
    'axia-bg-2',
    'axia-bg-3',
    'axia-bg-4',
    'axia-bg-5',
    'axia-bg-6'
  ];

  currentUrl: string;
  lastVisitedRoute: string;
  errData: string = '';
  showErr = true;
  clientList: any;
  code: any;
  inputCode: any;
  isSubmitted = false;
  apiLoads = false;
  landingForm: FormGroup = this.fb.group({
    domain: [null, Validators.required]
  });

  captchaForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    captchaCode: [null, Validators.required]
  });

  domainNameForm = new FormControl('', Validators.required);
  invalidDomain: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) // private regService: RegisterService,
  {}

  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.lastVisitedRoute = localStorage.lastVisitedRoute || '/axiahome/dashboard';
    // this.redirectLucy();
    // this.regService.getAllclientURLS().subscribe(data => {
    //   this.clientList = data.response
    // })
  }

  redirectLucy() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const urlQueryParams = `?userId=${userId}&token=${token}`;
    // if (token && userId) {
    //   window.location.href = '/dashboard' + urlQueryParams;
    // } else {
    window.location.href =
      `${environment.redirectUrl}/login?baseurl=` +
      this.currentUrl +
      '&prevurl=' +
      this.lastVisitedRoute;
    // }
  }

  redirectLucySignUp() {
    window.location.href =
      `${environment.redirectUrl}/signup?baseurl=` +
      this.currentUrl +
      '&prevurl=' +
      this.lastVisitedRoute;
  }

  freeTrial() {
    window.location.href =
      `${environment.redirectUrl}/freeTrial?baseurl=` +
      this.currentUrl +
      '&prevurl=' +
      this.lastVisitedRoute;
  }

  validateInput(event) {
    this.getStarted();
  }

  resetInput(evt) {
    this.invalidDomain = false;
  }

  getStarted() {
    this.apiLoads = true;
    let domainName = this.domainNameForm.value.trim().split('.');
    let createDomain =
      domainName.length == 1
        ? domainName + '.axiasmart.com'
        : domainName.join('.');
    this.isSubmitted = true;
    if (this.domainNameForm.valid) {
      this.apiLoads = false;
      if (this.domainNameForm.pristine) {
        return;
      }
      let isDomainExist = this.clientList.filter(item => {
        if (item.clientUrl.split('//')[1] == createDomain) {
          return item;
        }
      });
      if (isDomainExist.length > 0) {
        this.redirectLucy();
      } else {
        this.invalidDomain = true;
      }
    }
    setTimeout(() => {
      this.apiLoads = false;
    }, 2000);
  }

  forgotLogin() {
    const dialogRef = this.dialog.open(CaptchaDlgComponent, {
      width: '350px',
      data: this,
      panelClass: 'custom-dialog'
    });
  }
}
