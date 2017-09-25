import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioInfoComponent } from './laboratorio-info.component';

describe('LaboratorioInfoComponent', () => {
  let component: LaboratorioInfoComponent;
  let fixture: ComponentFixture<LaboratorioInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratorioInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
