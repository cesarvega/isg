import { TestBed } from '@angular/core/testing';

import { OffersService } from '../helpers/offers.service';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
