import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioGridComponent } from './laboratorio-grid.component';

describe('LaboratorioGridComponent', () => {
  let component: LaboratorioGridComponent;
  let fixture: ComponentFixture<LaboratorioGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratorioGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
