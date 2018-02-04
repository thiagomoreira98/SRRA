import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaFiltroComponent } from './reserva-filtro.component';

describe('ReservaFiltroComponent', () => {
  let component: ReservaFiltroComponent;
  let fixture: ComponentFixture<ReservaFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
