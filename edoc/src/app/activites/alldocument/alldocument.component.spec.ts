import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldocumentComponent } from './alldocument.component';

describe('AlldocumentComponent', () => {
  let component: AlldocumentComponent;
  let fixture: ComponentFixture<AlldocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlldocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
