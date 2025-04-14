import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAffectationEnseignantComponent } from './list-affectation-enseignant.component';

describe('ListAffectationEnseignantComponent', () => {
  let component: ListAffectationEnseignantComponent;
  let fixture: ComponentFixture<ListAffectationEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAffectationEnseignantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAffectationEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
