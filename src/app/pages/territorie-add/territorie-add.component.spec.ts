import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritorieAddComponent } from './territorie-add.component';

describe('TerritorieAddComponent', () => {
  let component: TerritorieAddComponent;
  let fixture: ComponentFixture<TerritorieAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerritorieAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerritorieAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
