import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioFiltroComponent } from './usuario-filtro.component';

describe('UsuarioFiltroComponent', () => {
  let component: UsuarioFiltroComponent;
  let fixture: ComponentFixture<UsuarioFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
