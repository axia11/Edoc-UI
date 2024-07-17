import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenDataMatrixComponent } from './gen-data-matrix.component';

describe('GenDataMatrixComponent', () => {
  let component: GenDataMatrixComponent;
  let fixture: ComponentFixture<GenDataMatrixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenDataMatrixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenDataMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
