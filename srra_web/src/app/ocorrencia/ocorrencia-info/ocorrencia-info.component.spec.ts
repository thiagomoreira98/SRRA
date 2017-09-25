import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciaInfoComponent } from './ocorrencia-info.component';

describe('OcorrenciaInfoComponent', () => {
  let component: OcorrenciaInfoComponent;
  let fixture: ComponentFixture<OcorrenciaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcorrenciaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcorrenciaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
