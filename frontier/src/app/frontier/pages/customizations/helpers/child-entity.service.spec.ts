import { TestBed } from '@angular/core/testing';

import { ChildEntityService } from './child-entity.service';

describe('ChildEntityService', () => {
  let service: ChildEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
