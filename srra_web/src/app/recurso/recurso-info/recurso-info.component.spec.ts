import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoInfoComponent } from './recurso-info.component';

describe('RecursoInfoComponent', () => {
  let component: RecursoInfoComponent;
  let fixture: ComponentFixture<RecursoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
