import { TestBed } from '@angular/core/testing';

import { LightsaberTriggerService } from './lightsaber-trigger.service';

describe('LightsaberTriggerService', () => {
  let service: LightsaberTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightsaberTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
