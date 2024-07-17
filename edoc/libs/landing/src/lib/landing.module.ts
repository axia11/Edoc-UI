import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing/landing.component';
import { MaterialModule } from 'libs/material/src/lib/material.module';
import { BgChangeImageDirective } from './landing/bg-change-image.directive';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CaptchaModule } from 'ng-captcha';
import { CaptchaDlgComponent } from './landing/captcha-dlg/captcha-dlg.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2LoadingSpinnerModule.forRoot({
      backdropColor: 'rgba(0, 0, 0, 0.3)',
      spinnerColor: '#fff',
    })
  ],
  declarations: [
    LandingComponent,
    CaptchaDlgComponent,
    BgChangeImageDirective
  ],
  exports: [
    LandingComponent
  ],
  entryComponents: [
    CaptchaDlgComponent
  ],
})
export class LandingModule { }
