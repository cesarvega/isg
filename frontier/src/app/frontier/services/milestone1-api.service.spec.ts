import { TestBed } from '@angular/core/testing';

import { Milestone1ApiService } from './milestone1-api.service';

describe('Milestone1ApiService', () => {
  let service: Milestone1ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Milestone1ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
