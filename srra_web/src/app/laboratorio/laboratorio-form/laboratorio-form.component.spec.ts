import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratorioFormComponent } from './laboratorio-form.component';

describe('LaboratorioFormComponent', () => {
  let component: LaboratorioFormComponent;
  let fixture: ComponentFixture<LaboratorioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratorioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratorioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
