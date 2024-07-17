import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaDlgComponent } from './captcha-dlg.component';

describe('CaptchaDlgComponent', () => {
  let component: CaptchaDlgComponent;
  let fixture: ComponentFixture<CaptchaDlgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchaDlgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchaDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
