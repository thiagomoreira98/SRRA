import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaFormComponent } from './ocorrencia-form.component';

describe('OcorrenciaFormComponent', () => {
  let component: OcorrenciaFormComponent;
  let fixture: ComponentFixture<OcorrenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcorrenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
