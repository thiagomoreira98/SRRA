import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaGridComponent } from './reserva-grid.component';

describe('ReservaGridComponent', () => {
  let component: ReservaGridComponent;
  let fixture: ComponentFixture<ReservaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
