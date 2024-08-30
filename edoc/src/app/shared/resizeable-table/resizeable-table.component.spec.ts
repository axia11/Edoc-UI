import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeableTableComponent } from './resizeable-table.component';

describe('ResizeableTableComponent', () => {
  let component: ResizeableTableComponent;
  let fixture: ComponentFixture<ResizeableTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResizeableTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
