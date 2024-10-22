import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'libs/material/src';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { ProfilesComponent } from './profiles.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

export const ISO_FORMAT = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD-MMM-YY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  declarations: [ProfilesComponent,ProfileInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '', component: ProfilesComponent,
        data: {
          breadcrumb: {
            showbreadcrumb: true, // make it true to display the breadCrumb
            label: 'Home',
            info: { myData: { icon: 'home', iconType: 'material' } }
          }
        },
        children: [
          {
            path: 'personal',
            component: ProfileInfoComponent,
            data: {
                breadcrumb: {
                showbreadcrumb: true,
                label: 'Profile'
              }
            }
          },

        ]
      },
    ])
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: ISO_FORMAT,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    }
  ]
})
export class ProfilesModule { }
