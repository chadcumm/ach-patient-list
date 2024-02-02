import { TestBed } from '@angular/core/testing';

import { PopulationDataService } from './population-data.service';

describe('PopulationDataService', () => {
  let service: PopulationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopulationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
