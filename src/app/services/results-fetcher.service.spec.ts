import { TestBed } from '@angular/core/testing';

import { ResultsFetcherService } from './results-fetcher.service';

describe('ResultsFetcherService', () => {
  let service: ResultsFetcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsFetcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
