import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioGridComponent } from './usuario-grid.component';

describe('UsuarioGridComponent', () => {
  let component: UsuarioGridComponent;
  let fixture: ComponentFixture<UsuarioGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
