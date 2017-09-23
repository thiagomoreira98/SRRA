import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoGridComponent } from './recurso-grid.component';

describe('RecursoGridComponent', () => {
  let component: RecursoGridComponent;
  let fixture: ComponentFixture<RecursoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
