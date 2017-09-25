import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteInfoComponent } from './docente-info.component';

describe('DocenteInfoComponent', () => {
  let component: DocenteInfoComponent;
  let fixture: ComponentFixture<DocenteInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
