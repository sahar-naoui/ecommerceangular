import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationEnseignantComponent } from './affectation-enseignant.component';

describe('AffectationEnseignantComponent', () => {
  let component: AffectationEnseignantComponent;
  let fixture: ComponentFixture<AffectationEnseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationEnseignantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationEnseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
