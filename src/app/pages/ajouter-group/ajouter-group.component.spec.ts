import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterGroupComponent } from './ajouter-group.component';

describe('AjouterGroupComponent', () => {
  let component: AjouterGroupComponent;
  let fixture: ComponentFixture<AjouterGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
