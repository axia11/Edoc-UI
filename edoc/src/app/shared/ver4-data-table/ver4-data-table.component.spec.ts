import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { Ver4DataTableComponent } from './bulk-data-table.component';
import { Ver4DataTableComponent } from './ver4-data-table.component';

describe('Ver4DataTableComponent', () => {
  let component: Ver4DataTableComponent;
  let fixture: ComponentFixture<Ver4DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ver4DataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ver4DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
