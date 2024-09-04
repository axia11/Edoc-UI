import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'libs/material/src';
import { MatIconModule } from '@angular/material/icon';
import { AlldocumentComponent } from './alldocument.component';
import { AlldocDetailsComponent } from './alldoc-details/alldoc-details.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
    declarations: [AlldocumentComponent, AlldocDetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        MatIconModule,
        RouterModule.forChild([
            {
                path: '', component: AlldocumentComponent,
                data: {
                    breadcrumb: {
                        showbreadcrumb: true, // make it true to display the breadCrumb
                        label: 'My Files',
                        info: { myData: { icon: 'home', iconType: 'material' } }
                    }
                },
            },
            {
                path: ':id', component: AlldocDetailsComponent,
                data: {
                    breadcrumb: {
                        label: 'Details',
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
export class AllDocumentModule { }