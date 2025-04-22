import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpterritorieComponent } from './empterritorie.component';

describe('EmpterritorieComponent', () => {
  let component: EmpterritorieComponent;
  let fixture: ComponentFixture<EmpterritorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpterritorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpterritorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
