import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldocDetailsComponent } from './alldoc-details.component';

describe('AlldocDetailsComponent', () => {
  let component: AlldocDetailsComponent;
  let fixture: ComponentFixture<AlldocDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldocDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
