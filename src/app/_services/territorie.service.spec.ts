import { TestBed } from '@angular/core/testing';

import { TerritorieService } from './territorie.service';

describe('TerritorieService', () => {
  let service: TerritorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerritorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
