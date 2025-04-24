import { TestBed } from '@angular/core/testing';

import { SeasonService } from './season.service';

describe('SeasonService', () => {
  let seasonService: SeasonService
  let lateWinter = new Date('february 19 2025')
  let growingSeason = new Date('july 4 2025')
  let earlyWinter = new Date('december 25 2025')

  beforeEach(()=> {
    TestBed.configureTestingModule({
      providers: [SeasonService]
    });
    seasonService = TestBed.inject(SeasonService)

  })

  it('should get User Zone', () => {
    expect(seasonService.getUserZone()).toBeTruthy();
  });

  it('should identify next frost date', () => {
    expect(seasonService.nextFrostDate(lateWinter, ['April 14','October 23'])).withContext('in Late Winter').toEqual(new Date('April 14 2025'));

    expect(seasonService.nextFrostDate(growingSeason, ['April 14','October 23'])).withContext('in Growing Season').toEqual(new Date('October 23 2025'));

    expect(seasonService.nextFrostDate(earlyWinter, ['April 14','October 23'])).withContext('Early Winter').toEqual(new Date('April 14 2026'));
  });
});
