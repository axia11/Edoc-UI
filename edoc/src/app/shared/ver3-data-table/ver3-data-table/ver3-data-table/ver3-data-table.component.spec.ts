import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { Ver3DataTableComponent } from './bulk-data-table.component';
import { Ver3DataTableComponent } from './ver3-data-table.component';

describe('Ver3DataTableComponent', () => {
  let component: Ver3DataTableComponent;
  let fixture: ComponentFixture<Ver3DataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ver3DataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ver3DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
