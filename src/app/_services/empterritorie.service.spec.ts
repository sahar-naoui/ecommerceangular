import { TestBed } from '@angular/core/testing';

import { EmpterritorieService } from './empterritorie.service';

describe('EmpterritorieService', () => {
  let service: EmpterritorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpterritorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
