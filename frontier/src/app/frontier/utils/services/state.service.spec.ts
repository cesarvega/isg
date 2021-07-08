import { TestBed } from '@angular/core/testing';

import { SnapshotStore } from './state.service';

describe('StateService', () => {
  let service: SnapshotStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapshotStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
