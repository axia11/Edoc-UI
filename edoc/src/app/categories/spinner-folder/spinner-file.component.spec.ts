import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerFileComponent } from './spinner-file.component';

describe('SpinnerFileComponent', () => {
  let component: SpinnerFileComponent;
  let fixture: ComponentFixture<SpinnerFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
