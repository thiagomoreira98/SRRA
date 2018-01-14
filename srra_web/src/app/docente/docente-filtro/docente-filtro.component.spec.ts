import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteFiltroComponent } from './docente-filtro.component';

describe('DocenteFiltroComponent', () => {
  let component: DocenteFiltroComponent;
  let fixture: ComponentFixture<DocenteFiltroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteFiltroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
