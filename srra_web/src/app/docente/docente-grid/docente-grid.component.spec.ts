import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteGridComponent } from './docente-grid.component';

describe('DocenteGridComponent', () => {
  let component: DocenteGridComponent;
  let fixture: ComponentFixture<DocenteGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
