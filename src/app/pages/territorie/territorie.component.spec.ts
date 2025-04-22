import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritorieComponent } from './territorie.component';

describe('TerritorieComponent', () => {
  let component: TerritorieComponent;
  let fixture: ComponentFixture<TerritorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerritorieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerritorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
