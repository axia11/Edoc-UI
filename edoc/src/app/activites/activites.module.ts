import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { FavoritesComponent } from './favorites/favorites.component';
import { RecentsComponent } from './recents/recents.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from 'libs/material/src';
import { MatIconModule } from '@angular/material/icon';
import { RecycleBinComponent } from './recycle-bin/recycle-bin.component';

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
  declarations: [ FavoritesComponent, RecentsComponent, RecycleBinComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MatIconModule,
    RouterModule.forChild([
      {
        path: '', component: RecentsComponent,
        data: {
          breadcrumb: {
            showbreadcrumb: true, // make it true to display the breadCrumb
            label: 'Home',
            info: { myData: { icon: 'home', iconType: 'material' } }
          }
        },
      },
      {
        path: 'favorites', component: FavoritesComponent, data: {
          breadcrumb: {
            label: 'Favorites',
          }
        },
      },

      {
        path: 'recyclebin', component: RecycleBinComponent, data: {
          breadcrumb: {
            label: 'Recycle Bin',
          }
        },
      },

      {
        path: 'alldoc',
        loadChildren: () => import('../activites/alldocument/alldocument.module').then(m => m.AllDocumentModule), data: {
          breadcrumb: {
            label: 'My Files',
          }
        },
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
export class ActivitesModule { }
