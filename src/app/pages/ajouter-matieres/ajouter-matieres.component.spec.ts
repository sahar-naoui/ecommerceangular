import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterMatieresComponent } from './ajouter-matieres.component';

describe('AjouterMatieresComponent', () => {
  let component: AjouterMatieresComponent;
  let fixture: ComponentFixture<AjouterMatieresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterMatieresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterMatieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
