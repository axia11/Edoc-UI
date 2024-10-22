import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent, SnackbarsComponent } from './app.component';
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
import { MenuBarComponent } from './menu/menu-bar.component';
import { SpinnerFileComponent } from './categories/spinner-folder/spinner-file.component';
import { ErrMsgComponent } from './shared/_components/errMsg.component';
import { MatTabsModule } from '@angular/material/tabs';
import { HandleErrorService } from './shared/http-interceptors/error-handle';
import { CreateCategoriesComponent } from './menu/create-categories/create-categories.component';
import { CreateFoldersComponent } from './menu/create-folder/create-folders.component';
import { IsAuthGuard } from './_guards/isAuth.guard';
// import { CookieService } from 'ngx-cookie-service';
const routes: Routes = [
  {
    path: 'activites',
    canActivate: [IsAuthGuard],
    loadChildren: () =>
      import('../app/activites/activites.module').then(m => m.ActivitesModule)
  },
  {
    path: 'profiles',
    canActivate: [IsAuthGuard],
    loadChildren: () =>
      import('../app/profiles/profiles.module').then(m => m.ProfilesModule)
  },
  {
    path: 'uploaddocx',
    canActivate: [IsAuthGuard],
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule), data: {
      breadcrumb: { skip: true, alias: '' }
    },
  },
  { path: '', component: LandingComponent, pathMatch: 'full' },

]
@NgModule({
  declarations: [
    AppComponent,
    TitleBarComponent,
    SnackbarsComponent,
    MenuBarComponent,
    SpinnerFileComponent,
    ErrMsgComponent,
    CreateCategoriesComponent,
    CreateFoldersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MaterialModule,
    MatTabsModule,
    SharedModule,
    HighchartsChartModule,
    AvatarModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled', onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' }),
    MdePopoverModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [SpinnerFileComponent],
  providers: [
    CommonService,
    HandleErrorService,
    DatePipe,
    httpInterceptorProviders,
    DataService,
    IsAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
