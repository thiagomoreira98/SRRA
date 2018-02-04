import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaGridComponent } from './ocorrencia-grid.component';

describe('OcorrenciaGridComponent', () => {
  let component: OcorrenciaGridComponent;
  let fixture: ComponentFixture<OcorrenciaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcorrenciaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
