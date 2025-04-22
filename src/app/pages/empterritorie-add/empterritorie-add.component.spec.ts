import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpterritorieAddComponent } from './empterritorie-add.component';

describe('EmpterritorieAddComponent', () => {
  let component: EmpterritorieAddComponent;
  let fixture: ComponentFixture<EmpterritorieAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpterritorieAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpterritorieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
