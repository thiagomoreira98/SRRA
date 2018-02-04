import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaFiltroComponent } from './ocorrencia-filtro.component';

describe('OcorrenciaFiltroComponent', () => {
  let component: OcorrenciaFiltroComponent;
  let fixture: ComponentFixture<OcorrenciaFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcorrenciaFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
