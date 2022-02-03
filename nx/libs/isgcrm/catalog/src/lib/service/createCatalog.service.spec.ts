import { TestBed } from '@angular/core/testing';

import { CreateCatalogService } from './createCatalog.service';

describe('ProductsService', () => {
  let service: CreateCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
