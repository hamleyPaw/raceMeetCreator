import { TestBed } from '@angular/core/testing';

import { RaceMeetService } from './race-meet.service';

describe('RaceMeetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaceMeetService = TestBed.get(RaceMeetService);
    expect(service).toBeTruthy();
  });
});
