import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoFiltroComponent } from './recurso-filtro.component';

describe('RecursoFiltroComponent', () => {
  let component: RecursoFiltroComponent;
  let fixture: ComponentFixture<RecursoFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
