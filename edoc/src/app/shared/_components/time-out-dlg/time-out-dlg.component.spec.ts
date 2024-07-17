import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeOutDlgComponent } from './time-out-dlg.component';

describe('TimeOutDlgComponent', () => {
  let component: TimeOutDlgComponent;
  let fixture: ComponentFixture<TimeOutDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeOutDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeOutDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
