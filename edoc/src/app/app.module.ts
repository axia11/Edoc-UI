import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'libs/material/src';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { LandingComponent } from 'libs/landing/src/lib/landing/landing.component';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';
import { AvatarModule } from 'ngx-avatar';
import { MdePopoverModule } from '@material-extended/mde';
import { SharedModule } from './shared/shared.module';
import { CommonService } from './shared/_services/common.service';
import { DataService } from './shared/_services/data.services';
import { httpInterceptorProviders } from './shared/http-interceptors';
const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
]
@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    HighchartsChartModule,
    AvatarModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled', onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }),
    MdePopoverModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CommonService,
    DatePipe,
    httpInterceptorProviders,
    DataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
