import { TestBed } from '@angular/core/testing';

import { ChildEntityHelperService } from './child-entity-helper.service';

describe('ChildEntityHelperService', () => {
  let service: ChildEntityHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildEntityHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
