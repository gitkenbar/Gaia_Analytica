import { TestBed } from '@angular/core/testing';

import { SeasonService } from './season.service';

describe('SeasonService', () => {
  let service = TestBed.inject(SeasonService)
  let lateWinter = new Date(2025, 1, 19)
  let growingSeason = new Date(2025, 6, 4)
  let earlyWinter = new Date(2025, 11, 25)
  beforeEach(()=> {
    TestBed.configureTestingModule({providers: [SeasonService]})

  })

  it('should get User Zone', () => {
    expect(service.getUserZone()).toBeTruthy();
  });

  it('should get Frost Dates', () => {
    expect(service.getFrostDates('7a')).toBe(['April 14', 'October 23'])
  });

  it('should identify next frost date', () => {

    expect(service.nextFrostDate(lateWinter, ['April 14','October 23'])).toBe(new Date('April 14 2025'));
  });
});
